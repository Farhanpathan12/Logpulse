# LogPulse — In-App Changelog & Reader Analytics Platform

> **Technical Architecture, System Design & Product Case Study**

[![Live Demo](https://img.shields.io/badge/Live_App-logpulse.vercel.app-000000?style=for-the-badge&logo=vercel)](https://logpulse.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma_ORM-4169E1?style=for-the-badge&logo=postgresql)](https://www.prisma.io/)

🌐 **Live Application:** [https://logpulse.vercel.app/](https://logpulse.vercel.app/)  
👨‍💻 **Architect & Engineer:** [Farhan Pathan](https://github.com/Farhanpathan12)

---

> [!NOTE]
> **Proprietary Software Notice & Portfolio Case Study**  
> LogPulse is an active commercial SaaS platform. This repository is maintained as a **Technical Architecture & Engineering Case Study** for portfolio evaluation, system design review, and recruiter inspection. Proprietary application source files, internal microservices, and production secrets remain strictly private.

---

## 📌 Executive Summary

Modern software applications deploy updates rapidly, but keeping end-users engaged with product releases is notoriously broken. Teams rely on disconnected email blasts or buried documentation that users rarely read.

**LogPulse** solves this communication gap with an embeddable, customizable in-app notification widget and a central changelog dashboard. Founders and engineering teams draft rich releases, categorize updates, broadcast notifications to subscribers, and measure readership engagement via real-time analytics.

---

## 🏗️ High-Level System Architecture

```mermaid
flowchart TD
    subgraph ClientHost [Customer Web Application]
        UserBrowser[End-User Browser]
        WidgetScript[LogPulse Widget Loader script]
        IframeDrawer[Isolated Notification Drawer]
    end

    subgraph LogPulsePlatform [LogPulse SaaS Platform]
        AppRouter[Next.js 15 App Router]
        DashboardUI[Authenticated Dashboard]
        WidgetAPI[/api/widget/:projectId API Route]
        Editor[TipTap Rich-Text Engine]
    end

    subgraph DataServices [Backend & Cloud Infrastructure]
        PrismaORM[Prisma ORM Client]
        PostgresDB[(PostgreSQL Database)]
        ClerkAuth[Clerk Authentication & RBAC]
        UploadThing[UploadThing CDN Assets]
        ResendEngine[Resend Email Broadcasts]
    end

    UserBrowser -->|Loads host app| WidgetScript
    WidgetScript -->|Fetches published updates| WidgetAPI
    WidgetAPI -->|Queries posts & aggregates stats| PrismaORM
    PrismaORM --> PostgresDB
    WidgetScript -->|Renders clean UI| IframeDrawer

    DashboardUI -->|Auth & Session| ClerkAuth
    DashboardUI -->|Create & Schedule Releases| Editor
    Editor -->|Upload screenshots/media| UploadThing
    DashboardUI -->|Publish release| AppRouter
    AppRouter -->|Write release note| PrismaORM
    AppRouter -->|Trigger subscriber delivery| ResendEngine
```

---

## ⚙️ Core Technical Highlights

### 1. Embeddable Widget Architecture
- **Lightweight Script Delivery:** Designed as an isolated client-side loader that can be embedded into any external web application via a single `<script>` snippet.
- **Cross-Origin Security:** Host domain validation checks ensure widget data is only requested and rendered on verified allowed origins.
- **Custom Theming Engine:** Dynamic styling parameters support custom brand hex colors, dark/light modes, and variable screen docking positions (`bottom-right`, `bottom-left`).

### 2. Rich-Text Publishing Pipeline
- **TipTap WYSIWYG Integration:** Custom-configured TipTap editor with structured support for Markdown, headings, lists, formatted code blocks, and embedded media.
- **Category Tagging & Scheduling:** Granular categorization under `NEW`, `IMPROVED`, and `FIXED` badges, paired with draft and scheduled publishing states.

### 3. Readership Analytics & Feedback Loops
- **Daily Impression & CTR Tracking:** Aggregated daily view and click counters rendered through responsive Recharts visualizations.
- **Sentiment Capture:** Real-time reader emoji reactions recorded on individual release notes to gauge feature reception.
- **Email Broadcast Pipelines:** Built-in subscriber collection with asynchronous newsletter delivery on publication powered by Resend.

---

## 🗄️ Relational Data Model (Prisma Schema)

LogPulse utilizes PostgreSQL modeled via Prisma ORM for relational integrity:

```prisma
model User {
  id                 String    @id // Maps to Clerk ID
  email              String
  role               Role      @default(USER)
  createdAt          DateTime  @default(now())
  plan               Plan      @default(FREE)
  projects           Project[]
}

model Project {
  id              String        @id @default(cuid())
  name            String
  domain          String
  brandColor      String
  widgetPosition  String        @default("bottom-right")
  widgetTheme     String        @default("dark")
  allowedOrigins  String[]      @default([])
  ownerId         String
  owner           User          @relation(fields: [ownerId], references: [id])
  posts           Post[]
  subscribers     Subscriber[]
  dailyStats      DailyStat[]
}

model Post {
  id           String        @id @default(cuid())
  title        String
  content      String
  category     PostCategory  // NEW | IMPROVED | FIXED
  published    Boolean
  scheduledFor DateTime?
  views        Int           @default(0)
  projectId    String
  project      Project       @relation(fields: [projectId], references: [id], onDelete: Cascade)
  reactions    Reaction[]
}

model Reaction {
  id        String   @id @default(cuid())
  emoji     String
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  count     Int      @default(1)

  @@unique([postId, emoji])
}
```

*(Complete relational models documented in [`architecture/DATABASE_SCHEMA.prisma`](architecture/DATABASE_SCHEMA.prisma))*

---

## 🛠️ Complete Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & Motion** | Tailwind CSS v4, Framer Motion, Radix UI |
| **Data Visualization** | Recharts (Daily impressions, CTR curves) |
| **Database & ORM** | PostgreSQL, Prisma ORM 6 |
| **Authentication** | Clerk (Session tokens, RBAC, Webhooks) |
| **Media Storage** | UploadThing CDN |
| **Transactional Email** | Resend API |
| **Hosting & Edge** | Vercel Serverless Edge Network |

---

## 📄 License & Intellectual Property

Copyright © 2025–2026 Farhan Pathan. All Rights Reserved.

This repository is proprietary software provided exclusively for technical inspection, system design evaluation, and portfolio demonstration. No license is granted to copy, reproduce, modify, deploy, or commercially exploit this software or its architecture.
