<div align="center">

# 🗄️ JobVault API

**Centralize. Track. Land the job.**

REST API backend for JobVault — your smart job application manager.

[![NestJS](https://img.shields.io/badge/NestJS-v10-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## 📖 About

**JobVault** is a web application designed for job seekers who want to centralize and track all their job applications in one place. No more scattered Excel files, forgotten notes, or lack of visibility on your job search progress.

This repository contains the **backend API** for JobVault, built with NestJS and PostgreSQL.

> 💡 The JobVault ecosystem also includes a **Chrome extension** (*Save to JobVault*) that lets you save job listings from LinkedIn, Indeed, or Le Forem in one click.

---

## 🚀 Features

### ✅ MVP — Version 1

#### 🔐 Authentication
- Create an account
- Login / Logout
- Change password
- Password reset *(optional v1)*

#### 📋 Application Management
- **Create** an application with:
  - Company name
  - Job title
  - Location
  - Offered salary *(optional)*
  - Application date
  - Job listing URL *(optional)*
  - Personal notes *(optional)*
  - Current status
- **Edit** an application
- **Delete** an application *(with confirmation)*

#### 🔍 List, Filters & Sorting
| Available Filters | Available Sorts |
|---|---|
| Company name | Most recent |
| Job title | Oldest |
| Location | Salary ascending |
| Salary | Salary descending |
| Status | |
| Application date | |

---

## 📊 Application Statuses

```
Draft  →  Application Sent  →  Follow-up Sent
                ↓
          HR Interview  →  Technical Interview
                ↓
          Technical Test  →  Final Interview
                ↓
          Offer Received  →  Hired ✅
                ↓
          Rejected ❌  |  No Response ⏳
```

---

## ⚙️ Business Rules

### Rule #1 — Initial Status
> When an application is created, its status is automatically set to **"Application Sent"**.

### Rule #2 — Auto-transition to "No Response"
> After **15 days without a status change**, an application with the status *"Application Sent"* automatically transitions to **"No Response"**.
>
> This transition is handled by a **Cron Job** that calculates inactivity based solely on the **date of the last status change**.

### Rule #3 — Closed Application (Hired)
> An application with the status **"Hired"** is considered **closed** and can no longer be automatically modified.

### Rule #4 — Closed Application (Rejected)
> An application with the status **"Rejected"** is considered **closed** and can no longer be automatically modified.

---

## 🗺️ Roadmap

### 🔜 Version 2
- **Status history** — View the full journey of an application:
  ```
  Jun 01 → Application Sent
  Jun 08 → HR Interview
  Jun 15 → Technical Test
  Jun 20 → Rejected
  ```
- **Automatic email reminders**:
  > *"Have you received a response regarding your application at X?"*
- **Chrome Extension** — *Save to JobVault*:
  - Auto-detect job listings from LinkedIn, Indeed, Le Forem
  - Auto-extract: company, title, location, salary, URL
  - One-click application creation

### 🔮 Version 3
- **Advanced statistics**:
  - Response rate & interview rate
  - Average time before receiving a response
  - Number of applications per week
  - Interactive charts
- **AI Assistant**:
  - *"You get more interviews for Backend roles than Fullstack ones."*
  - *"Applications sent on Monday tend to get more responses."*
  - *"Your response rate is 12%."*

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 LTS |
| Framework | NestJS 10 (TypeScript) |
| Database | PostgreSQL 16 |
| ORM | TypeORM |
| Authentication | JWT + Passport.js |
| Scheduled tasks | `@nestjs/schedule` (Cron Jobs) |
| Validation | `class-validator` / `class-transformer` |
| Testing | Jest |

---

## 📦 Installation

### Prerequisites

- **Node.js** 20 LTS — [nodejs.org](https://nodejs.org)
- **PostgreSQL** 16+ — [postgresql.org](https://www.postgresql.org)
- **NestJS CLI**:
  ```bash
  npm install -g @nestjs/cli
  ```

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jobVaultAPI.git
cd jobVaultAPI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in the variables in `.env`:

```env
# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=jobvault

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

### 4. Run migrations

```bash
npm run migration:run
```

### 5. Start the server

```bash
# Development (hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`.

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Code coverage
npm run test:cov
```

---

## 📁 Project Structure

```
src/
├── auth/               # JWT Authentication
├── users/              # User management
├── applications/       # Job applications (CRUD + filters)
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # TypeORM entities
│   └── enums/          # Application statuses
├── scheduler/          # Cron Jobs (15-day rule)
├── common/             # Guards, interceptors, pipes
└── config/             # Configuration (DB, JWT, etc.)
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ for job seekers

</div>
