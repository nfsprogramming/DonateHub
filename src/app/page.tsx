'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CampaignCard } from '@/components/ui/CampaignCard';
import { mockCampaigns, mockStats, formatCurrency, formatNumber } from '@/lib/mockData';
import {
  Heart, ArrowRight, ShieldCheck, TrendingUp, Zap, Globe,
  Star, ChevronRight, AlertTriangle, BookOpen, Stethoscope,
  CloudRain, Leaf, UtensilsCrossed, Users, PawPrint, Baby, Eye, Lock
} from 'lucide-react';
import styles from './page.module.css';

/* ── Animate‑once counter ── */
function CountUp({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const startTime = Date.now();
        const step = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  const display = count >= 10000000 ? `${(count / 10000000).toFixed(1)}Cr` :
    count >= 100000 ? `${(count / 100000).toFixed(1)}L` :
    count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString('en-IN');

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const urgentCampaigns = mockCampaigns.filter(c => c.status === 'urgent');
const featuredCampaigns = mockCampaigns.slice(0, 4);

const trustItems = [
  { icon: ShieldCheck, text: 'FCRA Verified NGOs' },
  { icon: Lock, text: '80G Tax Receipts' },
  { icon: Eye, text: 'End-to-End Tracking' },
  { icon: Lock, text: 'Secure Payments' },
  { icon: ShieldCheck, text: 'Verified Campaigns' },
];

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified NGOs',
    desc: 'Every NGO is background-checked, FCRA-registered, and regularly audited before listing campaigns.',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Transparency',
    desc: 'Every rupee is tracked. See exactly how funds are used with live updates and fund allocation charts.',
  },
  {
    icon: Zap,
    title: 'Instant Impact',
    desc: 'Donations are disbursed within 48 hours. Emergency campaigns get priority same-day transfer.',
  },
  {
    icon: Globe,
    title: 'Pan-India Reach',
    desc: 'Support causes across all 28 states. Location-based discovery helps you find nearby impact.',
  },
];

const testimonials = [
  {
    name: 'Meera Krishnan',
    role: 'Regular Donor',
    text: 'DonateHub is the only platform where I can actually see where my money goes. The transparency dashboard gives me peace of mind.',
    avatar: 'MK',
    stars: 5,
  },
  {
    name: 'Dr. Anand Rao',
    role: 'NGO Director, HealIndia Trust',
    text: 'Since joining DonateHub, our donor base grew 3x. The verified badge and transparent reporting builds instant trust.',
    avatar: 'AR',
    stars: 5,
  },
  {
    name: 'Sunita Joshi',
    role: 'Monthly Supporter',
    text: 'I love the recurring donation feature. My ₹500/month is now helping 3 children stay in school consistently.',
    avatar: 'SJ',
    stars: 5,
  },
];

