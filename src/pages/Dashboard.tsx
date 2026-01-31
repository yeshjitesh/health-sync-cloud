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
  Bot,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

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
  value_text: string | null;
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
    if (user) {
      fetchDashboardData();

      // Subscribe to realtime updates
      const channel = supabase
        .channel("dashboard_records")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "health_records",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchDashboardData();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      const { data: records } = await supabase
        .from("health_records")
        .select("*")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(50);

      if (records) {
        setRecentRecords(records.slice(0, 5) as HealthRecord[]);

        const bp = records.find((r) => r.category === "blood_pressure");
        const hr = records.find((r) => r.category === "heart_rate");
        const gl = records.find((r) => r.category === "glucose");
        const wt = records.find((r) => r.category === "weight");

        // Parse blood pressure from value_text if available
        let bloodPressure;
        if (bp?.value_text) {
          const parts = bp.value_text.split("/");
          if (parts.length === 2) {
            bloodPressure = {
              systolic: parseInt(parts[0]),
              diastolic: parseInt(parts[1]),
            };
          }
        }

        setVitals({
          bloodPressure,
          heartRate: hr?.value ?? undefined,
          glucose: gl?.value ?? undefined,
          weight: wt?.value ?? undefined,
        });

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
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      title: "Heart Rate",
      value: vitals.heartRate ?? "—",
      unit: "bpm",
      icon: Activity,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Blood Glucose",
      value: vitals.glucose ?? "—",
      unit: "mg/dL",
      icon: Droplet,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Weight",
      value: vitals.weight ?? "—",
      unit: "kg",
      icon: Scale,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  const quickActions = [
    {
      title: "DVDL Bot",
      description: "Get health advice",
      icon: Bot,
      path: "/chat",
      gradient: "gradient-primary",
    },
    {
      title: "Predictor",
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
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-primary rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
              Welcome back, {user?.user_metadata?.full_name?.split(" ")[0] || "there"}! 👋
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              Your health dashboard is ready. Let's check your wellness today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg shrink-0">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">AI Insights</span>
          </div>
        </div>
      </motion.div>

      {/* Vital Signs Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${vital.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${vital.color}`} />
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground truncate">
                      {vital.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-2xl font-bold">{vital.value}</span>
                    <span className="text-xs md:text-sm text-muted-foreground">{vital.unit}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Weight Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Weight Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {weightData.length > 0 ? (
                <ChartContainer
                  config={{ weight: { label: "Weight", color: "hsl(var(--primary))" } }}
                  className="h-[150px] md:h-[200px]"
                >
                  <LineChart data={weightData}>
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 10 }} />
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
                <div className="h-[150px] md:h-[200px] flex items-center justify-center text-muted-foreground text-sm">
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
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3 p-3 md:p-6 pt-0">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.path} to={action.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-2 md:py-3 hover:bg-muted"
                    >
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${action.gradient} flex items-center justify-center mr-2 md:mr-3 shrink-0`}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm md:text-base">{action.title}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">
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
          <CardHeader className="flex flex-row items-center justify-between pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg">Recent Health Records</CardTitle>
            <Link to="/records">
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            {recentRecords.length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                {recentRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-2 md:p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm md:text-base truncate">{record.title}</p>
                      <p className="text-xs md:text-sm text-muted-foreground capitalize">
                        {record.category?.replace("_", " ")}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="font-semibold text-sm md:text-base">
                        {record.value_text || record.value || "—"} {record.unit}
                      </p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">
                        {new Date(record.recorded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 md:py-8 text-muted-foreground">
                <FileText className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 opacity-50" />
                <p className="text-sm md:text-base">No health records yet.</p>
                <Link to="/records">
                  <Button variant="link" className="text-sm">Add your first record</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
