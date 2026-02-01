import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { MapPin, X, Loader2, Shield } from "lucide-react";

interface LocationPermissionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export function LocationPermission({ open, onOpenChange, onComplete }: LocationPermissionProps) {
  const { user } = useAuthContext();
  const [requesting, setRequesting] = useState(false);

  const requestLocation = async () => {
    if (!user) return;

    setRequesting(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        });
      });

      const { latitude, longitude } = position.coords;

      const { error } = await supabase
        .from("profiles")
        .update({
          location_lat: latitude,
          location_lng: longitude,
          location_consent: true,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Location saved for personalized health guidance");
      onOpenChange(false);
      onComplete?.();
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        toast.error("Location access denied. You can enable it later in settings.");
      } else {
        console.error("Error saving location:", error);
        toast.error("Failed to save location");
      }
    } finally {
      setRequesting(false);
    }
  };

  const skipLocation = async () => {
    if (!user) return;

    try {
      await supabase
        .from("profiles")
        .update({ location_consent: false })
        .eq("user_id", user.id);

      onOpenChange(false);
      onComplete?.();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-primary mb-2 mx-auto">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-center">Enable Location Services?</DialogTitle>
          <DialogDescription className="text-center">
            Sharing your location helps us provide more relevant health guidance and nearby healthcare resources.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Your Privacy Matters</h4>
                <p className="text-sm text-muted-foreground">
                  Your location is stored securely and never shared. You can revoke access anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={requestLocation}
            disabled={requesting}
            className="w-full gradient-primary"
          >
            {requesting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                Enable Location
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={skipLocation}
            disabled={requesting}
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            Skip for Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
