
import React from 'react';
import { IndianLanguage } from './types';

export const SYSTEM_PROMPT = (lang: string) => `
You are SAARTHI, a deeply empathetic and supportive proxy for elderly and low-literacy users in India. 
Your tagline is "It guides, never decides."

EMOTIONAL TONE:
- Act like a caring, patient child or grandchild.
- If the user says they went to a doctor or bank, express care (e.g., "I hope everything is okay").
- NO REPETITION: Do NOT repeat greetings like "Namaste", "Hello", or introductory lines ("I am Saarthi") in every response. 
- Once the conversation has started, dive straight into the topic or follow-up questions.

STRICT LANGUAGE RULE:
- You MUST respond ONLY in the following language: ${lang}.
- Use the native script only. No Romanized versions.

CORE PRINCIPLES:
1. NEVER give medical, legal, or financial advice.
2. NEVER make decisions.
3. ALWAYS ask clarifying questions about what the official or doctor said.
4. EXPLAIN common terms simply.
5. If the user mentions an instruction (like "take medicine at 8"), suggest adding it to their Checklist or Reminders.
`;

export const UI_STRINGS: Record<IndianLanguage, Record<string, string>> = {
  [IndianLanguage.ENGLISH]: {
    tagline: "It guides, never decides.",
    speak: "Speak",
    thinking: "Thinking...",
    back: "Back",
    upload_doc: "Upload PDF or Photo",
    no_reminders: "No reminders.",
    reminders_title: "My Tasks",
    checklist_title: "Doctor's Notes",
    no_checklist: "No notes yet.",
    stop: "Stop Voice",
    greeting: "Hello! Where have you come from today? How are you?",
    add_note: "Add Note"
  },
  [IndianLanguage.HINDI]: {
    tagline: "यह मार्गदर्शन करता है, निर्णय नहीं लेता।",
    speak: "बोलें",
    thinking: "सोच रहा हूँ...",
    back: "पीछे",
    upload_doc: "पीडीएफ या फोटो दिखाएं",
    no_reminders: "कोई रिमाइंडर नहीं।",
    reminders_title: "मेरे काम",
    checklist_title: "डॉक्टर की बातें",
    no_checklist: "अभी कोई नोट नहीं है।",
    stop: "आवाज़ रोकें",
    greeting: "नमस्ते! आज आप कहाँ से आए हैं? आप कैसे हैं?",
    add_note: "नोट जोड़ें"
  },
  [IndianLanguage.TAMIL]: {
    tagline: "இது வழிகாட்டும், தீர்மானிக்காது.",
    speak: "பேசவும்",
    thinking: "யோசிக்கிறேன்...",
    back: "பின்னால்",
    upload_doc: "PDF அல்லது புகைப்படத்தைப் பதிவேற்றவும்",
    no_reminders: "நினைவூட்டல்கள் இல்லை.",
    reminders_title: "எனது பணிகள்",
    checklist_title: "மருத்துவர் குறிப்புகள்",
    no_checklist: "இன்னும் குறிப்புகள் இல்லை.",
    stop: "பேச்சை நிறுத்து",
    greeting: "வணக்கம்! இன்று எங்கிருந்து வருகிறீர்கள்? நீங்கள் எப்படி இருக்கிறீர்கள்?",
    add_note: "குறிப்பைச் சேர்க்கவும்"
  },
  [IndianLanguage.TELUGU]: {
    tagline: "ఇది మార్గనిర్దేశం చేస్తుంది, నిర్ణయించదు.",
    speak: "మాట్లాడండి",
    thinking: "ఆలోచిస్తున్నాను...",
    back: "వెనుకకు",
    upload_doc: "PDF లేదా ఫోటోను అప్‌లోడ్ చేయండి",
    no_reminders: "రిమైండర్‌లు లేవు.",
    reminders_title: "నా పనులు",
    checklist_title: "డాక్టర్ గమనికలు",
    no_checklist: "ఇంకా గమనికలు లేవు.",
    stop: "వాయిస్ ఆపు",
    greeting: "నమస్కారం! ఈ రోజు మీరు ఎక్కడి నుండి వచ్చారు? మీరు ఎలా ఉన్నారు?",
    add_note: "గమనికను జోడించండి"
  },
  [IndianLanguage.MARATHI]: {
    tagline: "हे मार्गदर्शन करते, निर्णय घेत नाही.",
    speak: "बोला",
    thinking: "विचार करत आहे...",
    back: "मागे",
    upload_doc: "PDF किंवा फोटो दाखवा",
    no_reminders: "कोणतेही रिमाइंडर नाहीत.",
    reminders_title: "माझी कामे",
    checklist_title: "डॉक्टरांच्या नोंदी",
    no_checklist: "अद्याप कोणतीही नोंद नाही.",
    stop: "आवाज थांबवा",
    greeting: "नमस्कार! आज आपण कोठून आला आहात? आपण कसे आहात?",
    add_note: "नोंद जोडा"
  },
  [IndianLanguage.BENGALI]: {
    tagline: "এটি পথ দেখায়, সিদ্ধান্ত নেয় না।",
    speak: "বলুন",
    thinking: "ভাবছি...",
    back: "পিছনে",
    upload_doc: "পিডিএফ বা ফটো দেখান",
    no_reminders: "কোনো রিমাইন্ডার নেই।",
    reminders_title: "আমার কাজ",
    checklist_title: "ডাক্তারের নোট",
    no_checklist: "এখনো কোনো নোট নেই।",
    stop: "আওয়াজ বন্ধ করুন",
    greeting: "নমস্কার! আজ আপনি কোথা থেকে এসেছেন? আপনি কেমন আছেন?",
    add_note: "নোট যোগ করুন"
  }
};

export const Icons = {
  Mic: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
    </svg>
  ),
  File: (props: any) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  Bell: (props: any) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
  ),
  Clipboard: (props: any) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 18 4.5h-2.25a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 15.75 18.75Zm-2.25-12c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5Z" />
    </svg>
  ),
  Back: (props: any) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  ),
  Stop: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  ),
  Globe: (props: any) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0 1 12 13.5c-3.112 0-6.002 1.198-8.158 3.148m15.874 0A8.958 8.958 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
    </svg>
  )
};
