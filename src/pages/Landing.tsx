 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Landing.tsx b/src/pages/Landing.tsx
index 48e56caa65b0c1159380b2ba6762578b7e9278a6..4babac8268cc3ccab81a92caa17167cd3fe90931 100644
--- a/src/pages/Landing.tsx
+++ b/src/pages/Landing.tsx
@@ -1,42 +1,47 @@
 import { useNavigate, Link } from "react-router-dom";
 import { motion, useScroll, useTransform } from "framer-motion";
 import { Button } from "@/components/ui/button";
 import { useAuthContext } from "@/contexts/AuthContext";
 import { useEffect, useRef, useState } from "react";
 import { Footer } from "@/components/layout/Footer";
-import { Heart, Activity, FileText, Sparkles, Pill, Bot, Users, BarChart3, Shield, Stethoscope, ArrowRight, Star, HeartPulse, Zap, Clock, TrendingUp } from "lucide-react";
+import { Heart, Activity, FileText, Sparkles, Pill, Bot, Users, BarChart3, Shield, Stethoscope, ArrowRight, Star, HeartPulse, Zap, Clock, TrendingUp, MapPin } from "lucide-react";
 const features = [{
   icon: Bot,
   title: "DVDS Bot",
   description: "Get instant answers to your health questions with our AI-powered assistant",
   color: "from-primary to-purple-500"
 }, {
   icon: Stethoscope,
   title: "Disease Predictor",
   description: "Assess your risk for diabetes, heart disease, kidney and liver conditions",
   color: "from-accent to-orange-500"
+}, {
+  icon: MapPin,
+  title: "Community Health Risk Radar",
+  description: "Realtime, geo-aware alerts from anonymised vitals and public data trends",
+  color: "from-fuchsia-500 to-pink-500"
 }, {
   icon: FileText,
   title: "Health Records",
   description: "Track vital signs, lab results, and health metrics with smart auto-fill",
   color: "from-green-500 to-emerald-500"
 }, {
   icon: Pill,
   title: "Medication Tracker",
   description: "Never miss a dose with real-time medication tracking and reminders",
   color: "from-blue-500 to-cyan-500"
 }];
 const stats = [{
   value: "500+",
   label: "Community Members",
   icon: Users
 }, {
   value: "10K+",
   label: "Health Records Tracked",
   icon: BarChart3
 }, {
   value: "24/7",
   label: "AI Health Support",
   icon: Bot
 }, {
   value: "100%",
@@ -378,50 +383,117 @@ export default function Landing() {
                 delay: 0.6 + index * 0.1
               }} whileHover={{
                 y: -10,
                 scale: 1.02
               }} className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 group cursor-pointer">
                     <motion.div whileHover={{
                   rotate: [0, -10, 10, 0]
                 }} transition={{
                   duration: 0.5
                 }} className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                       <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                     </motion.div>
                     <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                       {feature.title}
                     </h3>
                     <p className="text-white/60 text-sm">
                       {feature.description}
                     </p>
                   </motion.div>;
             })}
             </div>
           </motion.div>
         </div>
       </motion.div>
 
+      <section className="py-16 md:py-20 bg-gradient-to-b from-black/5 to-black/10">
+        <div className="max-w-6xl mx-auto px-4">
+          <motion.div initial={{
+          opacity: 0,
+          y: 30
+        }} whileInView={{
+          opacity: 1,
+          y: 0
+        }} viewport={{
+          once: true
+        }} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
+            <div>
+              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-4">
+                <MapPin className="w-4 h-4 text-primary" />
+                Community Health Risk Radar
+              </div>
+              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
+                Realtime + Geo-Aware
+              </h2>
+              <p className="text-white/70 text-base md:text-lg mb-6">
+                Aggregates anonymised vitals alongside trusted public datasets to detect emerging local health risks in realtime.
+              </p>
+              <div className="space-y-4 text-white/70 text-sm md:text-base">
+                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
+                  <p className="font-semibold text-white mb-1">What makes it unique</p>
+                  <p>
+                    Community-level intelligence that blends anonymised biometrics with public health signals.
+                  </p>
+                </div>
+                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
+                  <p className="font-semibold text-white mb-1">Example</p>
+                  <p>“Rising BP &amp; dehydration trends detected in your area this week.”</p>
+                </div>
+                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
+                  <p className="font-semibold text-white mb-1">Why it matters</p>
+                  <p>
+                    Preventive, population-level health insight that is rare in consumer health apps.
+                  </p>
+                </div>
+              </div>
+            </div>
+            <motion.div whileHover={{
+            y: -6
+          }} className="p-6 md:p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-xl">
+              <div className="flex items-center justify-between mb-6">
+                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
+                  <MapPin className="w-6 h-6 text-white" />
+                </div>
+                <span className="text-xs uppercase tracking-[0.2em] text-white/50">Realtime signal</span>
+              </div>
+              <h3 className="text-xl font-semibold text-white mb-3">Community Health Risk Radar</h3>
+              <p className="text-white/70 text-sm mb-5">
+                See localized alerts for heat stress, BP spikes, or dehydration risks based on anonymised trends.
+              </p>
+              <div className="space-y-3">
+                {["Geo-aware alerts", "Anonymised vitals aggregation", "Public health signal fusion"].map((item) => (
+                  <div key={item} className="flex items-center gap-3 text-white/70 text-sm">
+                    <span className="w-2 h-2 rounded-full bg-primary" />
+                    <span>{item}</span>
+                  </div>
+                ))}
+              </div>
+            </motion.div>
+          </motion.div>
+        </div>
+      </section>
+
       {/* Why Choose Section */}
       <section className="py-16 md:py-20 bg-gradient-to-b from-transparent to-black/10">
         <div className="max-w-6xl mx-auto px-4">
           <motion.div initial={{
           opacity: 0,
           y: 30
         }} whileInView={{
           opacity: 1,
           y: 0
         }} viewport={{
           once: true
         }} className="text-center mb-12">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
               Why Choose DVDS-Health?
             </h2>
             <p className="text-white/60 max-w-2xl mx-auto">
               Built specifically for our community with features that matter most.
             </p>
           </motion.div>
 
           <div className="grid md:grid-cols-3 gap-6">
             {[{
             icon: Zap,
             title: "Real-Time Sync",
             desc: "Your health data syncs instantly across all devices"
@@ -583,26 +655,26 @@ export default function Landing() {
                 <Heart className="w-8 h-8 text-white" />
               </motion.div>
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                 Start Your Health Journey Today
               </h2>
               <p className="text-white/80 mb-8 max-w-xl mx-auto">
                 Join hundreds of community members already using DVDS-Health to take control of their wellness.
               </p>
               <motion.div whileHover={{
               scale: 1.05
             }} whileTap={{
               scale: 0.98
             }}>
                 <Button onClick={handleSignIn} size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-xl">
                   Get Started Free
                   <ArrowRight className="w-5 h-5 ml-2" />
                 </Button>
               </motion.div>
             </div>
           </motion.div>
         </div>
       </section>
 
       <Footer />
     </div>;
-}
\ No newline at end of file
+}
 
EOF
)
