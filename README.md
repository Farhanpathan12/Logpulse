# LogPulse — In-App Changelog & Reader Analytics Platform

> **Product Showcase, Technical Architecture & System Overview**

[![Live Application](https://img.shields.io/badge/Live_App-logpulse.vercel.app-000000?style=for-the-badge&logo=vercel)](https://logpulse.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma_ORM-4169E1?style=for-the-badge&logo=postgresql)](https://www.prisma.io/)

🌐 **Live Application:** [https://logpulse.vercel.app/](https://logpulse.vercel.app/)  
👨‍💻 **Architect & Developer:** [Farhan Pathan](https://github.com/Farhanpathan12)

---

> [!NOTE]
> **Proprietary Software & Portfolio Showcase**  
> LogPulse is an active commercial SaaS product. This repository serves as a **System Overview & Technical Showcase** for portfolio inspection and recruiter review. The production application source files and backend secrets remain private.

---

## 📌 Product Overview

Modern software products evolve rapidly, but keeping active users informed about releases is a major challenge. Teams often rely on disconnected email blasts or buried documentation that users ignore.

**LogPulse** bridges this gap by providing an embeddable in-app notification widget combined with a centralized changelog dashboard. Engineering teams can draft rich release notes, categorize announcements, collect instant reader sentiment, and broadcast updates to subscribers automatically.

---

## ✨ Core Features & Functionality

### 1. In-App Notification Widget
- **Single-Snippet Embed:** Easily integrated into any web application with a lightweight script snippet.
- **Custom Theming:** Supports dynamic brand colors, light and dark themes, and custom screen docking positions (bottom-right, bottom-left).
- **Origin Security:** Configurable domain whitelisting to ensure the widget only loads on authorized customer domains.

### 2. Rich-Text Publishing Pipeline
- **TipTap WYSIWYG Editor:** Support for Markdown syntax, rich headers, code blocks, bullet points, and image media uploads.
- **Structured Categorization:** Releases are tagged under `NEW`, `IMPROVED`, or `FIXED` badges for immediate clarity.
- **Drafts & Scheduled Publishing:** Teams can prepare release notes in advance and automate launch times.

### 3. Reader Analytics & Engagement
- **Engagement Curves:** Tracks daily impressions, open rates, and click-through metrics with interactive Recharts graphs.
- **Audience Sentiment:** Readers can react to releases in real time using emoji reactions.
- **Automated Newsletter Broadcasts:** Automatically delivers new changelog entries to subscribers via Resend transactional email.

---

## 🏗️ System Architecture & Engineering Flow

The application is structured into four core layers:

1. **Host Application Layer:** The customer web application loads `widget.js`, which injects an isolated drawer iframe into the host page.
2. **API & Delivery Layer:** Next.js Route Handlers serve cached release data, validate host origins, and track reader view events.
3. **Data & Persistence Layer:** PostgreSQL database managed via Prisma ORM storing projects, releases, reactions, and daily readership metrics.
4. **Third-Party Integrations:**
   - **Clerk:** Multi-tenant user authentication and session management.
   - **Resend:** Transactional email deliverability for subscriber updates.
   - **UploadThing:** CDN storage for release screenshots and assets.

---

## 🛠️ Complete Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & Motion** | Tailwind CSS v4, Framer Motion, Radix UI |
| **Data Visualization** | Recharts (Daily impressions, CTR tracking) |
| **Database & ORM** | PostgreSQL, Prisma ORM |
| **Authentication** | Clerk (Session tokens, RBAC, Webhooks) |
| **Asset Storage** | UploadThing CDN |
| **Email Deliverability** | Resend API |
| **Hosting & Edge** | Vercel Serverless Edge Network |

---

## 📄 License & Intellectual Property

Copyright © 2025–2026 Farhan Pathan. All Rights Reserved.

This repository is proprietary software provided exclusively for technical inspection, code review, and portfolio demonstration. No license is granted to copy, reproduce, modify, deploy, or commercially exploit this software or its architecture.
