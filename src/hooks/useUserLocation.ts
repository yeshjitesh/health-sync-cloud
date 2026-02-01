import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";

interface UserLocation {
  region: string;
  location_lat: number | null;
  location_lng: number | null;
  location_consent: boolean;
}

export function useUserLocation() {
  const { user } = useAuthContext();
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsRegionSelection, setNeedsRegionSelection] = useState(false);

  const fetchLocation = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("region, location_lat, location_lng, location_consent")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!error && data) {
      setLocation(data as UserLocation);
      // Check if region is set (not null and not 'global' which is default)
      setNeedsRegionSelection(!data.region || data.region === "global");
    }
    setLoading(false);
  }, [user]);

  const updateRegion = async (region: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ region })
      .eq("user_id", user.id);

    if (!error) {
      setLocation((prev) => prev ? { ...prev, region } : null);
      setNeedsRegionSelection(false);
    }

    return !error;
  };

  const updateLocation = async (lat: number, lng: number, consent: boolean) => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        location_lat: lat,
        location_lng: lng,
        location_consent: consent,
      })
      .eq("user_id", user.id);

    if (!error) {
      setLocation((prev) =>
        prev
          ? { ...prev, location_lat: lat, location_lng: lng, location_consent: consent }
          : null
      );
    }

    return !error;
  };

  const revokeLocationConsent = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        location_lat: null,
        location_lng: null,
        location_consent: false,
      })
      .eq("user_id", user.id);

    if (!error) {
      setLocation((prev) =>
        prev
          ? { ...prev, location_lat: null, location_lng: null, location_consent: false }
          : null
      );
    }

    return !error;
  };

  useEffect(() => {
    if (user) {
      fetchLocation();
    }
  }, [user, fetchLocation]);

  return {
    location,
    loading,
    needsRegionSelection,
    updateRegion,
    updateLocation,
    revokeLocationConsent,
    refetch: fetchLocation,
  };
}
