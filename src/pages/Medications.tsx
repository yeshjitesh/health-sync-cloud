import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Pill, Check, Clock, Trash2, Calendar } from "lucide-react";

interface Medication {
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

interface MedicationLog {
  id: string;
  medication_id: string;
  taken_at: string;
  status: string;
}

const frequencies = [
  { value: "once_daily", label: "Once daily" },
  { value: "twice_daily", label: "Twice daily" },
  { value: "three_times_daily", label: "Three times daily" },
  { value: "four_times_daily", label: "Four times daily" },
  { value: "as_needed", label: "As needed" },
  { value: "weekly", label: "Weekly" },
];

const timesOfDay = ["morning", "afternoon", "evening", "night"];

export default function Medications() {
  const { user } = useAuthContext();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayLogs, setTodayLogs] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time_of_day: [] as string[],
    notes: "",
    refill_reminder_date: "",
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

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
        .gte("taken_at", new Date().toISOString().split("T")[0])
        .lt("taken_at", new Date(Date.now() + 86400000).toISOString().split("T")[0]),
    ]);

    if (medsResponse.error) {
      console.error("Error fetching medications:", medsResponse.error);
    } else {
      setMedications(medsResponse.data as Medication[]);
    }

    if (logsResponse.error) {
      console.error("Error fetching logs:", logsResponse.error);
    } else {
      setTodayLogs(logsResponse.data as MedicationLog[]);
    }

    setLoading(false);
  };

  const handleAddMedication = async () => {
    if (!newMed.name || !newMed.dosage || !newMed.frequency) {
      toast.error("Please fill in required fields");
      return;
    }

    const { error } = await supabase.from("medications").insert({
      user_id: user!.id,
      name: newMed.name,
      dosage: newMed.dosage,
      frequency: newMed.frequency,
      time_of_day: newMed.time_of_day.length > 0 ? newMed.time_of_day : null,
      notes: newMed.notes || null,
      refill_reminder_date: newMed.refill_reminder_date || null,
    });

    if (error) {
      toast.error("Failed to add medication");
      console.error(error);
    } else {
      toast.success("Medication added successfully");
      setIsDialogOpen(false);
      setNewMed({
        name: "",
        dosage: "",
        frequency: "",
        time_of_day: [],
        notes: "",
        refill_reminder_date: "",
      });
      fetchData();
    }
  };

  const handleLogMedication = async (medicationId: string, status: string) => {
    const existingLog = todayLogs.find((l) => l.medication_id === medicationId);

    if (existingLog) {
      // Already logged today
      toast.info("Already logged for today");
      return;
    }

    const { error } = await supabase.from("medication_logs").insert({
      medication_id: medicationId,
      user_id: user!.id,
      status,
    });

    if (error) {
      toast.error("Failed to log medication");
      console.error(error);
    } else {
      toast.success(status === "taken" ? "Medication taken!" : "Marked as skipped");
      fetchData();
    }
  };

  const handleDeleteMedication = async (id: string) => {
    const { error } = await supabase
      .from("medications")
      .update({ is_active: false })
      .eq("id", id);

    if (error) {
      toast.error("Failed to remove medication");
    } else {
      toast.success("Medication removed");
      setMedications((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const isTakenToday = (medicationId: string) => {
    return todayLogs.some(
      (log) => log.medication_id === medicationId && log.status === "taken"
    );
  };

  const toggleTimeOfDay = (time: string) => {
    setNewMed((prev) => ({
      ...prev,
      time_of_day: prev.time_of_day.includes(time)
        ? prev.time_of_day.filter((t) => t !== time)
        : [...prev.time_of_day, time],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Medications</h1>
          <p className="text-muted-foreground mt-1">
            Track your medications and stay on schedule
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Medication Name *</Label>
                <Input
                  placeholder="e.g., Metformin"
                  value={newMed.name}
                  onChange={(e) =>
                    setNewMed((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Dosage *</Label>
                <Input
                  placeholder="e.g., 500mg"
                  value={newMed.dosage}
                  onChange={(e) =>
                    setNewMed((prev) => ({ ...prev, dosage: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Frequency *</Label>
                <Select
                  value={newMed.frequency}
                  onValueChange={(v) =>
                    setNewMed((prev) => ({ ...prev, frequency: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency..." />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time of Day</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {timesOfDay.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={
                        newMed.time_of_day.includes(time) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => toggleTimeOfDay(time)}
                      className="capitalize"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Refill Reminder Date</Label>
                <Input
                  type="date"
                  value={newMed.refill_reminder_date}
                  onChange={(e) =>
                    setNewMed((prev) => ({
                      ...prev,
                      refill_reminder_date: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Additional instructions..."
                  value={newMed.notes}
                  onChange={(e) =>
                    setNewMed((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>
              <Button onClick={handleAddMedication} className="w-full">
                Add Medication
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Today's Medications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading...
              </div>
            ) : medications.length > 0 ? (
              <div className="space-y-3">
                {medications.map((med) => {
                  const taken = isTakenToday(med.id);
                  return (
                    <div
                      key={med.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        taken
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            taken
                              ? "bg-green-100 dark:bg-green-800"
                              : "bg-primary/10"
                          }`}
                        >
                          {taken ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Pill className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{med.dosage}</span>
                            <span>•</span>
                            <span className="capitalize">
                              {med.frequency.replace("_", " ")}
                            </span>
                          </div>
                          {med.time_of_day && med.time_of_day.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {med.time_of_day.map((time) => (
                                <Badge
                                  key={time}
                                  variant="secondary"
                                  className="text-xs capitalize"
                                >
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!taken && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleLogMedication(med.id, "taken")}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Taken
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleLogMedication(med.id, "skipped")}
                            >
                              Skip
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMedication(med.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Pill className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No medications added</p>
                <p className="text-sm mt-1">
                  Add your medications to start tracking
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Medication Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-primary">{medications.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Active Medications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-green-600">
              {todayLogs.filter((l) => l.status === "taken").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Taken Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-amber-500">
              {medications.length - todayLogs.filter((l) => l.status === "taken").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Remaining Today</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
