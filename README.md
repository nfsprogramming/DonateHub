# 🇮🇳 DonateHub — Transparent Giving & Social Impact Platform for India

> **"Give with confidence. See where your money goes."**  
> DonateHub is the digital infrastructure for philanthropic giving and grassroots social impact across India, anchored on radical fund transparency, institutional NGO verification, milestone-based escrow disbursements, and automated Section 80G tax exemptions.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tax Compliant](https://img.shields.io/badge/80G%20Tax%20Exempt-Eligible-green)](#section-80g-tax-benefits)
[![DPDP Act](https://img.shields.io/badge/DPDP%20Act%202023-Compliant-emerald)](#privacy--data-protection)

---

## 🌟 Key Highlights & Features

### 1. 🛡️ 100% Institutional NGO Verification
Every non-profit on DonateHub undergoes our stringent 4-step due diligence:
- **Statutory Review:** Section 12A & 80G certification validation, PAN, and FCRA licensing check.
- **Financial Audit:** 3 years of audited balance sheets and annual IT filings.
- **On-Ground Field Inspections:** Direct physical verification of beneficiary centers and local operations.
- **Quarterly Monitoring:** Independent compliance audits by certified evaluators.

### 2. 📊 Radical Fund Transparency & Public Ledger
- **No Black-Box Spending:** Every rupee is tracked from donation to procurement.
- **Itemized Fund Allocations:** Interactive visual breakdown of program delivery, equipment, logistics, and reserves.
- **Public Audit Trail:** Milestone updates backed by geo-tagged photos and verifiable supplier invoices.
- **94%+ Direct Impact:** Over 94% of gross collections directly reach beneficiaries on the ground.

### 3. 💳 Flexible Contribution Channels
- **Financial Donations:** Support via UPI (Google Pay, PhonePe, Paytm), RuPay & International Cards, and Net Banking.
- **One-Time & Recurring Giving:** 1-click subscription management with zero cancellation lock-in.
- **Material & Item Donations:** Pledge tangible goods (school bags, food kits, blankets, medical supplies) with options for drop-off or doorstep pickup coordination.

### 4. 📜 Instant Section 80G Tax Certificates
- Automated generation of 10BE-compliant tax receipts upon donation completion.
- Seamless PAN integration for hassle-free filing with the Income Tax Department under Form 10BD.

### 5. 👥 Dedicated Portals & Role-Based Access
- **Donors:** Giving history, real-time campaign impact tracker, downloadable tax receipts, and wishlist.
- **NGO Partners:** Campaign creation, fundraising progress analytics, donor messaging, and milestone updates.
- **Admins:** Campaign moderation queue, transaction verification, fraud prevention, and audit reporting.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 16.2.4](https://nextjs.org/) with App Router & [Turbopack](https://turbo.build/pack)
- **Library:** [React 19.2.4](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** Vanilla CSS Modules with bespoke Indian Ivory & Forest Emerald design system
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & CSS keyframes
- **Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backend / Database Support:** [Firebase](https://firebase.google.com/) Firestore & Auth readiness

---

## 📂 Project Structure

```
DonateHub/
├── public/
│   └── images/                # High-resolution campaign photos
├── src/
│   ├── app/
│   │   ├── about/             # About Us & 4-step verification framework
│   │   ├── admin/             # Platform admin & moderation suite
│   │   ├── campaigns/         # Campaign discovery, filters, and categories
│   │   │   └── [slug]/        # Individual campaign detail & sticky donation widget
│   │   ├── dashboard/         # Donor giving summary, tax certificates & wishlist
│   │   ├── donate/            # Multi-step donation & material item pledge flow
│   │   ├── forgot-password/   # Password reset workflow
│   │   ├── login/             # Sign-in page with 1-click demo accounts
│   │   ├── ngo/               # NGO partner portal & campaign manager
│   │   ├── not-found.tsx      # Branded custom 404 page
│   │   ├── privacy/           # DPDP Act 2023 & data protection policy
│   │   ├── profile/           # User profile & PAN management
│   │   ├── refund/            # Refund & recurring donation cancellation policy
│   │   ├── register/          # Account creation (Donor or NGO Organization)
│   │   ├── terms/             # Terms of service & escrow guidelines
│   │   ├── transparency/      # Public audit ledger & fund distribution chart
│   │   ├── globals.css        # Core design system tokens & utilities
│   │   └── layout.tsx         # Root layout with SEO and metadata
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   ├── providers/         # Global state & context providers
│   │   └── ui/                # CampaignCard, CommandPalette (Ctrl+K)
│   ├── context/
│   │   └── AuthContext.tsx    # Role-based authentication & session state
│   └── lib/
│       ├── firebase.ts        # Firebase client SDK initialization
│       ├── mockData.ts        # Curated campaigns, transactions, and metrics
│       └── types.ts           # Strict TypeScript interfaces & models
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/nfsprogramming/DonateHub.git
cd DonateHub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🔑 Demo Credentials

DonateHub includes instant 1-click test credentials on the Login page:

| Role | Email | Password | Access |
|---|---|---|---|
| **Donor** | `arjun@example.com` | `password123` | Personal giving dashboard, tax receipts, wishlist |
| **NGO Partner** | `priya@healindia.org` | `password123` | NGO portal, campaign creation, donor analytics |
| **Administrator** | `admin@donatehub.in` | `password123` | Platform oversight, campaign approval, transaction audit |

---

## 📜 Compliance & Legal

- **Section 80G:** Tax exemption receipts under Section 80G(5)(vi) of the Income Tax Act, 1961.
- **DPDP Act 2023:** Full adherence to data minimization, purpose limitation, and donor privacy rights.
- **Escrow Protection:** Controlled tranche disbursements tied directly to milestone validation.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Made with ❤️ in India for social impact and radical transparency.**
