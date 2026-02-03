import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Predict from "./pages/Predict";
import Records from "./pages/Records";
import Medications from "./pages/Medications";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Chat />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/predict"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Predict />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/records"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Records />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/medications"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Medications />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Profile />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
