export type Language = 'en' | 'gu' | 'pt';

export interface Translations {
  // Navigation
  dashboard: string;
  chat: string;
  predictor: string;
  records: string;
  medications: string;
  profile: string;
  signOut: string;
  
  // Common
  welcome: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  loading: string;
  error: string;
  success: string;
  
  // Dashboard
  welcomeBack: string;
  healthDashboard: string;
  aiInsights: string;
  bloodPressure: string;
  heartRate: string;
  bloodGlucose: string;
  weight: string;
  weightTrend: string;
  quickActions: string;
  recentRecords: string;
  viewAll: string;
  noRecordsYet: string;
  addFirstRecord: string;
  getHealthAdvice: string;
  assessRisk: string;
  logHealthData: string;
  trackMeds: string;
  
  // Chat
  dvdsBot: string;
  aiHealthAssistant: string;
  startConversation: string;
  askAboutSymptoms: string;
  newChat: string;
  chatHistory: string;
  noConversations: string;
  sendMessage: string;
  disclaimer: string;
  
  // Predictor
  diseasePredictor: string;
  assessHealthRisks: string;
  diabetes: string;
  heartDisease: string;
  kidneyDisease: string;
  liverDisease: string;
  riskAssessment: string;
  enterHealthData: string;
  analyze: string;
  analyzing: string;
  
  // Records
  healthRecords: string;
  trackHealthMetrics: string;
  addRecord: string;
  recordType: string;
  category: string;
  value: string;
  unit: string;
  notes: string;
  recordedAt: string;
  
  // Medications
  medicationTracker: string;
  neverMissDose: string;
  addMedication: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  timeOfDay: string;
  startDate: string;
  endDate: string;
  refillReminder: string;
  active: string;
  inactive: string;
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
  
  // Profile
  profileSettings: string;
  personalInfo: string;
  healthInfo: string;
  regionLocation: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  emergencyContact: string;
  height: string;
  bloodType: string;
  yourRegion: string;
  shareLocation: string;
  locationEnabled: string;
  male: string;
  female: string;
  other: string;
  preferNotToSay: string;
  language: string;
  selectLanguage: string;
  
  // Footer
  privacyPolicy: string;
  termsOfService: string;
  aboutUs: string;
  contact: string;
  healthResources: string;
  medicalDisclaimer: string;
  
  // Landing
  forCommunity: string;
  aiPowered: string;
  healthCompanion: string;
  manageHealth: string;
  getStarted: string;
  learnMore: string;
  communityMembers: string;
  recordsTracked: string;
  aiSupport: string;
  dataPrivacy: string;
  everythingYouNeed: string;
  instantAnswers: string;
  assessRiskFor: string;
  trackVitals: string;
  neverMiss: string;
  whyChoose: string;
  builtForCommunity: string;
  realTimeSync: string;
  syncInstantly: string;
  available247: string;
  getGuidance: string;
  trackProgress: string;
  visualInsights: string;
  
  // Regions
  unitedKingdom: string;
  unitedStates: string;
  india: string;
  globalOther: string;
  nhsGuidelines: string;
  cdcGuidelines: string;
  icmrGuidelines: string;
  whoGuidelines: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    chat: "DVDS Bot",
    predictor: "Predictor",
    records: "Records",
    medications: "Medications",
    profile: "Profile",
    signOut: "Sign Out",
    
    // Common
    welcome: "Welcome",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    
    // Dashboard
    welcomeBack: "Welcome back",
    healthDashboard: "Your health dashboard is ready",
    aiInsights: "AI Insights",
    bloodPressure: "Blood Pressure",
    heartRate: "Heart Rate",
    bloodGlucose: "Blood Glucose",
    weight: "Weight",
    weightTrend: "Weight Trend",
    quickActions: "Quick Actions",
    recentRecords: "Recent Health Records",
    viewAll: "View All",
    noRecordsYet: "No health records yet",
    addFirstRecord: "Add your first record",
    getHealthAdvice: "Get health advice",
    assessRisk: "Assess your risk",
    logHealthData: "Log health data",
    trackMeds: "Track your meds",
    
