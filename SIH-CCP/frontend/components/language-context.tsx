import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta' | 'hi' | 'te' | 'ml';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  cowAnalysis: {
    en: 'Cow Analysis',
    ta: 'மாடு பகுப்பாய்வு',
    hi: 'गाय का विश्लेषण',
    te: 'ఆవు విశ్లేషణ',
    ml: 'പശു വിശകലനം'
  },
  weather: {
    en: 'Weather',
    ta: 'வானிலை',
    hi: 'मौसम',
    te: 'వాతావరణం',
    ml: 'കാലാവസ്ഥ'
  },
  virtualDoctor: {
    en: 'Virtual Doctor',
    ta: 'மெய்நிகர் மருத்துவர்',
    hi: 'वर्चुअल डॉक्टर',
    te: 'వర్చువల్ డాక్టర్',
    ml: 'വെർച്വൽ ഡോക്ടർ'
  },
  hospitals: {
    en: 'Hospitals',
    ta: 'மருத்துவமனைகள்',
    hi: 'अस्पताल',
    te: 'ఆసుపత్రులు',
    ml: 'ആശുപത്രികൾ'
  },
  nutrition: {
    en: 'Nutrition',
    ta: 'ஊட்டச்சத்து',
    hi: 'पोषण',
    te: 'పోషణ',
    ml: 'പോഷകാഹാരം'
  },
  
  // Cow Analysis
  uploadImage: {
    en: 'Upload Cow Image',
    ta: 'மாட்டின் படத்தை பதிவேற்றவும்',
    hi: 'गाय की तस्वीर अपलोड करें',
    te: 'ఆవు చిత్రాన్ని అప్లోడ్ చేయండి',
    ml: 'പശു ചിത്രം അപ്ലോഡ് ചെയ്യുക'
  },
  uploadCowImage: {
    en: 'Please upload a cow image',
    ta: 'தயவுசெய்து மாட்டின் படத்தை பதிவேற்றவும்',
    hi: 'कृपया गाय की तस्वीर अपलोड करें',
    te: 'దయచేసి ఆవు చిత్రాన్ని అప్లోడ్ చేయండి',
    ml: 'ദയവായി ഒരു പശു ചിത്രം അപ്ലോഡ് ചെയ്യുക'
  },
  analyzing: {
    en: 'Analyzing cow structure...',
    ta: 'மாட்டின் அமைப்பை பகுப்பாய்வு செய்கிறது...',
    hi: 'गाय की संरचना का विश्लेषण कर रहे हैं...',
    te: 'ఆవు నిర్మాణాన్ని విశ్లేషిస్తోంది...',
    ml: 'പശുവിന്റെ ഘടന വിശകലനം ചെയ്യുന്നു...'
  },
  analysisComplete: {
    en: 'Analysis Complete',
    ta: 'பகுప்பாய்வு முடிந்தது',
    hi: 'विश्लेषण पूरा',
    te: 'విశ్లేషణ పూర్తయింది',
    ml: 'വിശകലനം പൂർത്തിയായി'
  },
  overallScore: {
    en: 'Overall Score',
    ta: 'மொத்த மதிப்பெண்',
    hi: 'कुल स्कोर',
    te: 'మొత్తం స్కోరు',
    ml: 'മൊത്തം സ്കോർ'
  },
  
  // Weather
  currentWeather: {
    en: 'Current Weather',
    ta: 'தற்போதைய வானிலை',
    hi: 'वर्तमान मौसम',
    te: 'ప్రస్తుత వాతావరణం',
    ml: 'നിലവിലെ കാലാവസ്ഥ'
  },
  temperature: {
    en: 'Temperature',
    ta: 'வெப்பநிலை',
    hi: 'तापमान',
    te: 'ఉష్ణోగ్రత',
    ml: 'താപനില'
  },
  humidity: {
    en: 'Humidity',
    ta: 'ஈரப்பதம்',
    hi: 'आर्द्रता',
    te: 'తేమ',
    ml: 'ആർദ്രത'
  },
  windSpeed: {
    en: 'Wind Speed',
    ta: 'காற்றின் வேகம்',
    hi: 'हवा की गति',
    te: 'గాలి వేగం',
    ml: 'കാറ്റിന്റെ വേഗത'
  },
  
  // Virtual Doctor
  askDoctor: {
    en: 'Ask Virtual Doctor',
    ta: 'மெய்நிகர் மருத்துவரிடம் கேட்கவும்',
    hi: 'वर्चुअल डॉक्टर से पूछें',
    te: 'వర్చువల్ డాక్టర్‌ని అడగండి',
    ml: 'വെർച്വൽ ഡോക്ടറോട് ചോദിക്കുക'
  },
  typeMessage: {
    en: 'Type your message...',
    ta: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
    hi: 'अपना संदेश टाइप करें...',
    te: 'మీ సందేశాన్ని టైప్ చేయండి...',
    ml: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...'
  },
  send: {
    en: 'Send',
    ta: 'அனுப்ப',
    hi: 'भेजें',
    te: 'పంపు',
    ml: 'അയയ്ക്കുക'
  },
  
  // Hospitals
  nearbyHospitals: {
    en: 'Nearby Veterinary Hospitals',
    ta: 'அருகிலுள்ள கால்நடை மருத்துவமனைகள்',
    hi: 'नजदीकी पशु चिकित्सा अस्पताल',
    te: 'సమీపంలోని పశు వైద్య ఆసుపత్రులు',
    ml: 'സമീപത്തുള്ള മൃഗ ആശുപത്രികൾ'
  },
  distance: {
    en: 'Distance',
    ta: 'தூரம்',
    hi: 'दूरी',
    te: 'దూరం',
    ml: 'ദൂരം'
  },
  
  // Nutrition
  feedingSchedule: {
    en: 'Smart Feeding Schedule',
    ta: 'ஸ்மார்ட் உணவு அட்டவணை',
    hi: 'स्मार्ट फीडिंग शेड्यूल',
    te: 'స్మార్ట్ ఫీడింగ్ షెడ్యూల్',
    ml: 'സ്മാർട്ട് ഫീഡിംഗ് ഷെഡ്യൂൾ'
  },
  morning: {
    en: 'Morning',
    ta: 'காலை',
    hi: 'सुबह',
    te: 'ఉదయం',
    ml: 'പ്രഭാതം'
  },
  afternoon: {
    en: 'Afternoon',
    ta: 'மதியம்',
    hi: 'दोपहर',
    te: 'మధ్యాహ్నం',
    ml: 'ഉച്ച'
  },
  evening: {
    en: 'Evening',
    ta: 'மாலை',
    hi: 'शाम',
    te: 'సాయంత్రం',
    ml: 'വൈകുന്നേരം'
  },
  
  // Common
  language: {
    en: 'Language',
    ta: 'மொழி',
    hi: 'भाषा',
    te: 'భాష',
    ml: 'ഭാഷ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};