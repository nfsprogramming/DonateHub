'use client';

import { useAuth } from '@/context/AuthContext';
import { mockDonations, mockCampaigns, formatCurrency, getProgress } from '@/lib/mockData';
import { Heart, TrendingUp, Calendar, Download, ExternalLink, RefreshCw, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
    if (!isLoading && user && user.role !== 'donor') {
      if (user.role === 'admin') router.push('/admin');
      if (user.role === 'ngo') router.push('/ngo');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  const donations = mockDonations.filter(d => d.donorId === user.id);
  const totalDonated = donations.reduce((s, d) => s + d.amount, 0);
  const campaigns = mockCampaigns.slice(0, 3);
  const wishlistCampaigns = mockCampaigns.filter(c => user.wishlist?.includes(c.id));

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Welcome */}
        <div className={styles.welcome}>
          <div className={styles.welcomeAvatar}>{user.avatar}</div>
          <div>
            <h1 className={styles.welcomeTitle}>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p className={styles.welcomeSub}>Here&apos;s your impact summary</p>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(108,99,255,0.12)', color: '#6C63FF' }}>
              <Heart size={20} />
            </div>
            <div>
              <div className={styles.statValue}>{formatCurrency(totalDonated)}</div>
              <div className={styles.statLabel}>Total Donated</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(67,232,197,0.12)', color: '#43E8C5' }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <div className={styles.statValue}>{donations.length}</div>
              <div className={styles.statLabel}>Campaigns Supported</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(255,184,48,0.12)', color: '#FFB830' }}>
              <RefreshCw size={20} />
            </div>
            <div>
              <div className={styles.statValue}>{donations.filter(d => d.frequency === 'monthly').length}</div>
              <div className={styles.statLabel}>Monthly Recurring</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(255,107,138,0.12)', color: '#FF6B8A' }}>
              <Heart size={20} />
            </div>
            <div>
              <div className={styles.statValue}>{user.wishlist?.length ?? 0}</div>
              <div className={styles.statLabel}>Wishlist Campaigns</div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {/* Donation History */}
          <div className={styles.mainSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Donation History</h2>
              <Link href="/donate" id="dashboard-donate-more" className="btn btn-primary btn-sm">
                <Heart size={14} /> Donate More
              </Link>
            </div>

            {donations.length === 0 ? (
              <div className={styles.empty}>
                <span>🌱</span>
                <p>No donations yet. Start making an impact today!</p>
                <Link href="/campaigns" className="btn btn-primary">Browse Campaigns</Link>
              </div>
            ) : (
              <div className={styles.donationList}>
                {donations.map(d => (
                  <div key={d.id} className={styles.donationRow}>
                    <div className={styles.donationIcon}>
                      {d.frequency === 'monthly' ? <RefreshCw size={16} /> : <Heart size={16} />}
                    </div>
                    <div className={styles.donationInfo}>
                      <div className={styles.donationCampaign}>{d.campaignTitle}</div>
                      <div className={styles.donationMeta}>
                        <Calendar size={12} /> {new Date(d.createdAt).toLocaleDateString('en-IN')}
                        &nbsp;·&nbsp; {d.paymentMethod}
                        &nbsp;·&nbsp; {d.frequency === 'monthly' ? '🔄 Monthly' : 'One-time'}
                        &nbsp;·&nbsp; Receipt: {d.receiptId}
                      </div>
                    </div>
                    <div className={styles.donationRight}>
                      <div className={styles.donationAmount}>{formatCurrency(d.amount)}</div>
                      <div className={styles.donationActions}>
                        <button id={`dashboard-receipt-${d.id}`} className="btn btn-secondary btn-sm">
                          <Download size={12} /> Receipt
                        </button>
                        <Link href={`/campaigns/${mockCampaigns.find(c => c.id === d.campaignId)?.slug ?? ''}`} id={`dashboard-view-${d.id}`} className="btn btn-outline btn-sm">
                          <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Wishlist + Recommended */}
          <aside className={styles.sidebar}>
            {/* Wishlist */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>❤️ My Wishlist</h3>
              {wishlistCampaigns.length === 0 ? (
                <p className={styles.sideEmpty}>Save campaigns to donate later</p>
              ) : (
                <div className={styles.wishlistItems}>
                  {wishlistCampaigns.map(c => (
                    <Link key={c.id} href={`/campaigns/${c.slug}`} id={`dashboard-wishlist-${c.id}`} className={styles.wishlistItem}>
                      <div>
                        <div className={styles.wishlistTitle}>{c.title}</div>
                        <div className="progress-track" style={{ marginTop: '6px' }}>
                          <div className="progress-fill" style={{ width: `${getProgress(c.raisedAmount, c.goalAmount)}%` }} />
                        </div>
                      </div>
                      <ArrowRight size={14} className={styles.wishlistArrow} />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>✨ Recommended for You</h3>
              <div className={styles.recommendedItems}>
                {campaigns.map(c => (
                  <Link key={c.id} href={`/campaigns/${c.slug}`} id={`dashboard-rec-${c.id}`} className={styles.recommendedItem}>
                    <div className={styles.recContent}>
                      <div className={styles.recCat}>{c.category}</div>
                      <div className={styles.recTitle}>{c.title}</div>
                      <div className={styles.recMeta}>{formatCurrency(c.raisedAmount)} raised · {getProgress(c.raisedAmount, c.goalAmount)}%</div>
                    </div>
                    <ArrowRight size={14} className={styles.wishlistArrow} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