    // Chat
    dvdsBot: "DVDS Bot",
    aiHealthAssistant: "Your AI Health Assistant",
    startConversation: "Start a conversation with DVDS Bot",
    askAboutSymptoms: "Ask about symptoms, health tips, or wellness questions",
    newChat: "New Chat",
    chatHistory: "Chat History",
    noConversations: "No conversations yet",
    sendMessage: "Send message",
    disclaimer: "DVDS Bot provides general health information only. Always consult a healthcare provider for medical concerns.",
    
    // Predictor
    diseasePredictor: "Disease Predictor",
    assessHealthRisks: "Assess your health risks with AI-powered analysis",
    diabetes: "Diabetes",
    heartDisease: "Heart Disease",
    kidneyDisease: "Kidney Disease",
    liverDisease: "Liver Disease",
    riskAssessment: "Risk Assessment",
    enterHealthData: "Enter your health data for analysis",
    analyze: "Analyze",
    analyzing: "Analyzing...",
    
    // Records
    healthRecords: "Health Records",
    trackHealthMetrics: "Track your health metrics over time",
    addRecord: "Add Record",
    recordType: "Record Type",
    category: "Category",
    value: "Value",
    unit: "Unit",
    notes: "Notes",
    recordedAt: "Recorded At",
    
    // Medications
    medicationTracker: "Medication Tracker",
    neverMissDose: "Never miss a dose with smart reminders",
    addMedication: "Add Medication",
    medicationName: "Medication Name",
    dosage: "Dosage",
    frequency: "Frequency",
    timeOfDay: "Time of Day",
    startDate: "Start Date",
    endDate: "End Date",
    refillReminder: "Refill Reminder",
    active: "Active",
    inactive: "Inactive",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    night: "Night",
    
    // Profile
    profileSettings: "Profile Settings",
    personalInfo: "Personal Information",
    healthInfo: "Health Information",
    regionLocation: "Region & Location",
    fullName: "Full Name",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    emergencyContact: "Emergency Contact",
    height: "Height",
    bloodType: "Blood Type",
    yourRegion: "Your Region",
    shareLocation: "Share Location",
    locationEnabled: "Location enabled",
    male: "Male",
    female: "Female",
    other: "Other",
    preferNotToSay: "Prefer not to say",
    language: "Language",
    selectLanguage: "Select language",
    
    // Footer
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    aboutUs: "About Us",
    contact: "Contact",
    healthResources: "Health Resources",
    medicalDisclaimer: "DVDS-Health provides AI-powered health information for educational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.",
    
    // Landing
    forCommunity: "For the Diu Vanja Darji Samaj Community",
    aiPowered: "Your AI-Powered",
    healthCompanion: "Health Companion",
    manageHealth: "Manage your health with intelligent disease prediction, symptom analysis, and comprehensive medical record tracking — designed with our community's wellness in mind.",
    getStarted: "Get Started Free",
    learnMore: "Learn More",
    communityMembers: "Community Members",
    recordsTracked: "Health Records Tracked",
    aiSupport: "AI Health Support",
    dataPrivacy: "Data Privacy",
    everythingYouNeed: "Everything You Need for Better Health",
    instantAnswers: "Get instant answers to your health questions with our AI-powered assistant",
    assessRiskFor: "Assess your risk for diabetes, heart disease, kidney and liver conditions",
    trackVitals: "Track vital signs, lab results, and health metrics with smart auto-fill",
    neverMiss: "Never miss a dose with real-time medication tracking and reminders",
    whyChoose: "Why Choose DVDS-Health?",
    builtForCommunity: "Built specifically for our community with features that matter most.",
    realTimeSync: "Real-Time Sync",
    syncInstantly: "Your health data syncs instantly across all devices",
    available247: "24/7 AI Support",
    getGuidance: "Get health guidance anytime with our AI bot",
    trackProgress: "Track Progress",
    visualInsights: "Visual insights into your health journey",
    
