import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Globe, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegionSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

const regions = [
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    description: "NHS guidelines and services",
    emergency: "999 / 111",
  },
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
    description: "CDC/FDA/AHA guidelines",
    emergency: "911",
  },
  {
    code: "india",
    name: "India",
    flag: "🇮🇳",
    description: "ICMR/NHP guidelines",
    emergency: "112 / 108",
  },
  {
    code: "global",
    name: "Other / Global",
    flag: "🌍",
    description: "WHO international guidelines",
    emergency: "Local services",
  },
];

export function RegionSelector({ open, onOpenChange, onComplete }: RegionSelectorProps) {
  const { user } = useAuthContext();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedRegion || !user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ region: selectedRegion })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Region saved! Your health guidance will be customized.");
      onOpenChange(false);
      onComplete?.();
    } catch (error) {
      console.error("Error saving region:", error);
      toast.error("Failed to save region");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-primary mb-2 mx-auto">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-center">Select Your Region</DialogTitle>
          <DialogDescription className="text-center">
            This helps us provide health guidance aligned with your local healthcare system and guidelines.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {regions.map((region) => (
            <Card
              key={region.code}
              className={cn(
                "cursor-pointer transition-all hover:border-primary",
                selectedRegion === region.code && "border-primary bg-primary/5"
              )}
              onClick={() => setSelectedRegion(region.code)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{region.flag}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{region.name}</h4>
                    <p className="text-sm text-muted-foreground">{region.description}</p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 transition-colors",
                    selectedRegion === region.code 
                      ? "border-primary bg-primary" 
                      : "border-muted-foreground/30"
                  )} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={handleSave}
          disabled={!selectedRegion || saving}
          className="w-full gradient-primary"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 mr-2" />
              Continue
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
