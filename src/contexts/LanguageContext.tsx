import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, Translations, languageNames } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "./AuthContext";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("dvds-language");
    return (stored as Language) || "en";
  });

  // Load language from profile on mount
  useEffect(() => {
    if (user) {
      loadLanguageFromProfile();
    }
  }, [user]);

  const loadLanguageFromProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("language")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data?.language && ["en", "gu", "pt"].includes(data.language)) {
      setLanguageState(data.language as Language);
      localStorage.setItem("dvds-language", data.language);
    }
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("dvds-language", lang);

    // Save to profile if user is logged in
    if (user) {
      await supabase
        .from("profiles")
        .update({ language: lang })
        .eq("user_id", user.id);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        languageNames,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