    // Regions
    unitedKingdom: "United Kingdom",
    unitedStates: "United States",
    india: "India",
    globalOther: "Other / Global",
    nhsGuidelines: "NHS guidelines",
    cdcGuidelines: "CDC/FDA guidelines",
    icmrGuidelines: "ICMR/NHP guidelines",
    whoGuidelines: "WHO guidelines",
  },
  
  gu: {
    // Navigation
    dashboard: "ડેશબોર્ડ",
    chat: "DVDS બોટ",
    predictor: "આગાહી",
    records: "રેકોર્ડ્સ",
    medications: "દવાઓ",
    profile: "પ્રોફાઇલ",
    signOut: "સાઇન આઉટ",
    
    // Common
    welcome: "સ્વાગત છે",
    save: "સાચવો",
    cancel: "રદ કરો",
    delete: "કાઢી નાખો",
    edit: "સંપાદિત કરો",
    add: "ઉમેરો",
    loading: "લોડ થઈ રહ્યું છે...",
    error: "ભૂલ",
    success: "સફળતા",
    
    // Dashboard
    welcomeBack: "પાછા સ્વાગત છે",
    healthDashboard: "તમારું આરોગ્ય ડેશબોર્ડ તૈયાર છે",
    aiInsights: "AI ઇનસાઇટ્સ",
    bloodPressure: "બ્લડ પ્રેશર",
    heartRate: "હૃદય ગતિ",
    bloodGlucose: "બ્લડ ગ્લુકોઝ",
    weight: "વજન",
    weightTrend: "વજન ટ્રેન્ડ",
    quickActions: "ઝડપી ક્રિયાઓ",
    recentRecords: "તાજેતરના આરોગ્ય રેકોર્ડ્સ",
    viewAll: "બધું જુઓ",
    noRecordsYet: "હજુ સુધી કોઈ રેકોર્ડ નથી",
    addFirstRecord: "તમારો પ્રથમ રેકોર્ડ ઉમેરો",
    getHealthAdvice: "આરોગ્ય સલાહ મેળવો",
    assessRisk: "તમારું જોખમ મૂલ્યાંકન કરો",
    logHealthData: "આરોગ્ય ડેટા લોગ કરો",
    trackMeds: "તમારી દવાઓ ટ્રેક કરો",
    
    // Chat
    dvdsBot: "DVDS બોટ",
    aiHealthAssistant: "તમારો AI આરોગ્ય સહાયક",
    startConversation: "DVDS બોટ સાથે વાતચીત શરૂ કરો",
    askAboutSymptoms: "લક્ષણો, આરોગ્ય ટિપ્સ અથવા સ્વસ્થતા પ્રશ્નો વિશે પૂછો",
    newChat: "નવી ચેટ",
    chatHistory: "ચેટ ઇતિહાસ",
    noConversations: "હજુ સુધી કોઈ વાતચીત નથી",
    sendMessage: "સંદેશ મોકલો",
    disclaimer: "DVDS બોટ માત્ર સામાન્ય આરોગ્ય માહિતી આપે છે. તબીબી ચિંતાઓ માટે હંમેશા આરોગ્ય પ્રદાતાની સલાહ લો.",
    
    // Predictor
    diseasePredictor: "રોગ આગાહી",
    assessHealthRisks: "AI-સંચાલિત વિશ્લેષણ સાથે તમારા આરોગ્ય જોખમોનું મૂલ્યાંકન કરો",
    diabetes: "ડાયાબિટીસ",
    heartDisease: "હૃદય રોગ",
    kidneyDisease: "કિડની રોગ",
    liverDisease: "લીવર રોગ",
    riskAssessment: "જોખમ મૂલ્યાંકન",
    enterHealthData: "વિશ્લેષણ માટે તમારો આરોગ્ય ડેટા દાખલ કરો",
    analyze: "વિશ્લેષણ કરો",
    analyzing: "વિશ્લેષણ થઈ રહ્યું છે...",
    
    // Records
    healthRecords: "આરોગ્ય રેકોર્ડ્સ",
    trackHealthMetrics: "સમય જતાં તમારા આરોગ્ય મેટ્રિક્સ ટ્રેક કરો",
    addRecord: "રેકોર્ડ ઉમેરો",
    recordType: "રેકોર્ડ પ્રકાર",
    category: "શ્રેણી",
    value: "મૂલ્ય",
    unit: "એકમ",
    notes: "નોંધો",
    recordedAt: "નોંધાયેલ સમય",
    
    // Medications
    medicationTracker: "દવા ટ્રેકર",
    neverMissDose: "સ્માર્ટ રીમાઇન્ડર્સ સાથે ક્યારેય ડોઝ ચૂકશો નહીં",
    addMedication: "દવા ઉમેરો",
    medicationName: "દવાનું નામ",
    dosage: "ડોઝ",
    frequency: "આવૃત્તિ",
    timeOfDay: "દિવસનો સમય",
    startDate: "શરૂઆત તારીખ",
    endDate: "અંતિમ તારીખ",
    refillReminder: "રિફિલ રીમાઇન્ડર",
    active: "સક્રિય",
    inactive: "નિષ્ક્રિય",
    morning: "સવાર",
    afternoon: "બપોર",
    evening: "સાંજ",
    night: "રાત",
    
    // Profile
    profileSettings: "પ્રોફાઇલ સેટિંગ્સ",
    personalInfo: "વ્યક્તિગત માહિતી",
    healthInfo: "આરોગ્ય માહિતી",
    regionLocation: "પ્રદેશ અને સ્થાન",
    fullName: "પૂરું નામ",
    dateOfBirth: "જન્મ તારીખ",
    gender: "લિંગ",
    emergencyContact: "કટોકટી સંપર્ક",
    height: "ઊંચાઈ",
    bloodType: "બ્લડ ટાઇપ",
    yourRegion: "તમારો પ્રદેશ",
    shareLocation: "સ્થાન શેર કરો",
    locationEnabled: "સ્થાન સક્ષમ",
    male: "પુરુષ",
    female: "સ્ત્રી",
    other: "અન્ય",
    preferNotToSay: "કહેવાનું પસંદ નથી",
    language: "ભાષા",
    selectLanguage: "ભાષા પસંદ કરો",
    
    // Footer
    privacyPolicy: "ગોપનીયતા નીતિ",
    termsOfService: "સેવાની શરતો",
    aboutUs: "અમારા વિશે",
    contact: "સંપર્ક",
    healthResources: "આરોગ્ય સંસાધનો",
    medicalDisclaimer: "DVDS-Health માત્ર શૈક્ષણિક હેતુઓ માટે AI-સંચાલિત આરોગ્ય માહિતી પ્રદાન કરે છે. તે વ્યાવસાયિક તબીબી સલાહ, નિદાન અથવા સારવારનો વિકલ્પ નથી. તબીબી ચિંતાઓ માટે હંમેશા લાયક આરોગ્ય પ્રદાતાની સલાહ લો.",
    
    // Landing
    forCommunity: "દીવ વાણજા દરજી સમાજ સમુદાય માટે",
    aiPowered: "તમારો AI-સંચાલિત",
    healthCompanion: "આરોગ્ય સાથી",
    manageHealth: "બુદ્ધિમાન રોગ આગાહી, લક્ષણ વિશ્લેષણ અને વ્યાપક તબીબી રેકોર્ડ ટ્રેકિંગ સાથે તમારા આરોગ્યનું સંચાલન કરો — અમારા સમુદાયની સ્વસ્થતા ધ્યાનમાં રાખીને ડિઝાઇન કરેલ.",
    getStarted: "મફત શરૂ કરો",
    learnMore: "વધુ જાણો",
    communityMembers: "સમુદાય સભ્યો",
    recordsTracked: "આરોગ્ય રેકોર્ડ્સ ટ્રેક",
    aiSupport: "AI આરોગ્ય સહાય",
    dataPrivacy: "ડેટા ગોપનીયતા",
    everythingYouNeed: "વધુ સારા આરોગ્ય માટે તમને જે જોઈએ તે બધું",
    instantAnswers: "અમારા AI-સંચાલિત સહાયક સાથે તમારા આરોગ્ય પ્રશ્નોના તાત્કાલિક જવાબો મેળવો",
    assessRiskFor: "ડાયાબિટીસ, હૃદય રોગ, કિડની અને લીવર સ્થિતિઓ માટે તમારું જોખમ મૂલ્યાંકન કરો",
    trackVitals: "સ્માર્ટ ઓટો-ફિલ સાથે મહત્વપૂર્ણ સંકેતો, લેબ પરિણામો અને આરોગ્ય મેટ્રિક્સ ટ્રેક કરો",
    neverMiss: "રીઅલ-ટાઇમ દવા ટ્રેકિંગ અને રીમાઇન્ડર્સ સાથે ક્યારેય ડોઝ ચૂકશો નહીં",
    whyChoose: "DVDS-Health શા માટે પસંદ કરો?",
    builtForCommunity: "અમારા સમુદાય માટે ખાસ કરીને બનાવેલ જે સુવિધાઓ સૌથી વધુ મહત્વની છે.",
    realTimeSync: "રીઅલ-ટાઇમ સિંક",
    syncInstantly: "તમારો આરોગ્ય ડેટા તમામ ઉપકરણો પર તરત જ સિંક થાય છે",
    available247: "24/7 AI સહાય",
    getGuidance: "અમારા AI બોટ સાથે કોઈપણ સમયે આરોગ્ય માર્ગદર્શન મેળવો",
    trackProgress: "પ્રગતિ ટ્રેક કરો",
    visualInsights: "તમારી આરોગ્ય યાત્રામાં દ્રશ્ય આંતરદૃષ્ટિ",
    
    // Regions
    unitedKingdom: "યુનાઇટેડ કિંગડમ",
    unitedStates: "યુનાઇટેડ સ્ટેટ્સ",
    india: "ભારત",
    globalOther: "અન્ય / વૈશ્વિક",
    nhsGuidelines: "NHS માર્ગદર્શિકા",
    cdcGuidelines: "CDC/FDA માર્ગદર્શિકા",
    icmrGuidelines: "ICMR/NHP માર્ગદર્શિકા",
    whoGuidelines: "WHO માર્ગદર્શિકા",
  },
  
  pt: {
    // Navigation
    dashboard: "Painel",
    chat: "DVDS Bot",
    predictor: "Preditor",
    records: "Registros",
    medications: "Medicamentos",
    profile: "Perfil",
    signOut: "Sair",
    
    // Common
    welcome: "Bem-vindo",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    add: "Adicionar",
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    
    // Dashboard
    welcomeBack: "Bem-vindo de volta",
    healthDashboard: "Seu painel de saúde está pronto",
    aiInsights: "Insights de IA",
    bloodPressure: "Pressão Arterial",
    heartRate: "Frequência Cardíaca",
    bloodGlucose: "Glicose no Sangue",
    weight: "Peso",
    weightTrend: "Tendência de Peso",
    quickActions: "Ações Rápidas",
    recentRecords: "Registros de Saúde Recentes",
    viewAll: "Ver Tudo",
    noRecordsYet: "Nenhum registro ainda",
    addFirstRecord: "Adicione seu primeiro registro",
    getHealthAdvice: "Obter conselho de saúde",
    assessRisk: "Avalie seu risco",
    logHealthData: "Registrar dados de saúde",
    trackMeds: "Acompanhar medicamentos",
    
    // Chat
    dvdsBot: "DVDS Bot",
    aiHealthAssistant: "Seu Assistente de Saúde IA",
    startConversation: "Inicie uma conversa com o DVDS Bot",
    askAboutSymptoms: "Pergunte sobre sintomas, dicas de saúde ou questões de bem-estar",
    newChat: "Nova Conversa",
    chatHistory: "Histórico de Conversas",
    noConversations: "Nenhuma conversa ainda",
    sendMessage: "Enviar mensagem",
    disclaimer: "O DVDS Bot fornece apenas informações gerais de saúde. Sempre consulte um profissional de saúde para preocupações médicas.",
    
    // Predictor
    diseasePredictor: "Preditor de Doenças",
    assessHealthRisks: "Avalie seus riscos de saúde com análise de IA",
    diabetes: "Diabetes",
    heartDisease: "Doença Cardíaca",
    kidneyDisease: "Doença Renal",
    liverDisease: "Doença Hepática",
    riskAssessment: "Avaliação de Risco",
    enterHealthData: "Insira seus dados de saúde para análise",
    analyze: "Analisar",
    analyzing: "Analisando...",
    
    // Records
    healthRecords: "Registros de Saúde",
    trackHealthMetrics: "Acompanhe suas métricas de saúde ao longo do tempo",
    addRecord: "Adicionar Registro",
    recordType: "Tipo de Registro",
    category: "Categoria",
    value: "Valor",
    unit: "Unidade",
    notes: "Notas",
    recordedAt: "Registrado em",
    
    // Medications
    medicationTracker: "Rastreador de Medicamentos",
    neverMissDose: "Nunca perca uma dose com lembretes inteligentes",
    addMedication: "Adicionar Medicamento",
    medicationName: "Nome do Medicamento",
    dosage: "Dosagem",
    frequency: "Frequência",
    timeOfDay: "Horário do Dia",
    startDate: "Data de Início",
    endDate: "Data de Término",
    refillReminder: "Lembrete de Recarga",
    active: "Ativo",
    inactive: "Inativo",
    morning: "Manhã",
    afternoon: "Tarde",
    evening: "Noite",
    night: "Noite",
    
    // Profile
    profileSettings: "Configurações do Perfil",
    personalInfo: "Informações Pessoais",
    healthInfo: "Informações de Saúde",
    regionLocation: "Região e Localização",
    fullName: "Nome Completo",
    dateOfBirth: "Data de Nascimento",
    gender: "Gênero",
    emergencyContact: "Contato de Emergência",
    height: "Altura",
    bloodType: "Tipo Sanguíneo",
    yourRegion: "Sua Região",
    shareLocation: "Compartilhar Localização",
    locationEnabled: "Localização ativada",
    male: "Masculino",
    female: "Feminino",
    other: "Outro",
    preferNotToSay: "Prefiro não dizer",
    language: "Idioma",
    selectLanguage: "Selecionar idioma",
    
    // Footer
    privacyPolicy: "Política de Privacidade",
    termsOfService: "Termos de Serviço",
    aboutUs: "Sobre Nós",
    contact: "Contato",
    healthResources: "Recursos de Saúde",
    medicalDisclaimer: "O DVDS-Health fornece informações de saúde baseadas em IA apenas para fins educacionais. Não substitui aconselhamento médico profissional, diagnóstico ou tratamento. Sempre consulte um profissional de saúde qualificado para preocupações médicas.",
    
    // Landing
    forCommunity: "Para a Comunidade Diu Vanja Darji Samaj",
    aiPowered: "Seu",
    healthCompanion: "Companheiro de Saúde com IA",
    manageHealth: "Gerencie sua saúde com previsão inteligente de doenças, análise de sintomas e rastreamento abrangente de registros médicos — projetado com o bem-estar da nossa comunidade em mente.",
    getStarted: "Comece Grátis",
    learnMore: "Saiba Mais",
    communityMembers: "Membros da Comunidade",
    recordsTracked: "Registros de Saúde Rastreados",
    aiSupport: "Suporte de Saúde IA",
    dataPrivacy: "Privacidade de Dados",
    everythingYouNeed: "Tudo que Você Precisa para Melhor Saúde",
    instantAnswers: "Obtenha respostas instantâneas para suas perguntas de saúde com nosso assistente de IA",
    assessRiskFor: "Avalie seu risco para diabetes, doenças cardíacas, condições renais e hepáticas",
    trackVitals: "Acompanhe sinais vitais, resultados de laboratório e métricas de saúde com preenchimento automático inteligente",
    neverMiss: "Nunca perca uma dose com rastreamento de medicamentos em tempo real e lembretes",
    whyChoose: "Por que Escolher DVDS-Health?",
    builtForCommunity: "Construído especificamente para nossa comunidade com os recursos que mais importam.",
    realTimeSync: "Sincronização em Tempo Real",
    syncInstantly: "Seus dados de saúde sincronizam instantaneamente em todos os dispositivos",
    available247: "Suporte IA 24/7",
    getGuidance: "Obtenha orientação de saúde a qualquer momento com nosso bot de IA",
    trackProgress: "Acompanhar Progresso",
    visualInsights: "Insights visuais sobre sua jornada de saúde",
    
    // Regions
    unitedKingdom: "Reino Unido",
    unitedStates: "Estados Unidos",
    india: "Índia",
    globalOther: "Outro / Global",
    nhsGuidelines: "Diretrizes do NHS",
    cdcGuidelines: "Diretrizes CDC/FDA",
    icmrGuidelines: "Diretrizes ICMR/NHP",
    whoGuidelines: "Diretrizes da OMS",
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  gu: "ગુજરાતી (Gujarati)",
  pt: "Português (Portuguese)",
};