const categories = [
  { name: 'Education', icon: BookOpen, count: 48 },
  { name: 'Healthcare', icon: Stethoscope, count: 62 },
  { name: 'Disaster Relief', icon: CloudRain, count: 21 },
  { name: 'Environment', icon: Leaf, count: 35 },
  { name: 'Food & Hunger', icon: UtensilsCrossed, count: 29 },
  { name: 'Women Empowerment', icon: Users, count: 18 },
  { name: 'Animal Welfare', icon: PawPrint, count: 14 },
  { name: 'Child Welfare', icon: Baby, count: 31 },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <ShieldCheck size={14} />
            <span>India&apos;s Most Transparent Donation Platform</span>
          </div>

          <h1 className={styles.heroTitle}>
            Give with <span className={styles.heroEmerald}>confidence.</span>
            <br />
            Impact with <span className={styles.heroGold}>clarity.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Connect with verified NGOs. Track every rupee.
            See the difference you make.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/campaigns" id="hero-browse-campaigns" className={`btn btn-primary btn-lg ${styles.heroCta1}`}>
              Browse Campaigns
              <ArrowRight size={16} />
            </Link>
            <Link href="/transparency" id="hero-how-it-works" className={`btn btn-secondary btn-lg`}>
              How It Works
            </Link>
          </div>

          {/* Live Impact Card */}
          <div className={styles.impactCard}>
            <div className={styles.impactHeader}>
              <span className={styles.impactDot} />
              <span className={styles.impactLabel}>LIVE IMPACT</span>
            </div>
            <div className={styles.impactStats}>
              <div className={styles.impactStat}>
                <span className={styles.impactValue}>
                  <CountUp end={mockStats.totalRaised} prefix="₹" />
                </span>
                <span className={styles.impactStatLabel}>raised</span>
              </div>
              <div className={styles.impactDivider} />
              <div className={styles.impactStat}>
                <span className={styles.impactValue}>
                  <CountUp end={mockStats.totalDonors} suffix="+" />
                </span>
                <span className={styles.impactStatLabel}>donors</span>
              </div>
              <div className={styles.impactDivider} />
              <div className={styles.impactStat}>
                <span className={styles.impactValue}>
                  <CountUp end={mockStats.activeCampaigns} />
                </span>
                <span className={styles.impactStatLabel}>campaigns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Strip ─── */}
      <section className={styles.trustStrip}>
        <div className="container">
          <div className={styles.trustGrid}>
            {trustItems.map(t => (
              <div key={t.text} className={styles.trustItem}>
                <t.icon size={16} className={styles.trustIcon} />
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Emergency Campaigns ─── */}
      {urgentCampaigns.length > 0 && (
        <section className={`section-sm ${styles.emergencySection}`}>
          <div className="container">
            <div className={styles.emergencyHeader}>
              <div className={styles.emergencyBadge}>
                <AlertTriangle size={14} />
                Urgent Help Needed
              </div>
              <span className={styles.emergencySubtitle}>These campaigns need immediate attention</span>
            </div>
            <div className={styles.emergencyGrid}>
              {urgentCampaigns.map(c => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Featured Campaigns ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Campaigns</h2>
              <p className={styles.sectionSubtitle}>Carefully vetted campaigns making real-world impact right now</p>
            </div>
            <Link href="/campaigns" id="home-view-all-campaigns" className={`btn btn-secondary`}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid-auto-fill">
            {featuredCampaigns.map(c => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Explore Causes ─── */}
      <section className={`section-sm ${styles.categoriesSection}`}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
            Explore Causes
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.centered}`}>
            Find campaigns that match your passion
          </p>
          <div className={styles.categoriesGrid}>
            {categories.map(cat => (
              <Link
                key={cat.name}
                href={`/campaigns?category=${encodeURIComponent(cat.name)}`}
                id={`cat-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={styles.categoryCard}
              >
                <span className={styles.categoryIcon}>
                  <cat.icon size={22} />
                </span>
                <span className={styles.categoryName}>{cat.name}</span>
                <span className={styles.categoryCount}>{cat.count} campaigns</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why DonateHub ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Why DonateHub?</h2>
              <p className={styles.sectionSubtitle}>Built on three pillars: Trust, Transparency, and Technology</p>
            </div>
          </div>
          <div className={styles.featuresGrid}>
            {features.map(f => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <f.icon size={22} />
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className={`section-sm ${styles.testimonialsSection}`}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
            Trusted by Thousands
          </h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map(t => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.stars}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#C99A3D" color="#C99A3D" />
                  ))}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="section-sm">
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerContent}>
              <h2 className={styles.ctaBannerTitle}>Ready to make a difference?</h2>
              <p className={styles.ctaBannerSubtitle}>
                Join {formatNumber(mockStats.totalDonors)}+ donors who are creating lasting change across India.
              </p>
              <div className={styles.ctaBannerBtns}>
                <Link href="/campaigns" id="cta-donate-now" className={`btn btn-primary btn-lg`}>
                  <Heart size={18} fill="currentColor" />
                  Start Donating
                </Link>
                <Link href="/register?role=ngo" id="cta-register-ngo" className={`btn btn-secondary btn-lg`}>
                  Register NGO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
