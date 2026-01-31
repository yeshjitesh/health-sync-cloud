import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time_of_day: string[] | null;
  start_date: string;
  end_date: string | null;
  notes: string | null;
  is_active: boolean;
  refill_reminder_date: string | null;
}

export interface MedicationLog {
  id: string;
  medication_id: string;
  taken_at: string;
  status: string;
}

export function useRealtimeMedications() {
  const { user } = useAuthContext();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayLogs, setTodayLogs] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const [medsResponse, logsResponse] = await Promise.all([
      supabase
        .from("medications")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("medication_logs")
        .select("*")
        .eq("user_id", user.id)
        .gte("taken_at", today)
        .lt("taken_at", tomorrow),
    ]);

    if (!medsResponse.error) {
      setMedications(medsResponse.data as Medication[]);
    }

    if (!logsResponse.error) {
      setTodayLogs(logsResponse.data as MedicationLog[]);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchData();

    // Set up realtime subscription for medications
    const medsChannel = supabase
      .channel("medications_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "medications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newMed = payload.new as Medication;
            if (newMed.is_active) {
              setMedications((prev) => [newMed, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as Medication;
            if (updated.is_active) {
              setMedications((prev) =>
                prev.map((m) => (m.id === updated.id ? updated : m))
              );
            } else {
              setMedications((prev) => prev.filter((m) => m.id !== updated.id));
            }
          } else if (payload.eventType === "DELETE") {
            setMedications((prev) => prev.filter((m) => m.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Set up realtime subscription for logs
    const logsChannel = supabase
      .channel("medication_logs_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "medication_logs",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTodayLogs((prev) => [...prev, payload.new as MedicationLog]);
          } else if (payload.eventType === "UPDATE") {
            setTodayLogs((prev) =>
              prev.map((l) => (l.id === payload.new.id ? (payload.new as MedicationLog) : l))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(medsChannel);
      supabase.removeChannel(logsChannel);
    };
  }, [user, fetchData]);

  const isTakenToday = (medicationId: string) => {
    return todayLogs.some((log) => log.medication_id === medicationId && log.status === "taken");
  };

  return { medications, todayLogs, loading, refetch: fetchData, isTakenToday };
}
