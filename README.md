# 🦊 myKiboCFO Colombia - Internal Monorepo

> **CONFIDENTIAL & PROPRIETARY**  
> This repository contains source code and assets that are the property of **Kibo Colombia S.A.S.** Unauthorized copying, distribution, or public display is strictly prohibited.

![Status](https://img.shields.io/badge/Status-Active_Development-success)
![Security](https://img.shields.io/badge/Security-High-red)
![Version](https://img.shields.io/badge/Internal_Version-0.1.0-blue)

## 📖 Documentation Index

- **[Product Vision & Mission](./PRODUCT_VISION.md)** (Read this to understand the business logic)
- [API Documentation](./docs/api.md) *(Coming Soon)*
- [Security Protocols](./docs/security.md) *(Coming Soon)*

---

## 🔒 Security Protocol (READ FIRST)

1. **Never commit `.env` files.** Ensure your global `.gitignore` is active.
2. **No Hardcoded Secrets.** API Keys (Wompi, Belvo, Supabase) must be injected via Environment Variables.
3. **Access Control.** Access to this repository is granted on a strict need-to-know basis.

---

## 🛠 Tech Stack & Architecture

**myKiboCFO** is a Serverless Fintech Application designed for high security and scalability.

### Core Stack

- ![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white) **Framework**: App Router
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) **Language**: Strict typing
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) **Backend**: Auth, DB (PostgreSQL), Storage
- ![Capacitor](https://img.shields.io/badge/Capacitor-1199EE?style=flat-square&logo=capacitor&logoColor=white) **Mobile**: Native runtime for iOS/Android

### Integrations

- **Banking:** Belvo API (Financial Data Aggregation)
- **Payments:** Wompi API (Subscription handling)
- **Charts:** D3.js (Custom visualization engine)
- **Styling:** Tailwind CSS 4 with custom design system
- **Icons:** Lucide React

---

## 🔄 Workflow & Branching

We use a simplified Git Flow:

- **`main`** → Production code. Protected branch.
- **`develop`** → Staging environment.
- **`feature/feature-name`** → All new work happens here.

### Commit Convention

Follow conventional commits for clarity:

```bash
feat: add expense filtering by category
fix: resolve budget calculation bug
docs: update API documentation
style: improve mobile responsiveness
refactor: simplify authentication flow
test: add unit tests for budget logic
```

### Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Write/update tests
4. Submit PR to `develop`
5. Request code review
6. Merge after approval

---

## 📂 Project Structure

```
mykiboCFO/
├── expense-dashboard/          # Main Next.js application
│   ├── app/                    # App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── budget/            # Budget management
│   │   ├── home/              # Dashboard
│   │   ├── my-page/           # User profile & goals
│   │   └── expenses/          # Expense tracking
│   ├── components/             # React components
│   │   ├── budget/            # Budget-specific components
│   │   ├── charts/            # D3.js visualizations
│   │   ├── ui/                # Reusable UI components
│   │   └── quick-entry/       # Quick expense entry flow
│   ├── hooks/                  # Custom React hooks
│   │   ├── useNetworkStatus.ts
│   │   ├── useBudgetData.ts
│   │   └── useOfflineSync.ts
│   ├── lib/                    # Core utilities
│   │   ├── offline/           # Offline sync logic
│   │   ├── supabase/          # Supabase client
│   │   ├── belvo/             # Belvo integration
│   │   └── utils/             # Helper functions
│   ├── public/                 # Static assets
│   │   ├── icons/             # App icons
│   │   └── images/            # Images and graphics
│   ├── android/                # Android native project
│   ├── ios/                    # iOS native project
│   ├── capacitor.config.ts    # Mobile configuration
│   └── package.json           # Dependencies
├── docs/                       # Documentation (coming soon)
│   ├── api.md
│   └── security.md
├── PRODUCT_VISION.md          # Product philosophy
├── README.md                  # This file
└── .gitignore                 # Git ignore rules
```

---

## 🎨 Design System

The app follows the **Kibo Design Language**:

- **Mobile-First:** Optimized for Colombian smartphone users
- **Minimalist:** Clean interfaces that reduce cognitive load
- **Accessible:** WCAG 2.1 AA compliance
- **Offline-Ready:** Core features work without internet

## 🔐 Security Best Practices

### For Developers

- **Never log sensitive data** (tokens, passwords, user PII)
- **Use environment variables** for all secrets
- **Validate all user inputs** before processing
- **Sanitize data** before displaying in UI
- **Keep dependencies updated** (run `npm audit` regularly)

### For Data

- **Encryption at rest:** All user data in Supabase is encrypted
- **Encryption in transit:** HTTPS/TLS for all API calls
- **Habeas Data Compliance:** User consent is recorded and immutable
- **Data retention:** User data is deleted within 30 days of account deletion

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

---

## 🤝 Contributing

This is a private repository. Only authorized team members may contribute.

### Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] No hardcoded secrets or sensitive data
- [ ] Tests pass locally
- [ ] Documentation updated (if needed)
- [ ] Mobile responsiveness verified
- [ ] Accessibility tested
- [ ] Security implications considered

---

## 📄 License

**Proprietary License**  
Copyright © 2026 Kibo Colombia S.A.S. All Rights Reserved.

This software and associated documentation files are confidential and proprietary. You may not copy, modify, distribute, or reverse-engineer any part of this software without explicit written permission from Kibo Colombia S.A.S.

## 🗺️ Roadmap

- [x] Core budget tracking functionality
- [x] Offline sync with Dexie.js
- [ ] Full Belvo integration (in progress)
- [ ] DIAN obligations dashboard
- [ ] Mobile app beta (Android)
- [ ] OCR receipt scanning
- [ ] Shared budgets (family/couples)
- [ ] iOS app launch
- [ ] Wompi payment integration
- [ ] AI-powered insights
- [ ] Investment tracking
- [ ] Financial education center

---

<div align="center">

**Built with 💛💙❤️ in Colombia**

*Making financial peace accessible to every Colombian*

</div>
