import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentHour = now.getHours();

    // Determine time of day
    let timeOfDay = "morning";
    if (currentHour >= 12 && currentHour < 17) {
      timeOfDay = "afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      timeOfDay = "evening";
    } else if (currentHour >= 21 || currentHour < 6) {
      timeOfDay = "night";
    }

    console.log(`Running send-reminders at ${now.toISOString()}, time of day: ${timeOfDay}`);

    // Get all active medications
    const { data: medications, error: medError } = await supabase
      .from("medications")
      .select("id, user_id, name, dosage, frequency, time_of_day, refill_reminder_date")
      .eq("is_active", true);

    if (medError) {
      console.error("Error fetching medications:", medError);
      throw medError;
    }

    console.log(`Found ${medications?.length || 0} active medications`);

    const notificationsToCreate: {
      user_id: string;
      type: string;
      title: string;
      message: string;
    }[] = [];

    // Check each medication
    for (const med of medications || []) {
      // Check for refill reminders (3 days before)
      if (med.refill_reminder_date) {
        const refillDate = new Date(med.refill_reminder_date);
        const daysUntilRefill = Math.ceil(
          (refillDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysUntilRefill <= 3 && daysUntilRefill > 0) {
          notificationsToCreate.push({
            user_id: med.user_id,
            type: "refill",
            title: `Refill Reminder: ${med.name}`,
            message: `Your ${med.name} prescription needs to be refilled in ${daysUntilRefill} day${daysUntilRefill > 1 ? "s" : ""}. Contact your pharmacy or healthcare provider.`,
          });
        }
      }

      // Check for time-of-day medication reminders
      if (med.time_of_day && Array.isArray(med.time_of_day)) {
        if (med.time_of_day.includes(timeOfDay)) {
          // Check if we already sent a reminder for this medication today
          const { data: existingNotif } = await supabase
            .from("notifications")
            .select("id")
            .eq("user_id", med.user_id)
            .eq("type", "medication")
            .eq("title", `Time for ${med.name}`)
            .gte("created_at", today)
            .maybeSingle();

          if (!existingNotif) {
            notificationsToCreate.push({
              user_id: med.user_id,
              type: "medication",
              title: `Time for ${med.name}`,
              message: `It's ${timeOfDay} - time to take your ${med.name} (${med.dosage}). Don't forget to log it in DVDS-Health!`,
            });
          }
        }
      }
    }

    // Create all notifications
    if (notificationsToCreate.length > 0) {
      const { error: insertError } = await supabase
        .from("notifications")
        .insert(notificationsToCreate);

      if (insertError) {
        console.error("Error creating notifications:", insertError);
        throw insertError;
      }

      console.log(`Created ${notificationsToCreate.length} notifications`);
    } else {
      console.log("No notifications to create");
    }

    return new Response(
      JSON.stringify({
        success: true,
        notificationsCreated: notificationsToCreate.length,
        timestamp: now.toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Send-reminders error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
