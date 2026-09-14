import Link from 'next/link';
import { ShieldCheck, Heart, Eye, Target, Users, Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us — DonateHub | India’s Trusted Social Impact Infrastructure',
  description: 'Learn how DonateHub connects generous donors with verified Indian NGOs through radical transparency, milestone-based escrow, and 80G tax exemptions.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge}>
            <Sparkles size={14} /> Rebuilding Trust in Indian Philanthropy
          </div>
          <h1 className={styles.heroTitle}>
            The Digital Infrastructure for <span className="gradient-text">Transparent Giving</span> in India
          </h1>
          <p className={styles.heroSubtitle}>
            DonateHub was built on a simple conviction: Every rupee given with love deserves to be accounted for with radical clarity. We bridge genuine donors with thoroughly vetted NGOs to transform grassroots India.
          </p>

          <div className={styles.statsStrip}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>₹1.85 Cr+</span>
              <span className={styles.statLabel}>Mobilized for Causes</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>94,000+</span>
              <span className={styles.statLabel}>Active Changemakers</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>840+</span>
              <span className={styles.statLabel}>Vetted NGO Partners</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>21 Lakh+</span>
              <span className={styles.statLabel}>Lives Directly Impacted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.subHeading}>Our Guiding Compass</span>
            <h2 className={styles.sectionTitle}>Why DonateHub Exists</h2>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon} style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}>
                <Eye size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Radical Transparency</h3>
              <p className={styles.pillarText}>
                No black-box spending. Donors view real-time itemized ledgers, vendor payment receipts, and photo proof for every campaign milestone before subsequent funds are released.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon} style={{ background: '#fef3c7', color: '#b45309' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Institutional Vetting</h3>
              <p className={styles.pillarText}>
                We perform exhaustive 4-tier due diligence: Ministry of Corporate Affairs registration, Section 12A/80G validation, FCRA compliance, and on-ground field background checks.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon} style={{ background: '#e0f2fe', color: '#0369a1' }}>
                <Target size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Milestone Escrow</h3>
              <p className={styles.pillarText}>
                Donations are held in protected escrow accounts. Funds are disbursed in tranches only upon independent verification of ground progress by compliance officers.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon} style={{ background: '#fdf2f8', color: '#be185d' }}>
                <Heart size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Dignity & Community</h3>
              <p className={styles.pillarText}>
                We empower both monetary contributors and physical item donors (books, school kits, medical essentials) while honoring the self-respect of the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Due Diligence Framework */}
      <section className={styles.vettingSection}>
        <div className="container">
          <div className={styles.vettingBox}>
            <div className={styles.vettingHeader}>
              <span className={styles.subHeading}>The DonateHub Standard</span>
              <h2 className={styles.sectionTitle}>How We Verify Every NGO</h2>
              <p className={styles.vettingDesc}>
                Less than 18% of applying non-profits pass our rigorous review board. Here is how we safeguard your generosity:
              </p>
            </div>

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>01</span>
                <h4>Statutory & Tax Verification</h4>
                <p>Validation of 12A registration, Section 80G approval, PAN, Darpan NGO ID, and valid FCRA licenses (for foreign funding eligibility).</p>
              </div>

              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>02</span>
                <h4>Audited Financials</h4>
                <p>3 years of audited balance sheets, IT returns, and bank statements inspected for administrative expense caps under 15%.</p>
              </div>

              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>03</span>
                <h4>On-Ground Field Audits</h4>
                <p>Unannounced site visits by our local field investigators to verify actual beneficiaries, staff presence, and operational legitimacy.</p>
              </div>

              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>04</span>
                <h4>Quarterly Impact Audits</h4>
                <p>Continuous monitoring via geo-tagged imagery, biometric beneficiary attendance, and verifiable supplier invoices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax benefits */}
      <section className={styles.taxSection}>
        <div className="container">
          <div className={styles.taxBanner}>
            <div className={styles.taxContent}>
              <div className={styles.taxBadge}>Tax Benefit Under Indian Law</div>
              <h3>Section 80G Tax Exemption on Every Rupee</h3>
              <p>
                All financial donations made on DonateHub to verified partner organizations qualify for 50% deduction under Section 80G of the Income Tax Act, 1961. Automated 10BE compliant receipts are instantly generated upon payment.
              </p>
            </div>
            <Link href="/campaigns" className="btn btn-primary btn-lg">
              Explore Verified Campaigns <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2>Ready to make an impact you can see?</h2>
          <p>Join thousands of donors who give with total confidence across India.</p>
          <div className={styles.ctaButtons}>
            <Link href="/campaigns" className="btn btn-primary btn-lg">Browse Campaigns</Link>
            <Link href="/register?role=ngo" className="btn btn-secondary btn-lg">Register as an NGO</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
