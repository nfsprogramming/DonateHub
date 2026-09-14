import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const links = {
  platform: [
    { href: '/campaigns', label: 'Browse Campaigns' },
    { href: '/donate', label: 'Donate Now' },
    { href: '/transparency', label: 'Transparency' },
    { href: '/ngo', label: 'NGO Portal' },
  ],
  causes: [
    { href: '/campaigns?category=Education', label: 'Education' },
    { href: '/campaigns?category=Healthcare', label: 'Healthcare' },
    { href: '/campaigns?category=Disaster+Relief', label: 'Disaster Relief' },
    { href: '/campaigns?category=Environment', label: 'Environment' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/refund', label: 'Refund Policy' },
  ],
};

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.main}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}><Heart size={16} fill="currentColor" /></span>
              <span className={styles.logoText}>Donate<span className={styles.logoAccent}>Hub</span></span>
            </Link>
            <p className={styles.tagline}>
              Every rupee tracked. Every impact counted. Building trust between donors and NGOs through radical transparency.
            </p>
            <div className={styles.newsletter}>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Get impact updates"
                className={styles.newsletterInput}
              />
              <button id="footer-newsletter-submit" className={styles.newsletterBtn} aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Links */}
          <div className={styles.linksGrid}>
            {Object.entries(links).map(([group, items]) => (
              <div key={group} className={styles.linkGroup}>
                <h4 className={styles.linkGroupTitle}>{group.charAt(0).toUpperCase() + group.slice(1)}</h4>
                <ul className={styles.linkList}>
                  {items.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.link}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <h4 className={styles.linkGroupTitle}>Contact</h4>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}><Mail size={14} /> hello@donatehub.in</div>
              <div className={styles.contactItem}><Phone size={14} /> +91 98765 43210</div>
              <div className={styles.contactItem}><MapPin size={14} /> Bengaluru, India</div>
            </div>
            <div className={styles.certBadge}>
              <span className={styles.certDot} />
              FCRA Registered · 80G Tax Exempt
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © 2026 DonateHub. Made with <Heart size={12} fill="currentColor" className={styles.heartIcon} /> in India.
          </span>
          <span className={styles.trust}>Secured · Transparent · Trusted</span>
        </div>
      </div>
    </footer>
  );
}
