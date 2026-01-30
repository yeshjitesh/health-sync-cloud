import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { diseaseType, inputData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const diseaseInfo: Record<string, { name: string; metrics: string }> = {
      diabetes: {
        name: "Type 2 Diabetes",
        metrics: "glucose levels, HbA1c, BMI, age, family history, and physical activity level",
      },
      heart: {
        name: "Heart Disease",
        metrics: "blood pressure, cholesterol levels, HDL, smoking status, and diabetes status",
      },
      kidney: {
        name: "Chronic Kidney Disease",
        metrics: "eGFR, creatinine, BUN, blood pressure history, and diabetes status",
      },
      liver: {
        name: "Liver Disease",
        metrics: "ALT, AST, bilirubin, albumin levels, and alcohol consumption",
      },
    };

    const disease = diseaseInfo[diseaseType] || diseaseInfo.diabetes;

    const systemPrompt = `You are a medical AI assistant specialized in disease risk assessment. You analyze health metrics and provide risk assessments.

IMPORTANT: 
- You are NOT diagnosing. You are providing a risk assessment based on the provided metrics.
- Always recommend consulting a healthcare professional for proper diagnosis.
- Be conservative in your assessments - when in doubt, recommend medical consultation.

Your response MUST be a valid JSON object with this exact structure:
{
  "riskLevel": "low" | "medium" | "high",
  "riskScore": number (0-100),
  "analysis": "markdown-formatted analysis of the patient's risk factors",
  "recommendations": ["array", "of", "specific", "recommendations"]
}

Risk level guidelines:
- low: Most metrics within normal ranges, minimal risk factors
- medium: Some concerning metrics or moderate risk factors
- high: Multiple concerning metrics or significant risk factors`;

    const userPrompt = `Analyze the following health data for ${disease.name} risk assessment.

Patient Data:
${JSON.stringify(inputData, null, 2)}

Metrics being evaluated: ${disease.metrics}

Provide a comprehensive risk assessment with specific recommendations based on this data. Return ONLY valid JSON.`;

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
          { role: "user", content: userPrompt },
        ],
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
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse the JSON from the response
    let result;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      // Default response if parsing fails
      result = {
        riskLevel: "medium",
        riskScore: 50,
        analysis: "Unable to fully analyze the provided data. Please ensure all fields are filled correctly and try again.",
        recommendations: [
          "Consult with a healthcare provider for proper assessment",
          "Ensure all health metrics are accurate and up-to-date",
        ],
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Prediction error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
