import Link from 'next/link';
import { Compass, Home, Search, Heart, ArrowRight } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconCircle}>
          <Compass size={40} className={styles.icon} />
        </div>
        <span className={styles.errorCode}>404 — Page Not Found</span>
        <h1 className={styles.title}>Looking for a Cause?</h1>
        <p className={styles.subtitle}>
          The page or campaign you were looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back to making an impact.
        </p>

        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Return to Home
          </Link>
          <Link href="/campaigns" className="btn btn-secondary btn-lg">
            <Search size={18} /> Browse Campaigns
          </Link>
        </div>

        <div className={styles.helpfulLinks}>
          <span className={styles.helpfulTitle}>Popular Destinations:</span>
          <div className={styles.linkPills}>
            <Link href="/donate" className={styles.pill}>Make a Donation</Link>
            <Link href="/transparency" className={styles.pill}>Public Audit Ledger</Link>
            <Link href="/about" className={styles.pill}>About Us</Link>
            <Link href="/terms" className={styles.pill}>Terms of Service</Link>
            <Link href="/refund" className={styles.pill}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
