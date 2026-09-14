import Link from 'next/link';
import { RefreshCcw, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'Refund & Cancellation Policy — DonateHub',
  description: 'Understand the DonateHub refund, cancellation, and duplicate transaction resolution policies under Indian banking and non-profit regulations.',
};

export default function RefundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to DonateHub
          </Link>
          <div className={styles.badge}>
            <RefreshCcw size={14} /> Donor Protection
          </div>
          <h1 className={styles.title}>Refund & Cancellation Policy</h1>
          <p className={styles.subtitle}>
            Clear, fair, and transparent guidelines for resolving donation errors and recurring subscription cancellations.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <article className={styles.content}>
            <section className={styles.section}>
              <h2>1. General Principle on Charitable Contributions</h2>
              <p>
                Under Section 2(15) and Section 80G of the Indian Income Tax Act, 1961, contributions made to verified non-profit campaigns are recognized as voluntary charitable gifts. As a general rule, once funds have been legally disbursed from escrow to a verified NGO partner and deployed for on-ground humanitarian relief (e.g., medical treatment, emergency food distribution, disaster rehabilitation), they are irrevocable and non-refundable.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. When Refunds Are Issued</h2>
              <p>DonateHub is committed to complete fairness. We promptly process refunds under the following explicit circumstances:</p>
              <ul>
                <li><strong>Technical Errors & Duplicate Deductions:</strong> If a technical glitch on the platform or banking network resulted in your account being charged twice for a single donation, the duplicate amount is refunded automatically or within 24 hours of notification.</li>
                <li><strong>Unauthorized Transactions:</strong> If you notice an unauthorized charge on your card, net banking, or UPI ID, report it to us within <strong>48 hours</strong> with primary transaction reference IDs for immediate reversal before escrow release.</li>
                <li><strong>Unverified Campaign or NGO Default:</strong> If an ongoing campaign is cancelled due to compliance failure, milestone fraud, or inability of the NGO partner to complete statutory verification, all remaining escrowed funds are returned to donors proportionally.</li>
                <li><strong>Erroneous Contribution Amount:</strong> If a donor accidentally entered an incorrect denomination (e.g., typing ₹50,000 instead of ₹5,000), notify us within 24 hours before the daily escrow settlement cycle.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. Recurring Monthly Donations (Cancellations)</h2>
              <p>
                Donors supporting recurring monthly giving retain 100% control over their contributions. You may cancel, pause, or adjust your monthly donation subscription at any time:
              </p>
              <ul>
                <li>Instant 1-click cancellation available via your <Link href="/dashboard" className={styles.inlineLink}>Donor Dashboard</Link>.</li>
                <li>No cancellation penalties, lock-in periods, or advance notice required.</li>
                <li>Any charge incurred within 48 hours of cancellation can be refunded upon request.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>4. Section 80G Tax Implications of Refunds</h2>
              <div className={styles.alertBox}>
                <AlertCircle size={20} className={styles.alertIcon} />
                <div>
                  <strong>Important Tax Notice:</strong> In the event a refund is processed for a donation for which a Section 80G certificate has already been generated, the associated 80G receipt and Form 10BE record are formally marked void. The cancellation will be filed with the Income Tax Department in our quarterly Form 10BD amendment, and the donor is not legally eligible to claim tax deductions on the refunded sum.
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>5. Refund Timeline & Processing Mode</h2>
              <p>
                Approved refunds are initiated within <strong>24 to 48 hours</strong>. Funds are credited directly back to the original payment instrument in compliance with RBI guidelines:
              </p>
              <ul>
                <li><strong>UPI Transactions:</strong> 2 to 4 business days credited directly to your linked UPI VPA / bank account.</li>
                <li><strong>Credit / Debit Cards:</strong> 5 to 7 business days depending on your card issuer bank.</li>
                <li><strong>Net Banking:</strong> 3 to 5 business days via NEFT / IMPS reversal.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>6. How to Request a Refund</h2>
              <p>To request assistance with an erroneous payment or duplicate deduction, please reach out to our dedicated claims desk:</p>
              <div className={styles.contactCard}>
                <div><strong>Email:</strong> refunds@donatehub.in</div>
                <div><strong>Subject Line:</strong> Refund Request — [Your Transaction or Receipt ID]</div>
                <div><strong>Information to Provide:</strong> Transaction Date, Registered Email, Bank Reference / UTR Number, and reason for refund.</div>
              </div>
            </section>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Resolution Guarantee</h3>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> 24hr Duplicate Payment Reversal</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> 1-Click Monthly Giving Pause</div>
              <div className={styles.trustItem}><CheckCircle2 size={16} /> Direct-to-Source Credit</div>
              <div className={styles.trustItem}><Clock size={16} /> 5-7 Day Maximum Turnaround</div>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Need Help?</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Our donor support team is available Monday through Saturday from 9:30 AM to 6:30 PM IST.
              </p>
              <div style={{ marginTop: '12px' }}>
                <Link href="/about" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Contact Support</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
