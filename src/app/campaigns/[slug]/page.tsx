'use client';

import { useParams } from 'next/navigation';
import { mockCampaigns, formatCurrency, getProgress, getDaysLeft } from '@/lib/mockData';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Clock, Users, MapPin, ShieldCheck, AlertTriangle,
  Share2, Heart, TrendingUp, Package, Bell, CheckCircle, Calendar
} from 'lucide-react';
import styles from './page.module.css';

export default function CampaignDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const campaign = mockCampaigns.find(c => c.slug === slug);

  if (!campaign) {
    return (
      <div className={styles.notFound}>
        <h2>Campaign not found</h2>
        <Link href="/campaigns" className="btn btn-primary">Browse Campaigns</Link>
      </div>
    );
  }

  const progress = getProgress(campaign.raisedAmount, campaign.goalAmount);
  const daysLeft = getDaysLeft(campaign.deadline);

  return (
    <div className={styles.page}>
      {/* Back */}
      <div className={styles.backBar}>
        <div className="container">
          <Link href="/campaigns" id="campaign-back" className={styles.backLink}>
            <ArrowLeft size={16} /> All Campaigns
          </Link>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Left: Main content */}
          <div className={styles.main}>
            {/* Header */}
            <div className={styles.header}>
              {campaign.status === 'urgent' && (
                <div className={styles.urgentBar}>
                  <AlertTriangle size={16} /> URGENT — This campaign needs immediate support!
                </div>
              )}

              <div className={styles.metaRow}>
                <span className="badge badge-primary">{campaign.category}</span>
                <span className={styles.location}><MapPin size={13} /> {campaign.location}</span>
                {campaign.ngoVerified && (
                  <span className={styles.verified}><ShieldCheck size={13} /> Verified NGO</span>
                )}
              </div>

              <h1 className={styles.title}>{campaign.title}</h1>
              <div className={styles.ngoRow}>
                By <strong>{campaign.ngoName}</strong>
              </div>
            </div>

            {/* Campaign image */}
            <div className={styles.imagePlaceholder}>
              {campaign.image && (
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              )}
              <div className={styles.imageInner}>
                <span className={styles.imageCat}>{campaign.category}</span>
                <div className={styles.imageGradientText}>{campaign.ngoName}</div>
              </div>
            </div>

            {/* Description */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>About this Campaign</h2>
              <p className={styles.description}>{campaign.description}</p>
              <div className={styles.tagsRow}>
                {campaign.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            {/* Fund Usage */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <TrendingUp size={18} /> How Your Funds Are Used
              </h2>
              <div className={styles.fundUsage}>
                {campaign.fundUsage.map(f => (
                  <div key={f.label} className={styles.fundItem}>
                    <div className={styles.fundHeader}>
                      <span className={styles.fundLabel}>{f.label}</span>
                      <span className={styles.fundPercent}>{f.percentage}%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${f.percentage}%`, background: f.color }}
                      />
                    </div>
                    <div className={styles.fundAmount}>{formatCurrency(f.amount)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Updates */}
            {campaign.updates.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Bell size={18} /> Campaign Updates
                </h2>
                <div className={styles.updates}>
                  {campaign.updates.map((u, i) => (
                    <div key={i} className={styles.update}>
                      <div className={styles.updateDot} />
                      <div className={styles.updateContent}>
                        <div className={styles.updateDate}>
                          <Calendar size={12} /> {new Date(u.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h4 className={styles.updateTitle}>{u.title}</h4>
                        <p className={styles.updateDesc}>{u.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item Donations */}
            {campaign.itemDonations && campaign.itemDonations.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Package size={18} /> Item Donations Needed
                </h2>
                <div className={styles.itemGrid}>
                  {campaign.itemDonations.map(item => (
                    <div key={item.id} className={styles.itemCard}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemName}>{item.item}</span>
                        <span className={`badge ${
                          item.status === 'delivered' ? 'badge-success' :
                          item.status === 'pledged' ? 'badge-warning' : 'badge-primary'
                        }`}>
                          {item.status === 'delivered' && <CheckCircle size={10} />}
                          {item.status}
                        </span>
                      </div>
                      <div className={styles.itemQty}>{item.quantity.toLocaleString()} {item.unit}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Donation sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.donationCard}>
              {/* Progress */}
              <div className={styles.progressArea}>
                <div className={styles.raisedRow}>
                  <span className={styles.raised}>{formatCurrency(campaign.raisedAmount)}</span>
                  <span className={styles.progressPct}>{progress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className={styles.goalRow}>
                  <span>Goal: {formatCurrency(campaign.goalAmount)}</span>
                  <span className={daysLeft <= 7 ? styles.urgent : ''}>{daysLeft}d left</span>
                </div>
              </div>

              <div className={styles.quickStats}>
                <div className={styles.quickStat}>
                  <Users size={16} />
                  <div>
                    <div className={styles.quickStatValue}>{campaign.donorCount.toLocaleString()}</div>
                    <div className={styles.quickStatLabel}>Donors</div>
                  </div>
                </div>
                <div className={styles.quickStat}>
                  <Clock size={16} />
                  <div>
                    <div className={styles.quickStatValue}>{daysLeft}</div>
                    <div className={styles.quickStatLabel}>Days Left</div>
                  </div>
                </div>
              </div>

              {/* Donate CTA */}
              <Link
                href={`/donate?campaign=${campaign.id}`}
                id="campaign-donate-btn"
                className={`btn btn-primary btn-lg ${styles.donateBtn}`}
              >
                <Heart size={18} fill="currentColor" />
                Donate Now
              </Link>

              <div className={styles.shareRow}>
                <button id="campaign-share" className={`btn btn-secondary ${styles.shareBtn}`}>
                  <Share2 size={15} /> Share Campaign
                </button>
                <button id="campaign-wishlist" className={`btn btn-outline ${styles.wishlistBtn}`}>
                  <Heart size={15} /> Save
                </button>
              </div>

              <div className={styles.taxNote}>
                <CheckCircle size={14} /> 80G Tax Exemption Certificate provided
              </div>
            </div>

            {/* Recent Donors placeholder */}
            <div className={styles.recentDonors}>
              <h3 className={styles.recentTitle}>Recent Supporters</h3>
              {[
                { name: 'Rahul M.', amount: 5000, time: '2h ago' },
                { name: 'Anonymous', amount: 2000, time: '5h ago' },
                { name: 'Sunita K.', amount: 10000, time: '1d ago' },
                { name: 'Vikram P.', amount: 1000, time: '1d ago' },
              ].map((d, i) => (
                <div key={i} className={styles.recentDonor}>
                  <div className={styles.donorAvatar}>{d.name[0]}</div>
                  <div className={styles.donorInfo}>
                    <span className={styles.donorName}>{d.name}</span>
                    <span className={styles.donorTime}>{d.time}</span>
                  </div>
                  <span className={styles.donorAmount}>{formatCurrency(d.amount)}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
