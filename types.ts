
export enum IndianLanguage {
  ENGLISH = 'en-US',
  HINDI = 'hi-IN',
  TAMIL = 'ta-IN',
  TELUGU = 'te-IN',
  MARATHI = 'mr-IN',
  BENGALI = 'bn-IN'
}

export const LanguageMetadata: Record<IndianLanguage, { name: string; native: string }> = {
  [IndianLanguage.ENGLISH]: { name: 'English', native: 'English' },
  [IndianLanguage.HINDI]: { name: 'Hindi', native: 'हिन्दी' },
  [IndianLanguage.TAMIL]: { name: 'Tamil', native: 'தமிழ்' },
  [IndianLanguage.TELUGU]: { name: 'Telugu', native: 'తెలుగు' },
  [IndianLanguage.MARATHI]: { name: 'Marathi', native: 'मరాठी' },
  [IndianLanguage.BENGALI]: { name: 'Bengali', native: 'বাংলা' }
};

export interface Reminder {
  id: string;
  text: string;
  date: string;
  time: string;
  timestamp: number;
  confirmed: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'saarthi';
  text: string;
}

export type AppView = 'DASHBOARD' | 'DOCUMENTS' | 'REMINDERS' | 'CHECKLIST' | 'SETTINGS' | 'LANG_PICKER';
export type Theme = 'light' | 'dark';

export interface AppContext {
  lastVisitType?: string;
  lastConversationSummary?: string;
  language: IndianLanguage;
  theme: Theme;
}
