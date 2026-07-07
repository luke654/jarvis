# Fusion OS Assistant — AI Agents

This document lists all planned AI agents, their responsibilities, and the phase in which they will be implemented.

---

## Agent: Jarvis (Command Center)

**Phase:** 3
**Interface:** Command Center chat UI
**Model:** GPT-4o or Claude Sonnet

**Responsibilities:**
- Answer natural language queries about business data (leads, clients, pipeline, tasks)
- Summarise daily priorities and surface urgencies
- Draft emails and messages in Luca's voice
- Execute simple CRM actions ("move this lead to qualified", "create a task for X")
- Proactively alert on at-risk situations (stale opportunities, overdue tasks, at-risk clients)

**Context it receives:**
- Current leads and clients (from Supabase)
- Open opportunities with stage and probability
- Task list with priorities and due dates
- Upcoming calendar events
- Monthly debrief data

---

## Agent: Debrief Analyst

**Phase:** 3
**Interface:** Debrief page — auto-generated report
**Model:** GPT-4o

**Responsibilities:**
- Generate monthly business review summaries from real data
- Identify trends in revenue, pipeline, and client activity
- Flag performance gaps vs targets
- Recommend 3-5 priority actions for the upcoming month

---

## Agent: Prospect Scorer

**Phase:** 3
**Interface:** Prospecting page
**Model:** GPT-4o + structured output

**Responsibilities:**
- Score incoming leads based on company size, industry fit, and engagement signals
- Classify leads as hot / warm / cold
- Suggest personalised outreach angles based on company profile
- Flag highest-priority prospects each week

---

## Agent: Content Assistant

**Phase:** 3
**Interface:** Content page — "Generate Draft" button
**Model:** GPT-4o

**Responsibilities:**
- Generate social media post drafts (LinkedIn, Instagram, YouTube scripts)
- Suggest content ideas based on current business activity (new client wins, milestones)
- Adapt tone per platform
- Schedule posts via calendar integration

---

## Agent: WhatsApp Classifier

**Phase:** 4
**Interface:** Background (no UI — runs on incoming messages)
**Model:** GPT-4o-mini (fast, cheap)

**Responsibilities:**
- Classify incoming WhatsApp messages by intent (inquiry, follow-up, complaint, booking)
- Auto-tag sender in CRM as lead or client
- Surface urgent messages to the dashboard
- Suggest reply templates for Luca to approve and send

---

## Agent: CFO Analyst

**Phase:** 5
**Interface:** Fusion CFO page
**Model:** GPT-4o

**Responsibilities:**
- Analyse P&L data and generate plain-language summaries
- Flag unusual expense patterns or revenue drops
- Forecast monthly revenue from current pipeline and close probabilities
- Alert on cash flow risks

---

## Agent Design Principles

1. **Agents augment, not replace.** Luca always reviews and approves before any action is taken externally (emails sent, messages posted, CRM updated).
2. **Transparent context.** Each agent shows what data it used to reach its conclusions.
3. **Fail safe.** If an agent has insufficient context, it says so rather than hallucinating.
4. **Cost conscious.** Fast, cheap models (GPT-4o-mini) for classification tasks. Powerful models (GPT-4o) for synthesis and generation.
