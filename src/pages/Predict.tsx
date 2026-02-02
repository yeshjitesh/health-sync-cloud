import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  Heart,
  Droplet,
  Activity,
  Loader2,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface PredictionResult {
  riskLevel: "low" | "medium" | "high";
  riskScore: number;
  analysis: string;
  recommendations: string[];
}

const diseaseTypes = [
  { id: "diabetes", name: "Diabetes", icon: Droplet, description: "Type 2 Diabetes risk" },
  { id: "heart", name: "Heart", icon: Heart, description: "Cardiovascular risk" },
  { id: "kidney", name: "Kidney", icon: Activity, description: "Kidney function" },
  { id: "liver", name: "Liver", icon: Activity, description: "Liver health" },
];

const PREDICT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-disease`;

export default function Predict() {
  const { user } = useAuthContext();
  const [selectedDisease, setSelectedDisease] = useState("diabetes");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(PREDICT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          diseaseType: selectedDisease,
          inputData: formData,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again later.");
          return;
        }
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);

      await supabase.from("disease_assessments").insert({
        user_id: user!.id,
        disease_type: selectedDisease,
        input_data: formData,
        risk_level: data.riskLevel,
        risk_score: data.riskScore,
        ai_analysis: data.analysis,
        recommendations: data.recommendations,
      });

      toast.success("Assessment saved to your records");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "text-green-600";
      case "medium": return "text-amber-500";
      case "high": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low": return CheckCircle;
      case "medium": return AlertCircle;
      case "high": return AlertTriangle;
      default: return AlertCircle;
    }
  };

  const renderFormFields = () => {
    const commonFields = (
      <div>
        <Label className="text-xs md:text-sm">Age</Label>
        <Input
          type="number"
          placeholder="e.g., 45"
          value={formData.age || ""}
          onChange={(e) => handleInputChange("age", e.target.value)}
        />
      </div>
    );

    switch (selectedDisease) {
      case "diabetes":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {commonFields}
            <div>
              <Label className="text-xs md:text-sm">BMI</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="e.g., 24.5"
                value={formData.bmi || ""}
                onChange={(e) => handleInputChange("bmi", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Fasting Glucose (mg/dL)</Label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={formData.glucose || ""}
                onChange={(e) => handleInputChange("glucose", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs md:text-sm">HbA1c (%)</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="e.g., 5.7"
                value={formData.hba1c || ""}
                onChange={(e) => handleInputChange("hba1c", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Family History</Label>
              <Select value={formData.familyHistory || ""} onValueChange={(v) => handleInputChange("familyHistory", v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="multiple">Multiple</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs md:text-sm">Activity Level</Label>
              <Select value={formData.activity || ""} onValueChange={(v) => handleInputChange("activity", v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "heart":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {commonFields}
            <div>
              <Label className="text-xs md:text-sm">Systolic BP (mmHg)</Label>
              <Input type="number" placeholder="e.g., 120" value={formData.systolic || ""} onChange={(e) => handleInputChange("systolic", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Total Cholesterol (mg/dL)</Label>
              <Input type="number" placeholder="e.g., 200" value={formData.cholesterol || ""} onChange={(e) => handleInputChange("cholesterol", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">HDL (mg/dL)</Label>
              <Input type="number" placeholder="e.g., 50" value={formData.hdl || ""} onChange={(e) => handleInputChange("hdl", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Smoking Status</Label>
              <Select value={formData.smoking || ""} onValueChange={(v) => handleInputChange("smoking", v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="former">Former</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs md:text-sm">Diabetes</Label>
              <Select value={formData.diabetes || ""} onValueChange={(v) => handleInputChange("diabetes", v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="prediabetes">Prediabetes</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "kidney":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {commonFields}
            <div>
              <Label className="text-xs md:text-sm">eGFR</Label>
              <Input type="number" placeholder="e.g., 90" value={formData.egfr || ""} onChange={(e) => handleInputChange("egfr", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Creatinine (mg/dL)</Label>
              <Input type="number" step="0.1" placeholder="e.g., 1.0" value={formData.creatinine || ""} onChange={(e) => handleInputChange("creatinine", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">BUN (mg/dL)</Label>
              <Input type="number" placeholder="e.g., 15" value={formData.bun || ""} onChange={(e) => handleInputChange("bun", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">BP History</Label>
              <Select value={formData.bpHistory || ""} onValueChange={(v) => handleInputChange("bpHistory", v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="controlled">Controlled</SelectItem>
                  <SelectItem value="uncontrolled">Uncontrolled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs md:text-sm">Diabetes</Label>
              <Select value={formData.diabetes || ""} onValueChange={(v) => handleInputChange("diabetes", v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "liver":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {commonFields}
            <div>
              <Label className="text-xs md:text-sm">ALT (U/L)</Label>
              <Input type="number" placeholder="e.g., 30" value={formData.alt || ""} onChange={(e) => handleInputChange("alt", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">AST (U/L)</Label>
              <Input type="number" placeholder="e.g., 25" value={formData.ast || ""} onChange={(e) => handleInputChange("ast", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Bilirubin (mg/dL)</Label>
              <Input type="number" step="0.1" placeholder="e.g., 1.0" value={formData.bilirubin || ""} onChange={(e) => handleInputChange("bilirubin", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Albumin (g/dL)</Label>
              <Input type="number" step="0.1" placeholder="e.g., 4.0" value={formData.albumin || ""} onChange={(e) => handleInputChange("albumin", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs md:text-sm">Alcohol Use</Label>
              <Select value={formData.alcohol || ""} onValueChange={(v) => handleInputChange("alcohol", v)}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Disease Risk Predictor</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          AI-powered health risk assessment based on your metrics
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-2 p-3 md:p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-lg text-xs md:text-sm">
          <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
          <p>
            These predictions are for informational purposes only. Always consult a healthcare provider for proper evaluation.
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Select Assessment Type</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <Tabs
                value={selectedDisease}
                onValueChange={(v) => {
                  setSelectedDisease(v);
                  setFormData({});
                  setResult(null);
                }}
              >
                <TabsList className="grid grid-cols-4 mb-4 md:mb-6 h-auto">
                  {diseaseTypes.map((disease) => (
                    <TabsTrigger key={disease.id} value={disease.id} className="flex-col gap-1 py-2 md:py-3 text-[10px] sm:text-xs md:text-sm">
                      <disease.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span>{disease.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {diseaseTypes.map((disease) => (
                  <TabsContent key={disease.id} value={disease.id}>
                    {renderFormFields()}
                  </TabsContent>
                ))}
              </Tabs>

              <Button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full mt-4 md:mt-6 gradient-primary"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Get Risk Assessment"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-fit">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Results</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    {(() => {
                      const RiskIcon = getRiskIcon(result.riskLevel);
                      return (
                        <>
                          <RiskIcon className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 ${getRiskColor(result.riskLevel)}`} />
                          <p className={`text-xl md:text-2xl font-bold capitalize ${getRiskColor(result.riskLevel)}`}>
                            {result.riskLevel} Risk
                          </p>
                          <p className="text-sm text-muted-foreground">Score: {result.riskScore}/100</p>
                        </>
                      );
                    })()}
                  </div>
                  <Progress value={result.riskScore} className="h-2" />
                  <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
                    <ReactMarkdown>{result.analysis}</ReactMarkdown>
                  </div>
                  {result.recommendations?.length > 0 && (
                    <div>
                      <p className="font-medium text-sm mb-2">Recommendations:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-muted-foreground">
                        {result.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Enter your health data and click "Get Risk Assessment"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
