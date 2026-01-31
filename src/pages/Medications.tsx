import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRealtimeMedications } from "@/hooks/useRealtimeMedications";
import { toast } from "sonner";
import { Plus, Pill, Check, Trash2, Calendar, Bell, Clock } from "lucide-react";

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
  const { medications, todayLogs, loading, isTakenToday } = useRealtimeMedications();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time_of_day: [] as string[],
    notes: "",
    refill_reminder_date: "",
  });

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
    }
  };

  const handleLogMedication = async (medicationId: string, status: string) => {
    const existingLog = todayLogs.find((l) => l.medication_id === medicationId);

    if (existingLog) {
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
    } else {
      toast.success(status === "taken" ? "Medication taken!" : "Marked as skipped");
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
    }
  };

  const toggleTimeOfDay = (time: string) => {
    setNewMed((prev) => ({
      ...prev,
      time_of_day: prev.time_of_day.includes(time)
        ? prev.time_of_day.filter((t) => t !== time)
        : [...prev.time_of_day, time],
    }));
  };

  const takenCount = todayLogs.filter((l) => l.status === "taken").length;
  const remainingCount = medications.length - takenCount;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Medications</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Track your medications with real-time updates
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Medication Name *</Label>
                <Input
                  placeholder="e.g., Metformin"
                  value={newMed.name}
                  onChange={(e) => setNewMed((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label>Dosage *</Label>
                <Input
                  placeholder="e.g., 500mg"
                  value={newMed.dosage}
                  onChange={(e) => setNewMed((prev) => ({ ...prev, dosage: e.target.value }))}
                />
              </div>
              <div>
                <Label>Frequency *</Label>
                <Select
                  value={newMed.frequency}
                  onValueChange={(v) => setNewMed((prev) => ({ ...prev, frequency: v }))}
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
                      variant={newMed.time_of_day.includes(time) ? "default" : "outline"}
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
                <Label className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Refill Reminder Date
                </Label>
                <Input
                  type="date"
                  value={newMed.refill_reminder_date}
                  onChange={(e) =>
                    setNewMed((prev) => ({ ...prev, refill_reminder_date: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Additional instructions..."
                  value={newMed.notes}
                  onChange={(e) => setNewMed((prev) => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddMedication} className="w-full">
                Add Medication
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 md:gap-4"
      >
        <Card>
          <CardContent className="p-4 md:p-6 text-center">
            <p className="text-2xl md:text-4xl font-bold text-primary">{medications.length}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6 text-center">
            <p className="text-2xl md:text-4xl font-bold text-green-600">{takenCount}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Taken</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6 text-center">
            <p className="text-2xl md:text-4xl font-bold text-amber-500">{remainingCount}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Remaining</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : medications.length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                {medications.map((med) => {
                  const taken = isTakenToday(med.id);
                  return (
                    <div
                      key={med.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-lg border gap-3 ${
                        taken
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-muted/50 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div
                          className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            taken ? "bg-green-100 dark:bg-green-800" : "bg-primary/10"
                          }`}
                        >
                          {taken ? (
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                          ) : (
                            <Pill className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm md:text-base">{med.name}</p>
                          <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground">
                            <span>{med.dosage}</span>
                            <span>•</span>
                            <span className="capitalize">{med.frequency.replace("_", " ")}</span>
                          </div>
                          {med.time_of_day && med.time_of_day.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {med.time_of_day.map((time) => (
                                <Badge key={time} variant="secondary" className="text-[10px] md:text-xs capitalize">
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-12 sm:ml-0">
                        {!taken && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleLogMedication(med.id, "taken")}
                              className="text-xs md:text-sm"
                            >
                              <Check className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              Taken
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleLogMedication(med.id, "skipped")}
                              className="text-xs md:text-sm"
                            >
                              Skip
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
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
              <div className="text-center py-8 md:py-12 text-muted-foreground">
                <Pill className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-50" />
                <p className="text-base md:text-lg font-medium">No medications added</p>
                <p className="text-xs md:text-sm mt-1">Add your medications to start tracking</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
