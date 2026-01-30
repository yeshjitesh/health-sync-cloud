import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  Activity,
  Heart,
  Droplet,
  Scale,
  MessageCircle,
  FileText,
  Pill,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface VitalSummary {
  bloodPressure?: { systolic: number; diastolic: number };
  heartRate?: number;
  glucose?: number;
  weight?: number;
}

interface HealthRecord {
  id: string;
  title: string;
  category: string;
  value: number | null;
  unit: string | null;
  recorded_at: string;
}

export default function Dashboard() {
  const { user } = useAuthContext();
  const [vitals, setVitals] = useState<VitalSummary>({});
  const [recentRecords, setRecentRecords] = useState<HealthRecord[]>([]);
  const [weightData, setWeightData] = useState<{ date: string; weight: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch latest vitals
      const { data: records } = await supabase
        .from("health_records")
        .select("*")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(50);

      if (records) {
        setRecentRecords(records.slice(0, 5) as HealthRecord[]);

        // Extract latest vitals
        const bp = records.find((r) => r.category === "blood_pressure");
        const hr = records.find((r) => r.category === "heart_rate");
        const gl = records.find((r) => r.category === "glucose");
        const wt = records.find((r) => r.category === "weight");

        setVitals({
          bloodPressure: bp?.value_text
            ? { systolic: 120, diastolic: 80 }
            : undefined,
          heartRate: hr?.value ?? undefined,
          glucose: gl?.value ?? undefined,
          weight: wt?.value ?? undefined,
        });

        // Weight trend data
        const weightRecords = records
          .filter((r) => r.category === "weight" && r.value)
          .slice(0, 7)
          .reverse()
          .map((r) => ({
            date: new Date(r.recorded_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            weight: r.value!,
          }));
        setWeightData(weightRecords);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const vitalCards = [
    {
      title: "Blood Pressure",
      value: vitals.bloodPressure
        ? `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`
        : "—",
      unit: "mmHg",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
    },
    {
      title: "Heart Rate",
      value: vitals.heartRate ?? "—",
      unit: "bpm",
      icon: Activity,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Blood Glucose",
      value: vitals.glucose ?? "—",
      unit: "mg/dL",
      icon: Droplet,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Weight",
      value: vitals.weight ?? "—",
      unit: "kg",
      icon: Scale,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  const quickActions = [
    {
      title: "Chat with AI",
      description: "Get health advice",
      icon: MessageCircle,
      path: "/chat",
      gradient: "gradient-primary",
    },
    {
      title: "Disease Predictor",
      description: "Assess your risk",
      icon: TrendingUp,
      path: "/predict",
      gradient: "gradient-accent",
    },
    {
      title: "Add Record",
      description: "Log health data",
      icon: FileText,
      path: "/records",
      gradient: "bg-secondary",
    },
    {
      title: "Medications",
      description: "Track your meds",
      icon: Pill,
      path: "/medications",
      gradient: "bg-muted",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-primary rounded-2xl p-6 text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back,{" "}
              {user?.user_metadata?.full_name?.split(" ")[0] || "there"}! 👋
            </h2>
            <p className="text-white/80">
              Your health dashboard is ready. Let's check your wellness today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">AI Insights Available</span>
          </div>
        </div>
      </motion.div>

      {/* Vital Signs Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {vitalCards.map((vital, index) => {
          const Icon = vital.icon;
          return (
            <motion.div
              key={vital.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${vital.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${vital.color}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {vital.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{vital.value}</span>
                    <span className="text-sm text-muted-foreground">
                      {vital.unit}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weight Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weight Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weightData.length > 0 ? (
                <ChartContainer
                  config={{
                    weight: {
                      label: "Weight",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <LineChart data={weightData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="var(--color-weight)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-weight)" }}
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  <p>No weight data yet. Start logging to see trends!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.path} to={action.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-3 hover:bg-muted"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${action.gradient} flex items-center justify-center mr-3`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Health Records</CardTitle>
            <Link to="/records">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentRecords.length > 0 ? (
              <div className="space-y-3">
                {recentRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{record.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.category?.replace("_", " ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {record.value ?? "—"} {record.unit}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(record.recorded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No health records yet.</p>
                <Link to="/records">
                  <Button variant="link">Add your first record</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
