import Link from 'next/link';
import { Shield, Lock, Eye, CheckCircle2, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy — DonateHub | Data Protection & Donor Privacy',
  description: 'Learn how DonateHub collects, protects, and handles your personal information in compliance with India’s Digital Personal Data Protection (DPDP) Act 2023.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to DonateHub
          </Link>
          <div className={styles.badge}>
            <Shield size={14} /> DPDP Act 2023 Compliant
          </div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Last updated: April 2026. Your privacy and trust are the foundation of everything we build.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Main content */}
          <article className={styles.content}>
            <section className={styles.section}>
              <h2>1. Introduction & Overview</h2>
              <p>
                DonateHub India (&quot;DonateHub&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the social impact and donation platform located at donate-hub-chi.vercel.app and affiliated digital properties. This Privacy Policy details our practices concerning the collection, storage, processing, and protection of personal data in strict compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <strong>Information Technology Act, 2000</strong>.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Information We Collect</h2>
              <p>We collect only the minimum information necessary to safely process donations, disburse funds, and issue statutory tax certificates:</p>
              <ul>
                <li><strong>Donor Personal Data:</strong> Full Name, Email Address, Contact Phone Number, and Mailing Address (for physical receipt dispatch or item pickup).</li>
                <li><strong>Tax Exemption Data:</strong> Permanent Account Number (PAN) is strictly collected only when requested by the donor to generate Section 80G tax exemption certificates under Form 10BE requirements mandated by the Income Tax Department of India.</li>
                <li><strong>Anonymous Donations:</strong> If you select &quot;Donate anonymously&quot;, your name and profile will never appear on public donor boards, campaign updates, or social feeds. Only our internal compliance ledger maintains encrypted records required for statutory reporting.</li>
                <li><strong>Payment Information:</strong> We do NOT store credit card numbers, debit card PINs, CVVs, or UPI MPINs on our servers. All financial transactions are tokenized and processed through RBI-authorized payment aggregators (such as Razorpay and Stripe India) adhering to PCI-DSS Level 1 certification.</li>
                <li><strong>NGO Partner Information:</strong> Trust Deed, 12A/80G certificates, PAN, FCRA status, Darpan ID, audited balance sheets, and authorized signatory KYC details.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. How We Use Your Data</h2>
              <p>Your data is processed strictly for legitimate non-profit and platform purposes:</p>
              <ul>
                <li>Facilitating fund and material donations to verified Indian NGOs.</li>
                <li>Generating and issuing automated Section 80G tax receipts and Form 10BD annual reporting.</li>
                <li>Providing milestone alerts, campaign impact reports, and transparent fund utilization summaries.</li>
                <li>Preventing financial fraud, duplicate transactions, and unauthorized account access.</li>
                <li>Coordinating logistics for material item donations (such as school supplies and relief kits).</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>4. Data Sharing & Third Parties</h2>
              <p>
                We do not sell, rent, trade, or monetize your personal information to third-party advertisers or data brokers under any circumstances. We share information only with:
              </p>
              <ul>
                <li><strong>The Beneficiary NGO:</strong> When you donate to a specific campaign, the vetted NGO receives your contact details solely for acknowledgment and statutory compliance, unless you marked the donation anonymous.</li>
                <li><strong>Statutory Tax Authorities:</strong> Annual donation summaries are reported to the Income Tax Department of India in Form 10BD for donor 80G deductions.</li>
                <li><strong>Auditors & Escrow Bankers:</strong> Independent auditors (KPMG India) and escrow banking partners under strict non-disclosure obligations to verify fund disbursements.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>5. Data Security & Storage</h2>
              <p>
                All data in transit is encrypted using TLS 1.3 cryptographic protocols with 256-bit encryption. All databases are hosted within secure, ISO 27001-certified data centers located in India to comply with local data localization guidelines. Access to internal administrative databases requires multi-factor biometric authentication.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Your Rights Under the DPDP Act 2023</h2>
              <p>As a data principal in India, you hold the following statutory rights:</p>
              <ul>
                <li><strong>Right to Access:</strong> Request a complete copy of all personal records and donation history associated with your account.</li>
                <li><strong>Right to Correction:</strong> Request immediate rectification of inaccurate or outdated contact or tax identification details.</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your account and personal profile (subject to legal retention periods mandated by the Income Tax Act).</li>
                <li><strong>Right to Nominate:</strong> Designate a nominee to exercise data rights in the event of incapacity.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>7. Grievance Officer Contact</h2>
              <p>
                In accordance with Rule 3(11) of the Information Technology (Intermediaries Guidelines) Rules, the details of our Data Protection Grievance Officer are:
              </p>
              <div className={styles.officerBox}>
                <strong>Grievance Redressal Officer:</strong> Priya Sharma<br />
                <strong>Email:</strong> grievance@donatehub.in<br />
                <strong>Address:</strong> DonateHub India Foundation, 4th Floor, Tech Hub, Indiranagar, Bengaluru, Karnataka — 560038<br />
                <strong>Response Window:</strong> We respond to all formal complaints within 24 to 48 business hours.
              </div>
            </section>
          </article>

          {/* Quick links sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Key Trust Commitments</h3>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> DPDP Act 2023 Compliant</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> Zero Commercial Data Selling</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> 256-Bit TLS Bank-Grade Encryption</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> Section 80G Form 10BD Automation</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> Anonymous Giving Option</div>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Related Legal Policies</h3>
              <ul className={styles.sideLinks}>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/refund">Refund & Cancellation Policy</Link></li>
                <li><Link href="/transparency">Public Transparency Ledger</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
