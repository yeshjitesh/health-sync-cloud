import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface RecordFormData {
  record_type: string;
  category: string;
  title: string;
  value: string;
  value2: string; // For blood pressure diastolic
  unit: string;
  notes: string;
  recorded_at: string;
}

interface DynamicRecordFormProps {
  onSubmit: (data: RecordFormData) => void;
  isSubmitting?: boolean;
}

const categories = [
  { value: "blood_pressure", label: "Blood Pressure", unit: "mmHg", type: "dual" },
  { value: "heart_rate", label: "Heart Rate", unit: "bpm", type: "single" },
  { value: "glucose", label: "Blood Glucose", unit: "mg/dL", type: "single" },
  { value: "weight", label: "Weight", unit: "kg", type: "single" },
  { value: "temperature", label: "Temperature", unit: "°C", type: "single" },
  { value: "cholesterol", label: "Cholesterol", unit: "mg/dL", type: "single" },
  { value: "hemoglobin", label: "Hemoglobin", unit: "g/dL", type: "single" },
  { value: "oxygen_saturation", label: "Oxygen Saturation", unit: "%", type: "single" },
  { value: "respiratory_rate", label: "Respiratory Rate", unit: "breaths/min", type: "single" },
  { value: "other", label: "Other", unit: "", type: "custom" },
];

const recordTypes = [
  { value: "vital_sign", label: "Vital Sign" },
  { value: "lab_result", label: "Lab Result" },
  { value: "imaging", label: "Imaging" },
  { value: "other", label: "Other" },
];

const getTitleSuggestion = (category: string): string => {
  const suggestions: Record<string, string> = {
    blood_pressure: "Blood Pressure Reading",
    heart_rate: "Heart Rate Check",
    glucose: "Blood Glucose Test",
    weight: "Weight Measurement",
    temperature: "Temperature Check",
    cholesterol: "Cholesterol Test",
    hemoglobin: "Hemoglobin Test",
    oxygen_saturation: "SpO2 Reading",
    respiratory_rate: "Respiratory Rate",
  };
  return suggestions[category] || "";
};

export function DynamicRecordForm({ onSubmit, isSubmitting }: DynamicRecordFormProps) {
  const [formData, setFormData] = useState<RecordFormData>({
    record_type: "",
    category: "",
    title: "",
    value: "",
    value2: "",
    unit: "",
    notes: "",
    recorded_at: new Date().toISOString().slice(0, 16),
  });

  const selectedCategory = categories.find((c) => c.value === formData.category);

  useEffect(() => {
    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        unit: selectedCategory.unit,
        title: prev.title || getTitleSuggestion(selectedCategory.value),
      }));
    }
  }, [formData.category]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
      value: "",
      value2: "",
      unit: categories.find((c) => c.value === value)?.unit || "",
      title: getTitleSuggestion(value),
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Record Type *</Label>
        <Select
          value={formData.record_type}
          onValueChange={(v) => setFormData((prev) => ({ ...prev, record_type: v }))}
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
        <Select value={formData.category} onValueChange={handleCategoryChange}>
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
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        />
      </div>

      {/* Dynamic value inputs based on category */}
      {selectedCategory?.type === "dual" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Systolic (mmHg) *</Label>
            <Input
              type="number"
              placeholder="e.g., 120"
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
            />
          </div>
          <div>
            <Label>Diastolic (mmHg) *</Label>
            <Input
              type="number"
              placeholder="e.g., 80"
              value={formData.value2}
              onChange={(e) => setFormData((prev) => ({ ...prev, value2: e.target.value }))}
            />
          </div>
        </div>
      )}

      {selectedCategory?.type === "single" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Value *</Label>
            <Input
              type="number"
              step="any"
              placeholder={`e.g., ${selectedCategory.value === "weight" ? "70" : "100"}`}
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
            />
          </div>
          <div>
            <Label>Unit</Label>
            <Input value={selectedCategory.unit} disabled className="bg-muted" />
          </div>
        </div>
      )}

      {selectedCategory?.type === "custom" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              step="any"
              placeholder="Enter value"
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
            />
          </div>
          <div>
            <Label>Unit</Label>
            <Input
              placeholder="Enter unit"
              value={formData.unit}
              onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
            />
          </div>
        </div>
      )}

      <div>
        <Label>Date & Time</Label>
        <Input
          type="datetime-local"
          value={formData.recorded_at}
          onChange={(e) => setFormData((prev) => ({ ...prev, recorded_at: e.target.value }))}
        />
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea
          placeholder="Additional notes..."
          value={formData.notes}
          onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Record"}
      </Button>
    </div>
  );
}
