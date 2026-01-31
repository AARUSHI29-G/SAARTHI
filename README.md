# 🧭 Saarthi  
**An AI proxy for everyday life**

---

## Why Saarthi?

Many elderly and illiterate people cannot go alone to a doctor, bank, or government office.

Not because they are incapable —  
but because they don’t understand:
- what to ask
- what they were told
- what to do next

So they depend on relatives, neighbors, or middlemen.  
That dependency is the real problem Saarthi tries to solve.

---

## What is Saarthi?

Saarthi is **not an advisor** and **not a replacement for professionals**.

It acts like a **human proxy** — the kind of person who:
- listens
- asks the right follow-up questions
- explains things simply
- reminds you about next steps

The user only presses one button and speaks.

---

## How it works

### 1. After an interaction (doctor, bank, office)

Example user input:
> “Doctor kal aane bola.”

Saarthi does **not** give medical or legal advice.

Instead, it:
- asks simple clarification questions  
  (“Koi test bola?”, “Time bataya tha?”)
- explains common meanings in easy language
- suggests safe questions to ask next time

The user still talks to the doctor or officer.  
Saarthi only prepares them.

---

### 2. Reminder support

Once the situation is understood, Saarthi asks:
> “Kal ke liye reminder set kar doon?”

If the user agrees, a simple reminder is created  
(e.g. “Doctor visit”, “Bank follow-up”).

No assumptions.  
User stays in control.

---

### 3. Understanding documents (at home)

Saarthi can also:
- explain notices or circulars in simple language
- highlight important dates
- read documents aloud
- translate when needed

For policies, it explains **what is written**, not **what to do**.

---

## What Saarthi never does

- ❌ No medical advice  
- ❌ No legal decisions  
- ❌ No speaking to officials  
- ❌ No acting on the user’s behalf  

It only helps people **understand and prepare**.

---

## Why this matters

- Reduces dependency on human proxies
- Gives confidence to elderly and illiterate users
- Saves time for doctors, banks, and offices
- Designed to be safe even if AI is imperfect

---

## Design & requirements (Kiro)

This repository includes a `.kiro/` directory with:
- `requirements.md`
- `design.md`

These were created using **Kiro IDE** as part of the AWS Bharat Hackathon requirement.

---

## Tech stack

- Kiro IDE (design & requirements)
- React + TypeScript
- Vite
- Node.js
- AI API (configurable)

---

## One-line summary 

An AI proxy that helps people understand what they were told, what to ask next, and remembers follow-ups — so they don’t need another human to go with them.

---

## Running locally

```bash
npm install
npm run dev
