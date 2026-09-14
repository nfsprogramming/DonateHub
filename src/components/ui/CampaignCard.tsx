'use client';

import { Campaign } from '@/lib/types';
import { formatCurrency, getProgress, getDaysLeft } from '@/lib/mockData';
import { Clock, Users, MapPin, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './CampaignCard.module.css';

interface Props {
  campaign: Campaign;
  className?: string;
}

export function CampaignCard({ campaign, className = '' }: Props) {
  const [imgError, setImgError] = useState(false);
  const progress = getProgress(campaign.raisedAmount, campaign.goalAmount);
  const daysLeft = getDaysLeft(campaign.deadline);
  const isUrgent = campaign.status === 'urgent';

  return (
    <Link
      href={`/campaigns/${campaign.slug}`}
      id={`campaign-card-${campaign.id}`}
      className={`${styles.card} ${className} ${isUrgent ? styles.urgent : ''}`}
    >
      {/* Image */}
      <div className={styles.imageWrapper}>
        {!imgError && campaign.image ? (
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.campaignImg}
            onError={() => setImgError(true)}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.imageBg} />
        )}
        <div className={styles.imageOverlay}>
          <div className={styles.badgeRow}>
            {campaign.ngoVerified && (
              <span className={styles.verifiedBadge}>
                <ShieldCheck size={11} /> Verified
              </span>
            )}
            {isUrgent && (
              <span className={styles.urgentBadge}>
                <AlertTriangle size={10} /> URGENT
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {/* Category + Location */}
        <div className={styles.meta}>
          <span className={styles.category}>{campaign.category}</span>
          <span className={styles.location}><MapPin size={11} /> {campaign.location}</span>
        </div>

        {/* Title */}
        <h3 className={styles.title}>{campaign.title}</h3>

        {/* NGO */}
        <div className={styles.ngo}>{campaign.ngoName}</div>

        {/* Progress */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.raised}>{formatCurrency(campaign.raisedAmount)}</span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.progressFooter}>
            <span className={styles.goal}>of {formatCurrency(campaign.goalAmount)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <Users size={13} />
            <span>{campaign.donorCount.toLocaleString()} donors</span>
          </div>
          <div className={`${styles.stat} ${daysLeft <= 7 ? styles.statUrgent : ''}`}>
            <Clock size={13} />
            <span>{daysLeft === 0 ? 'Ended' : `${daysLeft}d left`}</span>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <span className={styles.donateBtn}>Donate Now</span>
        </div>
      </div>
    </Link>
  );
}
