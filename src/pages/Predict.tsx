import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  {
    id: "diabetes",
    name: "Diabetes Risk",
    icon: Droplet,
    description: "Assess your risk for Type 2 Diabetes",
  },
  {
    id: "heart",
    name: "Heart Disease",
    icon: Heart,
    description: "Evaluate cardiovascular risk factors",
  },
  {
    id: "kidney",
    name: "Kidney Disease",
    icon: Activity,
    description: "Check kidney function indicators",
  },
  {
    id: "liver",
    name: "Liver Disease",
    icon: Activity,
    description: "Assess liver health markers",
  },
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

      // Save to database
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
      case "low":
        return "text-green-600";
      case "medium":
        return "text-amber-500";
      case "high":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return CheckCircle;
      case "medium":
        return AlertCircle;
      case "high":
        return AlertTriangle;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Disease Risk Predictor</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered health risk assessment based on your health metrics
        </p>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-2 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">
            These predictions are for informational purposes only and should not
            be used as a substitute for professional medical diagnosis. Always
            consult with a healthcare provider for proper medical evaluation.
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Disease Selection & Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Select Assessment Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={selectedDisease}
                onValueChange={(v) => {
                  setSelectedDisease(v);
                  setFormData({});
                  setResult(null);
                }}
              >
                <TabsList className="grid grid-cols-4 mb-6">
                  {diseaseTypes.map((disease) => (
                    <TabsTrigger key={disease.id} value={disease.id}>
                      <disease.icon className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{disease.name.split(" ")[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="diabetes" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Age</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 45"
                        value={formData.age || ""}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>BMI</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 24.5"
                        value={formData.bmi || ""}
                        onChange={(e) => handleInputChange("bmi", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Fasting Glucose (mg/dL)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 100"
                        value={formData.glucose || ""}
                        onChange={(e) => handleInputChange("glucose", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>HbA1c (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 5.7"
                        value={formData.hba1c || ""}
                        onChange={(e) => handleInputChange("hba1c", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Family History of Diabetes</Label>
                      <Select
                        value={formData.familyHistory || ""}
                        onValueChange={(v) => handleInputChange("familyHistory", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="multiple">Multiple relatives</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Physical Activity Level</Label>
                      <Select
                        value={formData.activity || ""}
                        onValueChange={(v) => handleInputChange("activity", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary</SelectItem>
                          <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderate (3-4 days/week)</SelectItem>
                          <SelectItem value="active">Active (5+ days/week)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="heart" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Age</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 50"
                        value={formData.age || ""}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Systolic Blood Pressure (mmHg)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 120"
                        value={formData.systolic || ""}
                        onChange={(e) => handleInputChange("systolic", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Total Cholesterol (mg/dL)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 200"
                        value={formData.cholesterol || ""}
                        onChange={(e) => handleInputChange("cholesterol", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>HDL Cholesterol (mg/dL)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 50"
                        value={formData.hdl || ""}
                        onChange={(e) => handleInputChange("hdl", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Smoking Status</Label>
                      <Select
                        value={formData.smoking || ""}
                        onValueChange={(v) => handleInputChange("smoking", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never smoked</SelectItem>
                          <SelectItem value="former">Former smoker</SelectItem>
                          <SelectItem value="current">Current smoker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Diabetes Status</Label>
                      <Select
                        value={formData.diabetes || ""}
                        onValueChange={(v) => handleInputChange("diabetes", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No diabetes</SelectItem>
                          <SelectItem value="prediabetes">Prediabetes</SelectItem>
                          <SelectItem value="yes">Diagnosed diabetes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="kidney" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Age</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 55"
                        value={formData.age || ""}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>eGFR (mL/min/1.73m²)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 90"
                        value={formData.egfr || ""}
                        onChange={(e) => handleInputChange("egfr", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Creatinine (mg/dL)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 1.0"
                        value={formData.creatinine || ""}
                        onChange={(e) => handleInputChange("creatinine", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>BUN (mg/dL)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 15"
                        value={formData.bun || ""}
                        onChange={(e) => handleInputChange("bun", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Blood Pressure History</Label>
                      <Select
                        value={formData.bpHistory || ""}
                        onValueChange={(v) => handleInputChange("bpHistory", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="controlled">Controlled hypertension</SelectItem>
                          <SelectItem value="uncontrolled">Uncontrolled hypertension</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Diabetes Status</Label>
                      <Select
                        value={formData.diabetes || ""}
                        onValueChange={(v) => handleInputChange("diabetes", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No diabetes</SelectItem>
                          <SelectItem value="yes">Has diabetes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="liver" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Age</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 45"
                        value={formData.age || ""}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>ALT (U/L)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 30"
                        value={formData.alt || ""}
                        onChange={(e) => handleInputChange("alt", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>AST (U/L)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 25"
                        value={formData.ast || ""}
                        onChange={(e) => handleInputChange("ast", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Bilirubin (mg/dL)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 0.8"
                        value={formData.bilirubin || ""}
                        onChange={(e) => handleInputChange("bilirubin", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Albumin (g/dL)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 4.0"
                        value={formData.albumin || ""}
                        onChange={(e) => handleInputChange("albumin", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Alcohol Consumption</Label>
                      <Select
                        value={formData.alcohol || ""}
                        onValueChange={(v) => handleInputChange("alcohol", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="heavy">Heavy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                onClick={handlePredict}
                disabled={isLoading || Object.keys(formData).length < 3}
                className="w-full mt-6 gradient-primary"
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

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Assessment Result</CardTitle>
              <CardDescription>
                Your personalized risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  {/* Risk Score */}
                  <div className="text-center">
                    {(() => {
                      const RiskIcon = getRiskIcon(result.riskLevel);
                      return (
                        <RiskIcon
                          className={`w-16 h-16 mx-auto mb-2 ${getRiskColor(
                            result.riskLevel
                          )}`}
                        />
                      );
                    })()}
                    <p
                      className={`text-2xl font-bold capitalize ${getRiskColor(
                        result.riskLevel
                      )}`}
                    >
                      {result.riskLevel} Risk
                    </p>
                    <div className="mt-4">
                      <Progress
                        value={result.riskScore}
                        className="h-3"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Risk Score: {result.riskScore}%
                      </p>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Analysis</h4>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                      <ReactMarkdown>{result.analysis}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill in your health data and click "Get Risk Assessment"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
