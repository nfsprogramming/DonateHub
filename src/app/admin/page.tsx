'use client';

import { useAuth } from '@/context/AuthContext';
import { mockCampaigns, mockTransactions, mockUsers, formatCurrency } from '@/lib/mockData';
import {
  Users, Flag, DollarSign, AlertTriangle, CheckCircle, XCircle,
  Shield, TrendingUp, Eye, Ban, RefreshCw, BarChart3
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const TABS = ['Overview', 'Campaigns', 'Users', 'Transactions', 'Reports'];

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('Overview');
  const [campaignFilter, setCampaignFilter] = useState('all');

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
    if (!isLoading && user && user.role !== 'admin') router.push('/');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}>
      <div style={{ width:40,height:40,borderRadius:'50%',border:'3px solid #2A2C46',borderTopColor:'#6C63FF',animation:'spin-slow 0.8s linear infinite' }} />
    </div>;
  }

  const totalRaised = mockCampaigns.reduce((s, c) => s + c.raisedAmount, 0);
  const totalDonors = mockUsers.filter(u => u.role === 'donor').length;
  const pendingCampaigns = mockCampaigns.filter(c => c.status === 'pending').length;
  const failedTxns = mockTransactions.filter(t => t.status === 'failed').length;

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sideHeader}>
          <Shield size={18} /> Admin Panel
        </div>
        <nav className={styles.sideNav}>
          {TABS.map(t => (
            <button
              key={t}
              id={`admin-tab-${t.toLowerCase()}`}
              className={`${styles.sideItem} ${tab === t ? styles.sideItemActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'Overview' && <BarChart3 size={16} />}
              {t === 'Campaigns' && <Flag size={16} />}
              {t === 'Users' && <Users size={16} />}
              {t === 'Transactions' && <DollarSign size={16} />}
              {t === 'Reports' && <TrendingUp size={16} />}
              {t}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>{tab}</h1>
          <div className={styles.adminBadge}><Shield size={14} /> Administrator</div>
        </div>

        {/* ── Overview ── */}
        {tab === 'Overview' && (
          <div className={styles.overview}>
            <div className={styles.overviewStats}>
              {[
                { label: 'Total Raised', value: formatCurrency(totalRaised), icon: DollarSign, color: '#6C63FF' },
                { label: 'Total Users', value: mockUsers.length, icon: Users, color: '#43E8C5' },
                { label: 'Active Campaigns', value: mockCampaigns.filter(c => c.status === 'active' || c.status === 'urgent').length, icon: Flag, color: '#FFB830' },
                { label: 'Failed Transactions', value: failedTxns, icon: AlertTriangle, color: '#FF5050' },
              ].map(s => (
                <div key={s.label} className={styles.overviewStat}>
                  <div className={styles.overviewStatIcon} style={{ background: `${s.color}15`, color: s.color }}>
                    <s.icon size={20} />
                  </div>
                  <div>
                    <div className={styles.overviewStatValue}>{s.value}</div>
                    <div className={styles.overviewStatLabel}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.overviewAlerts}>
              <h3 className={styles.alertsTitle}>⚠️ Requires Attention</h3>
              {failedTxns > 0 && (
                <div className={styles.alert}>
                  <AlertTriangle size={16} className={styles.alertIcon} />
                  <span>{failedTxns} failed transactions need review</span>
                  <button id="admin-review-txns" className="btn btn-danger btn-sm" onClick={() => setTab('Transactions')}>Review</button>
                </div>
              )}
              {pendingCampaigns > 0 && (
                <div className={styles.alert}>
                  <Flag size={16} className={styles.alertIcon} />
                  <span>{pendingCampaigns} campaigns pending approval</span>
                  <button id="admin-review-campaigns" className="btn btn-warning btn-sm" onClick={() => setTab('Campaigns')}>Approve</button>
                </div>
              )}
              {failedTxns === 0 && pendingCampaigns === 0 && (
                <div className={styles.allGood}><CheckCircle size={16} /> All systems normal</div>
              )}
            </div>

            {/* Recent Transactions */}
            <div className={styles.recentTxns}>
              <h3 className={styles.alertsTitle}>Recent Transactions</h3>
              <div className={styles.txnTable}>
                <div className={styles.txnHeader}>
                  <span>ID</span><span>Campaign</span><span>Amount</span><span>Gateway</span><span>Status</span><span>Date</span>
                </div>
                {mockTransactions.slice(0, 5).map(t => (
                  <div key={t.id} className={styles.txnRow}>
                    <span className={styles.txnId}>{t.id.toUpperCase()}</span>
                    <span className={styles.txnCamp}>{mockCampaigns.find(c => c.id === t.campaignId)?.title.slice(0, 20) ?? '—'}...</span>
                    <span className={styles.txnAmt}>{formatCurrency(t.amount)}</span>
                    <span className={styles.txnGw}>{t.gateway}</span>
                    <span className={`badge ${t.status === 'success' ? 'badge-success' : t.status === 'failed' ? 'badge-danger' : 'badge-warning'}`}>
                      {t.status}
                    </span>
                    <span className={styles.txnDate}>{t.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Campaigns ── */}
        {tab === 'Campaigns' && (
          <div className={styles.tabContent}>
            <div className={styles.filterRow}>
              {['all', 'active', 'urgent', 'completed', 'pending'].map(f => (
                <button
                  key={f}
                  id={`admin-camp-filter-${f}`}
                  className={`${styles.filterBtn} ${campaignFilter === f ? styles.filterBtnActive : ''}`}
                  onClick={() => setCampaignFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className={styles.campaignTable}>
              {mockCampaigns
                .filter(c => campaignFilter === 'all' || c.status === campaignFilter)
                .map(c => (
                  <div key={c.id} className={styles.campRow}>
                    <div className={styles.campInfo}>
                      <div className={styles.campName}>{c.title}</div>
                      <div className={styles.campNgo}>{c.ngoName} · {c.location}</div>
                    </div>
                    <div className={styles.campStats}>
                      <span>{formatCurrency(c.raisedAmount)}</span>
                      <span className={`badge ${c.status === 'urgent' ? 'badge-danger' : c.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span>
                    </div>
                    <div className={styles.campActions}>
                      <Link href={`/campaigns/${c.slug}`} id={`admin-view-camp-${c.id}`} className="btn btn-secondary btn-sm">
                        <Eye size={13} />
                      </Link>
                      <button id={`admin-approve-camp-${c.id}`} className="btn btn-outline btn-sm">
                        <CheckCircle size={13} /> Approve
                      </button>
                      <button id={`admin-suspend-camp-${c.id}`} className="btn btn-danger btn-sm">
                        <Ban size={13} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {tab === 'Users' && (
          <div className={styles.tabContent}>
            <div className={styles.userTable}>
              {mockUsers.map(u => (
                <div key={u.id} className={styles.userRow}>
                  <div className={styles.userAvatar}>{u.avatar}</div>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{u.name}</div>
                    <div className={styles.userEmail}>{u.email}</div>
                  </div>
                  <span className={`badge ${u.role === 'admin' ? 'badge-danger' : u.role === 'ngo' ? 'badge-warning' : 'badge-primary'}`}>
                    {u.role}
                  </span>
                  <div className={styles.userActions}>
                    <button id={`admin-view-user-${u.id}`} className="btn btn-secondary btn-sm"><Eye size={13} /></button>
                    <button id={`admin-suspend-user-${u.id}`} className="btn btn-danger btn-sm"><Ban size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Transactions ── */}
        {tab === 'Transactions' && (
          <div className={styles.tabContent}>
            <div className={styles.txnTableFull}>
              <div className={styles.txnHeader}>
                <span>ID</span><span>Campaign</span><span>Amount</span><span>Gateway</span><span>Status</span><span>Date</span><span>Action</span>
              </div>
              {mockTransactions.map(t => (
                <div key={t.id} className={styles.txnRow}>
                  <span className={styles.txnId}>{t.id.toUpperCase()}</span>
                  <span className={styles.txnCamp}>{mockCampaigns.find(c => c.id === t.campaignId)?.title.slice(0, 18) ?? '—'}...</span>
                  <span className={styles.txnAmt}>{formatCurrency(t.amount)}</span>
                  <span className={styles.txnGw}>{t.gateway}</span>
                  <span className={`badge ${t.status === 'success' ? 'badge-success' : t.status === 'failed' ? 'badge-danger' : 'badge-warning'}`}>{t.status}</span>
                  <span className={styles.txnDate}>{t.createdAt}</span>
                  <button id={`admin-retry-txn-${t.id}`} className="btn btn-secondary btn-sm">
                    {t.status === 'failed' ? <><RefreshCw size={12} /> Retry</> : <Eye size={12} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Reports ── */}
        {tab === 'Reports' && (
          <div className={styles.tabContent}>
            <div className={styles.reportsGrid}>
              {[
                { title: 'Monthly Donation Report', desc: 'April 2026 complete breakdown', icon: '📊' },
                { title: 'NGO Performance Report', desc: 'Campaign completion rates & fund utilization', icon: '🏢' },
                { title: 'Fraud Detection Log', desc: '0 suspicious activities detected this month', icon: '🔒' },
                { title: 'Tax Compliance Report', desc: '80G certificates issued: 94,320', icon: '📋' },
              ].map(r => (
                <div key={r.title} className={styles.reportCard}>
                  <span className={styles.reportIcon}>{r.icon}</span>
                  <div>
                    <div className={styles.reportTitle}>{r.title}</div>
                    <div className={styles.reportDesc}>{r.desc}</div>
                  </div>
                  <button id={`admin-download-${r.title.toLowerCase().replace(/\s+/g, '-')}`} className="btn btn-secondary btn-sm">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
