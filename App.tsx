
import React, { useState, useEffect, useRef } from 'react';
import { AppView, Reminder, ChecklistItem, ChatMessage, IndianLanguage, LanguageMetadata, Theme } from './types';
import { Icons, UI_STRINGS } from './constants';
import { getGeminiResponse, explainDocument } from './services/gemini';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LANG_PICKER');
  const [lang, setLang] = useState<IndianLanguage>(IndianLanguage.HINDI);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('saarthi_theme') as Theme) || 'light');
  
  // States with persistence
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const stored = localStorage.getItem('saarthi_reminders');
    return stored ? JSON.parse(stored) : [];
  });
  
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const stored = localStorage.getItem('saarthi_checklist');
    return stored ? JSON.parse(stored) : [];
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = localStorage.getItem('saarthi_messages');
    return stored ? JSON.parse(stored) : [];
  });

  // UI States
  const [isRecording, setIsRecording] = useState(false);
  const [isOverlayRecording, setIsOverlayRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Reminder input states
  const [reminderText, setReminderText] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  
  // Checklist input states
  const [checklistText, setChecklistText] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('saarthi_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('saarthi_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('saarthi_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('saarthi_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Initial load logic
  useEffect(() => {
    const storedLang = localStorage.getItem('saarthi_lang');
    if (storedLang) {
      setLang(storedLang as IndianLanguage);
      setView('DASHBOARD');
      if (messages.length === 0) triggerInitialGreeting(storedLang as IndianLanguage);
    }
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (view === 'DASHBOARD') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, view]);

  const t = (key: string) => UI_STRINGS[lang][key] || key;

  const triggerInitialGreeting = (selectedLang: IndianLanguage) => {
    const greeting = UI_STRINGS[selectedLang].greeting;
    const saarthiMsg: ChatMessage = { id: 'greet-' + Date.now(), role: 'saarthi', text: greeting };
    setMessages([saarthiMsg]);
    setTimeout(() => speak(greeting, selectedLang), 800);
  };

  const startSpeech = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser does not support voice input.");
    if (isSpeaking) stopSpeaking();
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = lang;
    recognitionRef.current.onstart = () => setIsRecording(true);
    recognitionRef.current.onresult = (e: any) => handleUserSpeech(e.results[0][0].transcript);
    recognitionRef.current.onend = () => setIsRecording(false);
    recognitionRef.current.start();
  };

  const startOverlaySpeech = (target: 'reminder' | 'checklist') => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice input not supported.");
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = lang;
    recognitionRef.current.onstart = () => setIsOverlayRecording(true);
    recognitionRef.current.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      if (target === 'reminder') setReminderText(transcript);
      else setChecklistText(transcript);
    };
    recognitionRef.current.onend = () => setIsOverlayRecording(false);
    recognitionRef.current.start();
  };

  const speak = (text: string, currentLang: IndianLanguage = lang) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang;
    utterance.rate = 0.85;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleUserSpeech = async (text: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    const context = messages.slice(-6).map(m => `${m.role}: ${m.text}`).join('\n');
    const response = await getGeminiResponse(text, lang, context);
    setIsLoading(false);
    if (response) {
      const saarthiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'saarthi', text: response };
      setMessages(prev => [...prev, saarthiMsg]);
      speak(response);
    }
  };

  // Added handleFileUpload to handle document processing from camera/file input
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setView('DASHBOARD');

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (typeof reader.result !== 'string') return;
      const base64Data = reader.result.split(',')[1];
      const mimeType = file.type;
      
      const response = await explainDocument(base64Data, mimeType, lang);
      setIsLoading(false);
      
      if (response) {
        const saarthiMsg: ChatMessage = { 
          id: Date.now().toString(), 
          role: 'saarthi', 
          text: response 
        };
        setMessages(prev => [...prev, saarthiMsg]);
        speak(response);
      } else {
        const errorMsg: ChatMessage = { 
          id: Date.now().toString(), 
          role: 'saarthi', 
          text: "I'm sorry, I couldn't understand that document. Could you try taking a clearer photo?" 
        };
        setMessages(prev => [...prev, errorMsg]);
        speak(errorMsg.text);
      }
    };
    reader.readAsDataURL(file);
  };

  const addChecklistItem = () => {
    if (!checklistText.trim()) return;
    setChecklist(prev => [{ id: Date.now().toString(), text: checklistText, completed: false }, ...prev]);
    setChecklistText('');
  };

  const addReminder = () => {
    if (!reminderText.trim() || !reminderDate || !reminderTime) {
      alert("Please enter what, when, and what time.");
      return;
    }
    const newRem: Reminder = {
      id: Date.now().toString(),
      text: reminderText,
      date: reminderDate,
      time: reminderTime,
      timestamp: new Date(`${reminderDate}T${reminderTime}`).getTime(),
      confirmed: true
    };
    setReminders(prev => [newRem, ...prev]);
    setReminderText('');
    setReminderDate('');
    setReminderTime('');
  };

  const NavButton = ({ target, icon: Icon, label }: { target: AppView, icon: any, label: string }) => (
    <button 
      onClick={() => { setView(target); stopSpeaking(); }}
      className={`flex flex-col items-center justify-center flex-1 py-4 transition-all ${view === target ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20' : 'text-slate-400 dark:text-slate-500'}`}
    >
      <Icon className={`w-7 h-7 mb-1 ${view === target ? 'scale-110' : ''}`} />
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950' : 'bg-slate-50'} flex flex-col max-w-lg mx-auto relative overflow-hidden font-sans transition-colors duration-500 pb-20`}>
      {/* Header */}
      <header className="px-6 py-6 pb-2 flex items-center justify-between z-10 sticky top-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-900">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">SAARTHI</h1>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{t('tagline')}</span>
        </div>
        {isSpeaking && (
          <button onClick={stopSpeaking} className="bg-red-500 text-white px-4 py-2 rounded-full font-black text-xs animate-pulse">STOP</button>
        )}
      </header>

      {/* Main Views */}
      <main className="flex-1 flex flex-col px-6 overflow-y-auto no-scrollbar scroll-smooth">
        {/* Render Language Picker if no language is selected */}
        {view === 'LANG_PICKER' && (
          <div className="flex-1 flex flex-col justify-center py-10 space-y-8 animate-in fade-in slide-in-from-bottom-6">
            <h2 className="text-4xl font-black text-center dark:text-white mb-4 italic">Namaste.</h2>
            <p className="text-xl font-bold text-center text-slate-500 dark:text-slate-400">Please choose your language to start:</p>
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(LanguageMetadata) as IndianLanguage[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    localStorage.setItem('saarthi_lang', l);
                    setView('DASHBOARD');
                    triggerInitialGreeting(l);
                  }}
                  className="p-8 bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 shadow-xl hover:border-indigo-500 transition-all active:scale-95"
                >
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{LanguageMetadata[l].native}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{LanguageMetadata[l].name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'DASHBOARD' && (
          <div className="flex-1 flex flex-col py-4 space-y-8">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-20">
                <Icons.Mic className="w-20 h-20 mb-6" />
                <p className="text-2xl font-black dark:text-white">Hold button to speak</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-6 rounded-[2.2rem] text-2xl font-bold shadow-lg ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-2 border-slate-50 dark:border-slate-700 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-slate-400 font-bold animate-pulse text-xl">{t('thinking')}</div>}
            <div ref={chatEndRef} className="h-4" />
          </div>
        )}

        {view === 'DOCUMENTS' && (
          <div className="py-6 animate-in slide-in-from-right">
            <h2 className="text-4xl font-black mb-8 dark:text-white">Docs & Rules</h2>
            <div className="grid gap-6">
              <div className="p-8 bg-emerald-50 dark:bg-emerald-950/20 rounded-[2.5rem] border-2 border-emerald-100 dark:border-emerald-900 flex flex-col items-center text-center gap-6">
                <Icons.File className="w-12 h-12 text-emerald-600" />
                <p className="text-xl font-black dark:text-white">Explain Notice/Letter</p>
                <label className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl cursor-pointer text-center">
                  TAKE PHOTO
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              <div className="p-8 bg-blue-50 dark:bg-blue-950/20 rounded-[2.5rem] border-2 border-blue-100 dark:border-blue-900 flex flex-col items-center text-center gap-6">
                <Icons.Globe className="w-12 h-12 text-blue-600" />
                <p className="text-xl font-black dark:text-white">New Policy Check</p>
                <button onClick={() => {
                  const age = prompt("Your age?");
                  const job = prompt("Your work?");
                  if(age && job) handleUserSpeech(`I am ${age} and I work as ${job}. Tell me about any new schemes or policies for me.`);
                  setView('DASHBOARD');
                }} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl">START CHECK</button>
              </div>
            </div>
          </div>
        )}

        {view === 'REMINDERS' && (
          <div className="py-6 animate-in slide-in-from-right">
            <h2 className="text-4xl font-black mb-6 dark:text-white">Alarms & Dates</h2>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-orange-100 dark:border-orange-900 shadow-xl mb-8 space-y-4">
              <div className="flex gap-3">
                <input type="text" value={reminderText} onChange={e => setReminderText(e.target.value)} placeholder="What to remember?" className="flex-1 p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl text-xl font-bold dark:text-white" />
                <button onMouseDown={() => startOverlaySpeech('reminder')} className={`w-20 h-20 rounded-3xl flex items-center justify-center ${isOverlayRecording ? 'bg-red-500' : 'bg-orange-600'}`}>
                  <Icons.Mic className="w-10 h-10 text-white" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase text-slate-400">WHICH DAY?</span>
                  <input type="date" value={reminderDate} onChange={e => setReminderDate(e.target.value)} className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl text-xl font-black dark:text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase text-slate-400">WHAT TIME?</span>
                  <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl text-xl font-black dark:text-white" />
                </div>
              </div>
              <button onClick={addReminder} className="w-full py-6 bg-orange-600 text-white rounded-[2rem] font-black text-2xl shadow-xl active:scale-95">+ SET ALARM</button>
            </div>
            <div className="space-y-4">
              {reminders.map(r => (
                <div key={r.id} className="p-7 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-orange-100 dark:border-orange-900 flex flex-col gap-2 shadow-md">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-black dark:text-white leading-tight">{r.text}</span>
                    <button onClick={() => setReminders(p => p.filter(x => x.id !== r.id))} className="text-red-400 text-3xl font-black px-2">×</button>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600 font-black text-lg">
                    <Icons.Bell className="w-5 h-5" /> {r.date} • {r.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'CHECKLIST' && (
          <div className="py-6 animate-in slide-in-from-right">
            <h2 className="text-4xl font-black mb-6 dark:text-white">Quick Notes</h2>
            <div className="mb-8 flex flex-col gap-4">
              <div className="flex gap-4">
                <input type="text" value={checklistText} onChange={e => setChecklistText(e.target.value)} placeholder="Voice note..." className="flex-1 p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-[2.5rem] text-2xl font-bold dark:text-white shadow-inner" />
                <button onMouseDown={() => startOverlaySpeech('checklist')} className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-xl ${isOverlayRecording ? 'bg-red-500' : 'bg-blue-600'}`}>
                  <Icons.Mic className="w-10 h-10 text-white" />
                </button>
              </div>
              <button onClick={addChecklistItem} className="w-full py-6 bg-slate-900 dark:bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl">+ SAVE NOTE</button>
            </div>
            <div className="space-y-4">
              {checklist.map(item => (
                <div key={item.id} className="p-7 bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 border-blue-50 dark:border-blue-900 flex items-center gap-5 shadow-sm">
                  <input type="checkbox" checked={item.completed} onChange={() => setChecklist(p => p.map(x => x.id === item.id ? {...x, completed: !x.completed} : x))} className="w-10 h-10 rounded-xl" />
                  <span className={`text-2xl font-black flex-1 dark:text-white ${item.completed ? 'line-through opacity-40' : ''}`}>{item.text}</span>
                  <button onClick={() => setChecklist(p => p.filter(x => x.id !== item.id))} className="text-red-400 text-2xl font-black">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'SETTINGS' && (
          <div className="py-6 animate-in slide-in-from-right">
            <h2 className="text-4xl font-black mb-10 dark:text-white">Settings</h2>
            <div className="space-y-8">
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="w-full p-8 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-between shadow-md">
                <span className="text-2xl font-black dark:text-white">{theme === 'light' ? '🌞 Light Theme' : '🌙 Dark Theme'}</span>
                <div className={`w-14 h-8 rounded-full p-1 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </button>
              <button onClick={() => setView('LANG_PICKER')} className="w-full p-8 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-between shadow-md">
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-400 block">LANGUAGE</span>
                  <span className="text-2xl font-black dark:text-white">{LanguageMetadata[lang].native}</span>
                </div>
                <Icons.Globe className="w-10 h-10 text-indigo-500" />
              </button>
              <button onClick={() => { if(confirm("Clear all?")) { localStorage.clear(); window.location.reload(); }}} className="w-full p-8 bg-red-50 text-red-600 rounded-[2.5rem] text-xl font-black shadow-inner">RESET APP</button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Mic Button (Dashboard Only) */}
      {view === 'DASHBOARD' && !isSpeaking && (
        <div className="fixed bottom-24 left-0 right-0 p-8 flex flex-col items-center pointer-events-none">
          <button onMouseDown={startSpeech} onTouchStart={startSpeech} className={`w-36 h-36 rounded-full flex items-center justify-center transition-all shadow-2xl pointer-events-auto border-4 border-white dark:border-slate-900 ${isRecording ? 'bg-red-500 scale-125' : 'bg-indigo-600 scale-100'}`}>
            {isRecording && <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></div>}
            <Icons.Mic className="w-16 h-16 text-white" />
          </button>
          <p className={`mt-4 text-xl font-black uppercase tracking-widest ${isRecording ? 'text-red-600' : 'text-slate-400'}`}>
            {isRecording ? 'Listening...' : t('speak')}
          </p>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 flex items-stretch shadow-2xl z-20">
        <NavButton target="DASHBOARD" icon={Icons.Mic} label="Home" />
        <NavButton target="DOCUMENTS" icon={Icons.File} label="Docs" />
        <NavButton target="REMINDERS" icon={Icons.Bell} label="Reminders" />
        <NavButton target="CHECKLIST" icon={Icons.Clipboard} label="Checklist" />
        <NavButton target="SETTINGS" icon={Icons.Globe} label="Menu" />
      </nav>
    </div>
  );
};

export default App;
