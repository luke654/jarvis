# Fusion OS Assistant — Project Specification

## Vision

Fusion OS Assistant is a private, AI-powered command center built exclusively for Fusion Media and Luca.
It replaces scattered tools (spreadsheets, Notion, WhatsApp, email) with a single, unified operating system for running the business.

The goal is radical clarity: every morning, Luca opens one screen and knows exactly what to do, who to follow up with, how the business is performing, and what to focus on next.

## Core Principles

- **Private by design.** No public-facing features. Authentication required. Built for one user.
- **Action-first UI.** Every screen should reduce cognitive load, not increase it. Default to what matters.
- **AI-augmented, not AI-dependent.** The platform works without AI. AI accelerates it.
- **Desktop-first.** Optimised for 1440px+. Responsive enough for iPad use.
- **Minimal and sharp.** No clutter. Dark professional aesthetic. Fusion Systems identity.

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Database | Supabase (Phase 2) |
| Auth | Supabase Auth (Phase 2) |
| AI | OpenAI API via Anthropic SDK (Phase 2) |
| Messaging | WhatsApp Business API (Phase 2) |
| Hosting | Hostinger — assistant.fusion-systems.it |

## Modules

### Core
- **Dashboard** — KPI overview, open tasks, active opportunities, upcoming events
- **Command Center** — AI chat interface for natural language queries and actions

### Business (CRM & Sales)
- **CRM Leads** — Lead pipeline with status tracking and scoring
- **CRM Clients** — Active client management and account health
- **Opportunities** — Deal pipeline with stage, value, probability
- **Tasks** — Kanban-style task management with priorities
- **Calendar** — Event scheduling and deadline tracking

### Intelligence
- **Debrief** — Monthly business review with AI-generated summaries
- **WhatsApp** — Business messaging integrated with CRM
- **Prospecting** — AI-powered prospect discovery and scoring

### Finance & Operations
- **Fusion CFO** — Revenue, expenses, cash flow, P&L overview
- **Health** — Personal wellness tracking (steps, sleep, water)
- **Content** — Content calendar and AI-assisted creation

### System
- **Settings** — Profile, integrations, AI configuration, security

## Design Language

- Background: `#09090b` (zinc-950)
- Surface: `#18181b` (zinc-900)
- Border: `#27272a` (zinc-800)
- Text primary: `#fafafa` (zinc-50)
- Text muted: `#71717a` (zinc-500)
- Accent: `#2563eb` (blue-600)
- Success: `#10b981` (emerald-500)
- Warning: `#f59e0b` (amber-500)
- Danger: `#ef4444` (red-500)
- Font: Inter
