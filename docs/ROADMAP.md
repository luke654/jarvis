# Fusion OS Assistant — Roadmap

## Phase 1 — Frontend Skeleton (Current)

**Goal:** Working UI with all pages, navigation, and mock data. No backend.

- [x] Project setup: Vite + React + TypeScript + Tailwind
- [x] Layout system: Sidebar, Header, Layout wrapper
- [x] Reusable UI components: Card, Badge, StatCard
- [x] All 15 pages scaffolded with mock data
- [x] React Router navigation
- [x] Login placeholder page
- [x] Documentation: PROJECT_SPEC, ROADMAP, AGENTS

**Deliverable:** `npm run dev` shows a fully navigable dark dashboard.

---

## Phase 2 — Backend & Authentication

**Goal:** Real data, real auth, persistent state.

- [ ] Supabase project setup
- [ ] Supabase Auth — email/password login
- [ ] Database schema: leads, clients, opportunities, tasks, events
- [ ] API layer: React Query or SWR for data fetching
- [ ] CRUD operations for CRM, Tasks, Calendar
- [ ] Row-level security policies in Supabase
- [ ] Environment configuration (`.env`)

---

## Phase 3 — AI Integration

**Goal:** Command Center becomes functional. AI agents start working.

- [ ] OpenAI API integration (via server-side proxy or Supabase Edge Function)
- [ ] Command Center: chat with business context (CRM, tasks, pipeline)
- [ ] Debrief: AI-generated monthly summary from real data
- [ ] Prospecting: AI lead scoring algorithm
- [ ] Content: AI-assisted draft generation
- [ ] Smart task suggestions based on pipeline state

---

## Phase 4 — Messaging & Automation

**Goal:** WhatsApp and automation workflows.

- [ ] WhatsApp Business API integration
- [ ] Inbound message parsing → auto-tag contacts in CRM
- [ ] Outbound message templates from CRM
- [ ] Automated follow-up reminders
- [ ] Calendar sync: Google Calendar API

---

## Phase 5 — Finance & Advanced Intelligence

**Goal:** Full CFO module and advanced analytics.

- [ ] Bank/accounting API integration (Stripe, Fatture in Cloud, or CSV import)
- [ ] Automated P&L generation
- [ ] Invoice tracking and payment alerts
- [ ] Revenue forecasting from pipeline data
- [ ] Health: wearable sync (Apple Health export or Garmin API)
- [ ] Advanced dashboard: custom date ranges, goal tracking

---

## Phase 6 — Deployment & Polish

**Goal:** Production-ready, reliable, secure.

- [ ] Deploy to Hostinger at `assistant.fusion-systems.it`
- [ ] HTTPS + custom domain
- [ ] Error boundaries and graceful fallbacks
- [ ] Performance audit (bundle size, LCP)
- [ ] Mobile responsive pass
- [ ] User feedback loop and iteration
