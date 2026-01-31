## Project Overview

AI Proxy – Voice Companion for Everyday Interactions is a voice-first AI system designed to act as a digital proxy for elderly, illiterate, and digitally unfamiliar users during interactions with doctors, banks, and government offices.

Many users are unable to independently understand what is said to them in such environments. They often forget instructions, do not know what questions to ask, and must rely on another person to listen, explain, and remember details for them. AI Proxy is built to reduce this dependency.

## Problem Statement

Elderly and illiterate users face barriers in accessing essential services due to:
- Difficulty understanding spoken instructions
- Inability to ask appropriate clarification questions
- Forgetting follow-up actions such as revisit dates or required documents
- Dependence on human proxy persons for basic understanding

These challenges reduce independence and increase the risk of missed care, delays, and misinformation.

## Objective

AI Proxy functions as a **listening and understanding companion**, not a decision-maker.

After an interaction, users can speak to the system in their own language and describe what they were told. The system explains the information in simple terms, highlights key points, and suggests neutral clarification questions the user may ask during future interactions.

The system MUST NOT provide medical, legal, or financial advice and MUST NOT make decisions on behalf of the user.

## Core Capabilities

- Voice-first interaction with a single large “Speak” button
- Real speech-to-text and text-to-speech processing
- Support for English, Hindi, Tamil, Telugu, and Kannada
- Explanation of spoken instructions using simple, everyday language
- Suggestion of safe clarification questions (e.g., “When should I come again?”)
- Optional reminder creation only after explicit user confirmation
- Public notice and circular explanation in spoken form
- Voice-based document reading and translation
- General policy impact explanation based on age and occupation (informational only)

## Safety and Trust Boundaries

- The system SHALL NOT give advice, recommendations, or decisions
- The system SHALL NOT determine eligibility or correctness
- All responses SHALL use cautious language such as “generally” and “you may want to ask”
- The system SHALL always display the original transcript alongside explanations
- A persistent disclaimer SHALL be shown:  
  **“This app helps with understanding, not advice.”**

## Design Philosophy

AI Proxy is designed to feel like a calm companion standing beside the user — similar to a trusted family member who listens, remembers, and explains.

It is NOT a chatbot for open conversation.  
It is a support tool focused only on understanding real-world human interactions.

The interface is intentionally minimal, accessible, and voice-driven, with no requirement for typing or reading complex text.

## Scalability and Architecture

- Stateless backend architecture
- Cloud-based speech and language processing services
- Modular, language-agnostic design for easy expansion
