import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";

export interface HealthRecord {
  id: string;
  record_type: string;
  category: string;
  title: string;
  value: number | null;
  unit: string | null;
  value_text: string | null;
  notes: string | null;
  recorded_at: string;
  source: string | null;
}

export function useRealtimeRecords() {
  const { user } = useAuthContext();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("health_records")
      .select("*")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: false });

    if (error) {
      console.error("Error fetching records:", error);
    } else {
      setRecords(data as HealthRecord[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchRecords();

    // Set up realtime subscription
    const channel = supabase
      .channel("health_records_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "health_records",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRecords((prev) => [payload.new as HealthRecord, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setRecords((prev) =>
              prev.map((r) => (r.id === payload.new.id ? (payload.new as HealthRecord) : r))
            );
          } else if (payload.eventType === "DELETE") {
            setRecords((prev) => prev.filter((r) => r.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchRecords]);

  return { records, loading, refetch: fetchRecords };
}
