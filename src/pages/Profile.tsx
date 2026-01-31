import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { User, Mail, Ruler, Scale, Droplet, Save, Loader2 } from "lucide-react";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  blood_type: string | null;
  emergency_contact: string | null;
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
    blood_type: "",
    emergency_contact: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (data) {
      setProfile(data as Profile);
      setFormData({
        full_name: data.full_name || "",
        date_of_birth: data.date_of_birth || "",
        gender: data.gender || "",
        height_cm: data.height_cm?.toString() || "",
        weight_kg: data.weight_kg?.toString() || "",
        blood_type: data.blood_type || "",
        emergency_contact: data.emergency_contact || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name || null,
        date_of_birth: formData.date_of_birth || null,
        gender: formData.gender || null,
        height_cm: formData.height_cm ? parseFloat(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        blood_type: formData.blood_type || null,
        emergency_contact: formData.emergency_contact || null,
      })
      .eq("id", profile.id);

    if (error) {
      toast.error("Failed to save profile");
      console.error(error);
    } else {
      toast.success("Profile updated successfully");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Profile Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Manage your personal information and health details
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 md:gap-4">
              <Avatar className="w-16 h-16 md:w-20 md:h-20">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl md:text-2xl">
                  {formData.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <CardTitle className="text-base md:text-lg truncate">
                  {formData.full_name || "Your Name"}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1 text-xs md:text-sm">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs md:text-sm">Full Name</Label>
                <Input
                  placeholder="Your full name"
                  value={formData.full_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm">Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date_of_birth: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, gender: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs md:text-sm">Emergency Contact</Label>
                <Input
                  placeholder="Phone number"
                  value={formData.emergency_contact}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, emergency_contact: e.target.value }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Droplet className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div>
                <Label className="flex items-center gap-1 text-xs md:text-sm">
                  <Ruler className="w-3 h-3 md:w-4 md:h-4" />
                  Height (cm)
                </Label>
                <Input
                  type="number"
                  placeholder="175"
                  value={formData.height_cm}
                  onChange={(e) => setFormData((prev) => ({ ...prev, height_cm: e.target.value }))}
                />
              </div>
              <div>
                <Label className="flex items-center gap-1 text-xs md:text-sm">
                  <Scale className="w-3 h-3 md:w-4 md:h-4" />
                  Weight (kg)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="70"
                  value={formData.weight_kg}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weight_kg: e.target.value }))}
                />
              </div>
              <div>
                <Label className="flex items-center gap-1 text-xs md:text-sm">
                  <Droplet className="w-3 h-3 md:w-4 md:h-4" />
                  Blood Type
                </Label>
                <Select
                  value={formData.blood_type}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, blood_type: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.height_cm && formData.weight_kg && (
              <div className="p-3 md:p-4 bg-muted rounded-lg">
                <p className="text-xs md:text-sm text-muted-foreground">
                  Your BMI:{" "}
                  <span className="font-bold text-foreground">
                    {(
                      parseFloat(formData.weight_kg) /
                      Math.pow(parseFloat(formData.height_cm) / 100, 2)
                    ).toFixed(1)}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full gradient-primary"
          size="lg"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
