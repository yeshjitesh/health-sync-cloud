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
  { value: "blood_pressure", label: "Blood Pressure", unit: "mmHg", type: "dual", recordType: "vital_sign" },
  { value: "heart_rate", label: "Heart Rate", unit: "bpm", type: "single", recordType: "vital_sign" },
  { value: "glucose", label: "Blood Glucose", unit: "mg/dL", type: "single", recordType: "lab_result" },
  { value: "weight", label: "Weight", unit: "kg", type: "single", recordType: "vital_sign" },
  { value: "temperature", label: "Temperature", unit: "°C", type: "single", recordType: "vital_sign" },
  { value: "cholesterol", label: "Cholesterol", unit: "mg/dL", type: "single", recordType: "lab_result" },
  { value: "hemoglobin", label: "Hemoglobin", unit: "g/dL", type: "single", recordType: "lab_result" },
  { value: "oxygen_saturation", label: "Oxygen Saturation", unit: "%", type: "single", recordType: "vital_sign" },
  { value: "respiratory_rate", label: "Respiratory Rate", unit: "breaths/min", type: "single", recordType: "vital_sign" },
  { value: "hba1c", label: "HbA1c", unit: "%", type: "single", recordType: "lab_result" },
  { value: "creatinine", label: "Creatinine", unit: "mg/dL", type: "single", recordType: "lab_result" },
  { value: "egfr", label: "eGFR", unit: "mL/min", type: "single", recordType: "lab_result" },
  { value: "alt", label: "ALT (Liver)", unit: "U/L", type: "single", recordType: "lab_result" },
  { value: "ast", label: "AST (Liver)", unit: "U/L", type: "single", recordType: "lab_result" },
  { value: "other", label: "Other", unit: "", type: "custom", recordType: "other" },
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
    hba1c: "HbA1c Test",
    creatinine: "Creatinine Test",
    egfr: "eGFR Test",
    alt: "ALT Liver Function Test",
    ast: "AST Liver Function Test",
  };
  return suggestions[category] || "";
};

const getNormalRange = (category: string): string => {
  const ranges: Record<string, string> = {
    blood_pressure: "Normal: 90-120/60-80 mmHg",
    heart_rate: "Normal: 60-100 bpm",
    glucose: "Fasting: 70-100 mg/dL",
    temperature: "Normal: 36.1-37.2 °C",
    cholesterol: "Desirable: <200 mg/dL",
    hemoglobin: "Men: 13.5-17.5, Women: 12-16 g/dL",
    oxygen_saturation: "Normal: 95-100%",
    respiratory_rate: "Normal: 12-20 breaths/min",
    hba1c: "Normal: <5.7%",
    creatinine: "Men: 0.7-1.3, Women: 0.6-1.1 mg/dL",
    egfr: "Normal: >90 mL/min",
    alt: "Normal: 7-56 U/L",
    ast: "Normal: 10-40 U/L",
  };
  return ranges[category] || "";
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
        record_type: selectedCategory.recordType,
      }));
    }
  }, [formData.category, selectedCategory]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleCategoryChange = (value: string) => {
    const category = categories.find((c) => c.value === value);
    setFormData((prev) => ({
      ...prev,
      category: value,
      value: "",
      value2: "",
      unit: category?.unit || "",
      title: getTitleSuggestion(value),
      record_type: category?.recordType || "",
    }));
  };

  const normalRange = selectedCategory ? getNormalRange(selectedCategory.value) : "";

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Category *</Label>
        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="h-11 mt-1.5">
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
        <Label className="text-sm font-medium">Record Type *</Label>
        <Select
          value={formData.record_type}
          onValueChange={(v) => setFormData((prev) => ({ ...prev, record_type: v }))}
        >
          <SelectTrigger className="h-11 mt-1.5">
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
        <Label className="text-sm font-medium">Title *</Label>
        <Input
          placeholder="e.g., Morning Blood Pressure"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="h-11 mt-1.5"
        />
      </div>

      {/* Dynamic value inputs based on category */}
      {selectedCategory?.type === "dual" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Systolic (mmHg) *</Label>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="e.g., 120"
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
              className="h-11 mt-1.5"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Diastolic (mmHg) *</Label>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="e.g., 80"
              value={formData.value2}
              onChange={(e) => setFormData((prev) => ({ ...prev, value2: e.target.value }))}
              className="h-11 mt-1.5"
            />
          </div>
        </div>
      )}

      {selectedCategory?.type === "single" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Value *</Label>
            <Input
              type="number"
              inputMode="decimal"
              step="any"
              placeholder={`e.g., ${selectedCategory.value === "weight" ? "70" : "100"}`}
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
              className="h-11 mt-1.5"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Unit</Label>
            <Input value={selectedCategory.unit} disabled className="bg-muted h-11 mt-1.5" />
          </div>
        </div>
      )}

      {selectedCategory?.type === "custom" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Value</Label>
            <Input
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Enter value"
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
              className="h-11 mt-1.5"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Unit</Label>
            <Input
              placeholder="Enter unit"
              value={formData.unit}
              onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
              className="h-11 mt-1.5"
            />
          </div>
        </div>
      )}

      {normalRange && (
        <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
          📊 {normalRange}
        </p>
      )}

      <div>
        <Label className="text-sm font-medium">Date & Time</Label>
        <Input
          type="datetime-local"
          value={formData.recorded_at}
          onChange={(e) => setFormData((prev) => ({ ...prev, recorded_at: e.target.value }))}
          className="h-11 mt-1.5"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Notes</Label>
        <Textarea
          placeholder="Additional notes..."
          value={formData.notes}
          onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
          className="mt-1.5"
        />
      </div>

      <Button onClick={handleSubmit} className="w-full h-11" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Record"}
      </Button>
    </div>
  );
}
