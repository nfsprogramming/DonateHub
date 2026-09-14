import Link from 'next/link';
import { FileText, Shield, Scale, ArrowLeft, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Terms of Service — DonateHub | Indian Legal & Compliance Standards',
  description: 'Read the DonateHub platform terms of service governing donors, verified NGO partners, milestone fund disbursements, and 80G tax deductions.',
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to DonateHub
          </Link>
          <div className={styles.badge}>
            <Scale size={14} /> Legal Agreement
          </div>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Effective Date: April 2026. Please read these terms carefully before participating on DonateHub.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <article className={styles.content}>
            <section className={styles.section}>
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the DonateHub platform (the &quot;Platform&quot;), whether as a visitor, donor, or verified Non-Governmental Organization (&quot;NGO Partner&quot;), you enter into a legally binding contract with DonateHub India Foundation. These Terms are governed by Indian law, including the <strong>Information Technology Act, 2000</strong> and the <strong>Indian Contract Act, 1872</strong>.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. Platform Nature & Role</h2>
              <p>
                DonateHub operates as a technology facilitator and public transparency ledger connecting donors directly with verified Indian charitable organizations. DonateHub does not directly administer charitable programs or hold proprietary rights over donated funds; all donations are received in escrow and released directly to validated NGO bank accounts or certified vendors upon milestone verification.
              </p>
            </section>

            <section className={styles.section}>
              <h2>3. Donor Terms & Section 80G Provisions</h2>
              <ul>
                <li><strong>Voluntary Contributions:</strong> All donations are voluntary gifts made without expectation of commercial consideration, equity, or personal goods in return.</li>
                <li><strong>Source of Funds:</strong> Donors certify that all funds contributed originate from lawful sources in compliance with the Prevention of Money Laundering Act (PMLA), 2002.</li>
                <li><strong>Tax Exemption Certificates (80G):</strong> Section 80G tax exemption certificates are issued exclusively by the respective verified NGO partner possessing valid 12A/80G registrations from the Income Tax Department of India. DonateHub facilitates automated receipt dispatch and annual Form 10BD filings on behalf of verified partner NGOs.</li>
                <li><strong>Material Item Donations:</strong> When pledging physical items (e.g., notebooks, medical equipment, ration kits), donors agree to deliver new or excellent-condition goods meeting specified quality standards.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>4. NGO Partner Obligations</h2>
              <p>All organizations listing campaigns on DonateHub must strictly adhere to our Transparency Code:</p>
              <ul>
                <li><strong>Statutory Compliance:</strong> Maintain active Section 12A and 80G status, valid PAN, and FCRA registration (if receiving non-resident Indian or foreign contributions).</li>
                <li><strong>Itemized Fund Utilization:</strong> Upload genuine GST-compliant vendor invoices, photo proof of delivery, and verifiable attendance logs for each milestone before requesting subsequent fund tranches from escrow.</li>
                <li><strong>Administrative Cap:</strong> Overhead and administrative expenses must not exceed 10% to 15% of the total campaign budget.</li>
                <li><strong>Zero Tolerance for Misappropriation:</strong> Misrepresentation of beneficiary counts, diversion of funds, or fraudulent billing results in immediate suspension, legal recovery proceedings, and public blacklisting.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>5. Escrow Mechanism & Milestone Releases</h2>
              <p>
                To protect donor trust, monetary donations for major campaigns are held in nodal escrow accounts managed with RBI-regulated banking partners. Disbursements are made in phased tranches (e.g., Foundation, Mid-Term Inspection, Final Delivery) upon approval by independent compliance auditors.
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Platform Fees & Costs</h2>
              <p>
                DonateHub maintains radical cost transparency. A nominal platform & payment processing fee of 2.0% is utilized solely to cover payment gateway charges (UPI, cards, net banking) and third-party audit infrastructure. Over 94% of gross collections directly power on-ground humanitarian relief.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Intellectual Property & User Content</h2>
              <p>
                All platform trademarks, design system components, interactive visualizations, and algorithms are proprietary to DonateHub India Foundation. NGOs grant DonateHub a perpetual, royalty-free license to display campaign text, imagery, and updates to promote transparency and social impact.
              </p>
            </section>

            <section className={styles.section}>
              <h2>8. Dispute Resolution & Jurisdiction</h2>
              <p>
                Any dispute, claim, or controversy arising under these Terms shall be resolved through good-faith mutual consultation. If unresolved within 30 days, disputes shall be submitted to arbitration in Bengaluru, Karnataka, under the Indian Arbitration and Conciliation Act, 1996. The courts of Bengaluru shall have exclusive jurisdiction.
              </p>
            </section>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Platform Standards</h3>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> Escrow-Protected Giving</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> 100% Verified 80G NGOs</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> PMLA & FCRA Compliant</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> Itemized Milestone Audits</div>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Quick Navigation</h3>
              <ul className={styles.sideLinks}>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/refund">Refund & Cancellation Policy</Link></li>
                <li><Link href="/about">About DonateHub</Link></li>
                <li><Link href="/transparency">Public Audit Ledger</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
