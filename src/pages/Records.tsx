import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRealtimeRecords } from "@/hooks/useRealtimeRecords";
import { DynamicRecordForm } from "@/components/records/DynamicRecordForm";
import { toast } from "sonner";
import { Plus, FileText, Search, Calendar, Trash2, Activity } from "lucide-react";

const categories = [
  { value: "blood_pressure", label: "Blood Pressure" },
  { value: "heart_rate", label: "Heart Rate" },
  { value: "glucose", label: "Blood Glucose" },
  { value: "weight", label: "Weight" },
  { value: "temperature", label: "Temperature" },
  { value: "cholesterol", label: "Cholesterol" },
  { value: "hemoglobin", label: "Hemoglobin" },
  { value: "oxygen_saturation", label: "Oxygen Saturation" },
  { value: "respiratory_rate", label: "Respiratory Rate" },
  { value: "other", label: "Other" },
];

export default function Records() {
  const { user } = useAuthContext();
  const { records, loading } = useRealtimeRecords();
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    filterRecords();
  }, [records, searchQuery, categoryFilter]);

  const filterRecords = () => {
    let filtered = [...records];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.category?.toLowerCase().includes(query) ||
          r.notes?.toLowerCase().includes(query)
      );
    }

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }

    setFilteredRecords(filtered);
  };

  const handleAddRecord = async (formData: {
    record_type: string;
    category: string;
    title: string;
    value: string;
    value2: string;
    unit: string;
    notes: string;
    recorded_at: string;
  }) => {
    if (!formData.title || !formData.record_type || !formData.category) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);

    // For blood pressure, store both values in value_text
    let value: number | null = null;
    let value_text: string | null = null;

    if (formData.category === "blood_pressure" && formData.value && formData.value2) {
      value = parseFloat(formData.value); // Store systolic as main value
      value_text = `${formData.value}/${formData.value2}`; // Store both readings
    } else if (formData.value) {
      value = parseFloat(formData.value);
    }

    const { error } = await supabase.from("health_records").insert({
      user_id: user!.id,
      record_type: formData.record_type,
      category: formData.category,
      title: formData.title,
      value,
      value_text,
      unit: formData.unit || null,
      notes: formData.notes || null,
      recorded_at: formData.recorded_at,
      source: "manual",
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to add record");
      console.error(error);
    } else {
      toast.success("Record added successfully");
      setIsDialogOpen(false);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    const { error } = await supabase.from("health_records").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete record");
    } else {
      toast.success("Record deleted");
    }
  };

  const formatValue = (record: typeof records[0]) => {
    if (record.value_text) {
      return `${record.value_text} ${record.unit || ""}`;
    }
    if (record.value !== null) {
      return `${record.value} ${record.unit || ""}`;
    }
    return "—";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Health Records</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage and track your health data in real-time
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Health Record</DialogTitle>
            </DialogHeader>
            <DynamicRecordForm onSubmit={handleAddRecord} isSubmitting={isSubmitting} />
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Records List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Your Records ({filteredRecords.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : filteredRecords.length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                {filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm md:text-base truncate">{record.title}</p>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                          <span className="capitalize truncate">
                            {record.category?.replace("_", " ")}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(record.recorded_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                      <div className="text-right">
                        <p className="font-semibold text-sm md:text-base">{formatValue(record)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12 text-muted-foreground">
                <FileText className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-50" />
                <p className="text-base md:text-lg font-medium">No health records yet</p>
                <p className="text-xs md:text-sm mt-1">
                  Start tracking your health by adding your first record
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
