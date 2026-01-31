# System Design – Saarthi

## Design Overview

Saarthi is a voice-first AI system designed to support elderly, illiterate, and digitally unfamiliar users during interactions with doctors, banks, and government offices. The system acts as a digital companion that helps users understand what was communicated to them, without giving advice or making decisions.

Saarthi prioritizes accessibility, safety, and clarity over intelligence or autonomy. It is intentionally limited in scope to avoid replacing human authority or introducing risk.

## Design Goals

- Voice-first interaction with minimal visual complexity
- Extremely simple and calm user experience
- Support for multiple Indian languages
- Explanation and understanding, not advice or decision-making
- Trustworthy behavior suitable for vulnerable users

## High-Level Architecture

Saarthi follows a modular, event-driven architecture composed of the following components:

1. Client Application
2. Speech Processing Layer
3. Conversation Understanding Layer
4. Safety and Boundary Layer
5. Response Generation Layer
6. Reminder and Notification Layer

The backend is stateless and cloud-based to support scalability and reliability.

## Component Description

### 1. Client Application

- Mobile-first interface optimized for elderly users
- One primary “Speak” button for interaction
- Visual indicators for listening, processing, and speaking states
- Displays original speech transcript alongside explanations
- Handles language selection and microphone permissions

### 2. Speech Processing Layer

- Converts user speech to text using cloud speech-to-text services
- Converts system responses to speech using text-to-speech
- Supports English, Hindi, Tamil, Telugu, and Kannada
- Handles noise filtering and pause-based speech completion

### 3. Conversation Understanding Layer

- Processes transcribed speech to identify:
  - Instructions and explanations
  - Follow-up references such as dates or revisits
  - Ambiguous or unclear statements
- Maintains short-term session context
- Does not infer intent, correctness, or eligibility

### 4. Safety and Boundary Layer

- Enforces strict constraints to prevent:
  - Medical advice
  - Legal guidance
  - Financial recommendations
- Ensures use of cautious language such as “generally” and “you may want to ask”
- Injects visible disclaimers into responses
- Redirects unsafe requests to explanation-only behavior

### 5. Response Generation Layer

- Rephrases information into simple, everyday language
- Highlights key points without interpretation
- Suggests neutral clarification questions users may ask human authorities
- Produces both spoken and textual responses

### 6. Reminder and Notification Layer

- Activated only after explicit user confirmation
- Creates generic reminders (e.g., “Doctor follow-up”, “Bank visit”)
- Avoids storing sensitive or detailed personal information
- Integrates with device notification or calendar systems

## Interaction Flow

1. User opens Saarthi and selects preferred language
2. User presses the “Speak” button and describes what they were told
3. Speech is transcribed and shown on screen
4. Input passes through safety and understanding layers
5. Saarthi explains the information and suggests clarification questions
6. User optionally confirms creation of a reminder

## Data Handling and Privacy

- No long-term storage of conversation data by default
- Session data exists only during active interaction
- Users can explicitly clear session data
- No personal identity or sensitive data is required

## Scalability and Reliability

- Stateless backend services enable horizontal scaling
- Cloud-based speech and language services handle traffic variation
- Modular design allows easy addition of new languages
- Graceful degradation ensures core functionality remains available

## How Saarthi Is Different from General-Purpose AI Systems

Saarthi is not a general conversational AI or knowledge assistant.

Unlike systems such as ChatGPT, Saarthi does not answer open-ended questions, generate opinions, or provide advice. It does not act as a source of truth.

Saarthi only explains information already communicated by a human authority. It behaves like a calm digital companion standing beside the user, helping them listen, remember, and understand — without replacing human decision-makers.

## Design Principles

- Explain, never advise
- Companion, not authority
- Voice-first, text-optional
- Safety over completeness
- Simplicity over intelligence
