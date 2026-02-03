import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const regionPrompts: Record<string, string> = {
  uk: `
REGION-SPECIFIC GUIDANCE (United Kingdom):
- Reference NHS services and guidance
- Emergency: 999 for emergencies, 111 for non-emergencies
- GP appointments and referral pathways
- Mention NHS 111 online for symptom checking
- Reference NICE guidelines when appropriate
- Be aware of UK medication names (paracetamol not acetaminophen)
- Mention walk-in centres and A&E appropriately`,

  us: `
REGION-SPECIFIC GUIDANCE (United States):
- Reference CDC and FDA guidelines
- Emergency: 911 for emergencies
- Consider insurance and healthcare access factors
- Reference primary care physicians (PCPs)
- Mention urgent care vs emergency room appropriately
- Use US medication names (acetaminophen, not paracetamol)
- Reference AHA for heart health guidelines`,

  india: `
REGION-SPECIFIC GUIDANCE (India):
- Reference ICMR and National Health Portal guidelines
- Emergency: 112 for emergencies, 108 for ambulance
- Mention government health schemes like Ayushman Bharat
- Reference AIIMS and government hospital systems
- Be aware of regional healthcare variations
- Consider both allopathic and traditional medicine contexts
- Mention generic medicine options when appropriate`,

  global: `
REGION-SPECIFIC GUIDANCE (Global/Other):
- Reference WHO international guidelines
- Advise consulting local healthcare providers
- Use internationally recognized medical terms
- Recommend contacting local emergency services
- Be mindful of varying healthcare systems worldwide`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, region = "global" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const regionGuidance = regionPrompts[region] || regionPrompts.global;

    const systemPrompt = `You are DVDS Bot, a helpful and knowledgeable AI Health Assistant for the DVDS-Health platform, designed specifically for the Diu Vanja Darji Samaj community. Your role is to provide accurate, helpful health information while being empathetic and supportive.

${regionGuidance}

IMPORTANT GUIDELINES:
1. Always remind users that your information is for educational purposes only and does not replace professional medical advice.
2. Never diagnose conditions - only provide general information about symptoms and when to seek medical care.
3. Be empathetic and supportive in your responses.
4. Use clear, easy-to-understand language.
5. When discussing symptoms, suggest when it would be appropriate to see a healthcare provider.
6. Provide actionable health tips when relevant.
7. Format your responses with markdown for better readability.
8. Introduce yourself as DVDS Bot when appropriate.
9. Be culturally sensitive to the Diu Vanja Darji Samaj community's health concerns and dietary practices.

You can help users with:
- General health questions and wellness tips
- Understanding symptoms (without diagnosing)
- Healthy lifestyle recommendations
- Explaining medical terms and conditions in simple language
- Medication information (general only)
- Mental health and stress management tips
- Reminders about medication adherence and health tracking
- Disease prevention strategies, especially for diabetes and heart disease
- Nutritional guidance considering vegetarian dietary preferences

Always end serious health discussions by recommending consultation with a healthcare professional using the appropriate regional emergency contacts and services.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
