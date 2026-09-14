'use client';

import { useAuth } from '@/context/AuthContext';
import { mockCampaigns, formatCurrency, getProgress, getDaysLeft } from '@/lib/mockData';
import {
  Plus, TrendingUp, Users, Target, Clock, Eye, Edit3, Bell, CheckCircle, BarChart3
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function NGOPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formGoal, setFormGoal] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDeadline, setFormDeadline] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
    if (!isLoading && user && user.role !== 'ngo' && user.role !== 'admin') router.push('/');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}>
      <div style={{ width:40,height:40,borderRadius:'50%',border:'3px solid #2A2C46',borderTopColor:'#6C63FF',animation:'spin-slow 0.8s linear infinite' }} />
    </div>;
  }

  const myCampaigns = mockCampaigns.slice(0, 3);
  const totalRaised = myCampaigns.reduce((s, c) => s + c.raisedAmount, 0);
  const totalDonors = myCampaigns.reduce((s, c) => s + c.donorCount, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
    setTimeout(() => { setShowCreateModal(false); setCreated(false); }, 2000);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>NGO <span className="gradient-text">Portal</span></h1>
            <p className={styles.subtitle}>Manage your campaigns and track your impact</p>
          </div>
          <button
            id="ngo-create-campaign"
            className="btn btn-primary btn-lg"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} /> Create Campaign
          </button>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { label: 'Total Raised', value: formatCurrency(totalRaised), icon: TrendingUp, color: '#6C63FF' },
            { label: 'Total Donors', value: totalDonors.toLocaleString(), icon: Users, color: '#FF6B8A' },
            { label: 'Active Campaigns', value: myCampaigns.length, icon: Target, color: '#43E8C5' },
            { label: 'Avg. Goal Completion', value: `${Math.round(myCampaigns.reduce((s,c) => s + getProgress(c.raisedAmount, c.goalAmount), 0) / myCampaigns.length)}%`, icon: BarChart3, color: '#FFB830' },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: `${s.color}15`, color: s.color }}>
                <s.icon size={20} />
              </div>
              <div>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Campaigns */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Campaigns</h2>
          <div className={styles.campaignList}>
            {myCampaigns.map(c => {
              const prog = getProgress(c.raisedAmount, c.goalAmount);
              const days = getDaysLeft(c.deadline);
              return (
                <div key={c.id} className={styles.campCard}>
                  <div className={styles.campTop}>
                    <div className={styles.campInfo}>
                      <span className={`badge ${c.status === 'urgent' ? 'badge-danger' : 'badge-success'}`}>{c.status}</span>
                      <h3 className={styles.campTitle}>{c.title}</h3>
                      <p className={styles.campDesc}>{c.shortDesc}</p>
                    </div>
                  </div>

                  <div className={styles.campProgress}>
                    <div className={styles.campProgressHeader}>
                      <span className={styles.campRaised}>{formatCurrency(c.raisedAmount)}</span>
                      <span className={styles.campPct}>{prog}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${prog}%` }} />
                    </div>
                    <div className={styles.campProgressFooter}>
                      <span>Goal: {formatCurrency(c.goalAmount)}</span>
                    </div>
                  </div>

                  <div className={styles.campStats}>
                    <div className={styles.campStat}><Users size={13} /> {c.donorCount.toLocaleString()} donors</div>
                    <div className={styles.campStat}><Clock size={13} /> {days}d left</div>
                  </div>

                  <div className={styles.campActions}>
                    <Link href={`/campaigns/${c.slug}`} id={`ngo-view-${c.id}`} className="btn btn-secondary btn-sm">
                      <Eye size={13} /> View
                    </Link>
                    <button id={`ngo-edit-${c.id}`} className="btn btn-outline btn-sm">
                      <Edit3 size={13} /> Edit
                    </button>
                    <button id={`ngo-update-${c.id}`} className="btn btn-primary btn-sm">
                      <Bell size={13} /> Post Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            {created ? (
              <div className={styles.modalSuccess}>
                <CheckCircle size={48} className={styles.modalSuccessIcon} />
                <h3>Campaign Submitted!</h3>
                <p>Under review by our admin team. You&apos;ll be notified within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className={styles.modalTitle}>Create New Campaign</h2>
                <form onSubmit={handleCreate} id="ngo-create-form" className={styles.modalForm}>
                  <div className="form-group">
                    <label htmlFor="ngo-camp-title" className="label">Campaign Title</label>
                    <input id="ngo-camp-title" type="text" className="input" placeholder="e.g. Build Schools in Assam" value={formTitle} onChange={e => setFormTitle(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ngo-camp-goal" className="label">Funding Goal (₹)</label>
                    <input id="ngo-camp-goal" type="number" className="input" placeholder="e.g. 500000" value={formGoal} onChange={e => setFormGoal(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ngo-camp-deadline" className="label">Campaign Deadline</label>
                    <input id="ngo-camp-deadline" type="date" className="input" value={formDeadline} onChange={e => setFormDeadline(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ngo-camp-desc" className="label">Description</label>
                    <textarea id="ngo-camp-desc" className="input" rows={4} placeholder="Describe your campaign and how funds will be used..." value={formDesc} onChange={e => setFormDesc(e.target.value)} required />
                  </div>
                  <div className={styles.modalActions}>
                    <button type="button" id="ngo-cancel-create" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                    <button type="submit" id="ngo-submit-create" className="btn btn-primary">Submit for Review</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
