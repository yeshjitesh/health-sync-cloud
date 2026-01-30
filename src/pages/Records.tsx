import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, FileText, Search, Calendar, Trash2 } from "lucide-react";

interface HealthRecord {
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

const categories = [
  { value: "blood_pressure", label: "Blood Pressure" },
  { value: "heart_rate", label: "Heart Rate" },
  { value: "glucose", label: "Blood Glucose" },
  { value: "weight", label: "Weight" },
  { value: "temperature", label: "Temperature" },
  { value: "cholesterol", label: "Cholesterol" },
  { value: "hemoglobin", label: "Hemoglobin" },
  { value: "other", label: "Other" },
];

const recordTypes = [
  { value: "vital_sign", label: "Vital Sign" },
  { value: "lab_result", label: "Lab Result" },
  { value: "imaging", label: "Imaging" },
  { value: "other", label: "Other" },
];

export default function Records() {
  const { user } = useAuthContext();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<HealthRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    record_type: "",
    category: "",
    title: "",
    value: "",
    unit: "",
    notes: "",
    recorded_at: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    fetchRecords();
  }, [user]);

  useEffect(() => {
    filterRecords();
  }, [records, searchQuery, categoryFilter]);

  const fetchRecords = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("health_records")
      .select("*")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch records");
      console.error(error);
    } else {
      setRecords(data as HealthRecord[]);
    }
    setLoading(false);
  };

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

  const handleAddRecord = async () => {
    if (!newRecord.title || !newRecord.record_type || !newRecord.category) {
      toast.error("Please fill in required fields");
      return;
    }

    const { error } = await supabase.from("health_records").insert({
      user_id: user!.id,
      record_type: newRecord.record_type,
      category: newRecord.category,
      title: newRecord.title,
      value: newRecord.value ? parseFloat(newRecord.value) : null,
      unit: newRecord.unit || null,
      notes: newRecord.notes || null,
      recorded_at: newRecord.recorded_at,
      source: "manual",
    });

    if (error) {
      toast.error("Failed to add record");
      console.error(error);
    } else {
      toast.success("Record added successfully");
      setIsDialogOpen(false);
      setNewRecord({
        record_type: "",
        category: "",
        title: "",
        value: "",
        unit: "",
        notes: "",
        recorded_at: new Date().toISOString().slice(0, 16),
      });
      fetchRecords();
    }
  };

  const handleDeleteRecord = async (id: string) => {
    const { error } = await supabase.from("health_records").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete record");
    } else {
      toast.success("Record deleted");
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
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
          <h1 className="text-3xl font-bold">Health Records</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your health data
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Health Record</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Record Type *</Label>
                <Select
                  value={newRecord.record_type}
                  onValueChange={(v) =>
                    setNewRecord((prev) => ({ ...prev, record_type: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {recordTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category *</Label>
                <Select
                  value={newRecord.category}
                  onValueChange={(v) =>
                    setNewRecord((prev) => ({ ...prev, category: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Title *</Label>
                <Input
                  placeholder="e.g., Morning Blood Pressure"
                  value={newRecord.title}
                  onChange={(e) =>
                    setNewRecord((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Value</Label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="e.g., 120"
                    value={newRecord.value}
                    onChange={(e) =>
                      setNewRecord((prev) => ({ ...prev, value: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Input
                    placeholder="e.g., mmHg"
                    value={newRecord.unit}
                    onChange={(e) =>
                      setNewRecord((prev) => ({ ...prev, unit: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={newRecord.recorded_at}
                  onChange={(e) =>
                    setNewRecord((prev) => ({
                      ...prev,
                      recorded_at: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Additional notes..."
                  value={newRecord.notes}
                  onChange={(e) =>
                    setNewRecord((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>
              <Button onClick={handleAddRecord} className="w-full">
                Add Record
              </Button>
            </div>
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
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
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
          <CardHeader>
            <CardTitle>
              Your Records ({filteredRecords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading...
              </div>
            ) : filteredRecords.length > 0 ? (
              <div className="space-y-3">
                {filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{record.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="capitalize">
                            {record.category?.replace("_", " ")}
                          </span>
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(record.recorded_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {record.value !== null && (
                        <div className="text-right">
                          <p className="font-semibold">
                            {record.value} {record.unit}
                          </p>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No health records yet</p>
                <p className="text-sm mt-1">
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
