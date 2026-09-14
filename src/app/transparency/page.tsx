'use client';

import { mockCampaigns, mockStats, formatCurrency, getProgress, getDaysLeft } from '@/lib/mockData';
import { TrendingUp, PieChart, Clock, Shield, Eye, Download, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';
import { useState } from 'react';

// Aggregate fund usage across all campaigns
const globalFundUsage = [
  { label: 'Direct Beneficiary Programs', percentage: 72, color: '#059669', amount: 13348800 },
  { label: 'Field Logistics & Relief Goods', percentage: 14, color: '#0d9488', amount: 2595600 },
  { label: 'Emergency Reserve Fund', percentage: 8, color: '#d97706', amount: 1483200 },
  { label: 'NGO Verification & Audits', percentage: 4, color: '#64748b', amount: 741600 },
  { label: 'Payment Gateway & Platform', percentage: 2, color: '#94a3b8', amount: 370800 },
];

const monthlyData = [
  { month: 'Oct', amount: 1200000 },
  { month: 'Nov', amount: 1850000 },
  { month: 'Dec', amount: 2400000 },
  { month: 'Jan', amount: 3100000 },
  { month: 'Feb', amount: 4200000 },
  { month: 'Mar', amount: 5790000 },
];

const maxMonthly = Math.max(...monthlyData.map(d => d.amount));

export default function TransparencyPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <div className={styles.headerBadge}>
            <Eye size={14} /> Full Public Audit Trail
          </div>
          <h1 className={styles.title}>
            Radical <span className="gradient-text">Transparency</span>
          </h1>
          <p className={styles.subtitle}>
            Every rupee accounted for. Every NGO audited. Every milestone verified with verifiable invoices and on-ground reports.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Global Stats */}
        <div className={styles.globalStats}>
          {[
            { label: 'Total Mobilized', value: formatCurrency(mockStats.totalRaised), icon: '💰', color: '#059669' },
            { label: 'Direct to Cause', value: '94.2%', icon: '🎯', color: '#047857' },
            { label: 'Platform & Gateway', value: '2.0%', icon: '⚖️', color: '#d97706' },
            { label: 'Verified NGOs', value: (mockStats.ngosOnboarded ?? 847).toString(), icon: '🛡️', color: '#059669' },
            { label: 'Lives Impacted', value: '21L+', icon: '🇮🇳', color: '#0d9488' },
          ].map(s => (
            <div key={s.label} className={styles.globalStat} style={{ '--stat-color': s.color } as React.CSSProperties}>
              <span className={styles.globalStatIcon}>{s.icon}</span>
              <span className={styles.globalStatValue}>{s.value}</span>
              <span className={styles.globalStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.chartsRow}>
          {/* Fund Allocation Donut */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h2 className={styles.chartTitle}><PieChart size={18} /> Aggregate Fund Allocation</h2>
              <button id="transparency-download-report" className="btn btn-secondary btn-sm">
                <Download size={14} /> Download Audit
              </button>
            </div>

            <div className={styles.donutWrapper}>
              {/* SVG Donut chart */}
              <svg viewBox="0 0 200 200" className={styles.donut}>
                {(() => {
                  let offset = 0;
                  return globalFundUsage.map(f => {
                    const slice = (f.percentage / 100) * 2 * Math.PI * 70;
                    const gap = 2;
                    const el = (
                      <circle
                        key={f.label}
                        cx="100" cy="100" r="70"
                        fill="transparent"
                        stroke={f.color}
                        strokeWidth="28"
                        strokeDasharray={`${slice - gap} ${2 * Math.PI * 70 - slice + gap}`}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 100 100)"
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                      />
                    );
                    offset += slice;
                    return el;
                  });
                })()}
                <text x="100" y="96" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="800">94%</text>
                <text x="100" y="114" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">On-Ground Impact</text>
              </svg>

              <div className={styles.donutLegend}>
                {globalFundUsage.map(f => (
                  <div key={f.label} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: f.color }} />
                    <span className={styles.legendLabel}>{f.label}</span>
                    <span className={styles.legendPct}>{f.percentage}%</span>
                    <span className={styles.legendAmt}>{formatCurrency(f.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Growth Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h2 className={styles.chartTitle}><TrendingUp size={18} /> Monthly Mobilized Impact (FY 2025-26)</h2>
            </div>
            <div className={styles.barChart}>
              {monthlyData.map(d => {
                const h = (d.amount / maxMonthly) * 180;
                return (
                  <div key={d.month} className={styles.barGroup}>
                    <span className={styles.barValue}>{formatCurrency(d.amount)}</span>
                    <div className={styles.bar} style={{ height: `${h}px` }} />
                    <span className={styles.barLabel}>{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Campaign Breakdown */}
        <div className={styles.campaignBreakdown}>
          <div className={styles.breakdownHeader}>
            <h2 className={styles.chartTitle}><Shield size={18} /> Campaign-Level Transparency Ledger</h2>
            <p className={styles.breakdownSubtitle}>Click any campaign to inspect itemized budget allocations and audit logs</p>
          </div>

          {mockCampaigns.map(c => {
            const prog = getProgress(c.raisedAmount, c.goalAmount);
            const isOpen = expanded === c.id;
            return (
              <div key={c.id} className={styles.breakdownItem}>
                <button
                  id={`transparency-campaign-${c.id}`}
                  className={styles.breakdownToggle}
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.breakdownLeft}>
                    <div className={styles.breakdownName}>{c.title}</div>
                    <div className={styles.breakdownNgo}>{c.ngoName} · {c.location}</div>
                  </div>
                  <div className={styles.breakdownRight}>
                    <div className={styles.breakdownStats}>
                      <span className={styles.breakdownRaised}>{formatCurrency(c.raisedAmount)}</span>
                      <span className={styles.breakdownGoal}>of {formatCurrency(c.goalAmount)}</span>
                    </div>
                    <div className="progress-track" style={{ width: '120px' }}>
                      <div className="progress-fill" style={{ width: `${prog}%` }} />
                    </div>
                    <span className={styles.breakdownPct}>{prog}%</span>
                    <Clock size={14} className={styles.breakdownClock} />
                    <span className={styles.breakdownDays}>{getDaysLeft(c.deadline)}d left</span>
                  </div>
                </button>

                {isOpen && (
                  <div className={styles.breakdownDetail}>
                    <div className={styles.detailGrid}>
                      {c.fundUsage.map(f => (
                        <div key={f.label} className={styles.detailItem}>
                          <div className={styles.detailHeader}>
                            <span className={styles.detailDot} style={{ background: f.color }} />
                            <span className={styles.detailLabel}>{f.label}</span>
                            <span className={styles.detailPct}>{f.percentage}%</span>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${f.percentage}%`, background: f.color }} />
                          </div>
                          <span className={styles.detailAmt}>{formatCurrency(f.amount)}</span>
                        </div>
                      ))}
                    </div>
                    {c.updates.length > 0 && (
                      <div className={styles.detailUpdates}>
                        <div className={styles.detailUpdatesTitle}>Verified Milestone Update</div>
                        <div className={styles.detailUpdate}>
                          <strong>{c.updates[0].title}</strong> — {c.updates[0].description}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Audit note */}
        <div className={styles.auditNote}>
          <Shield size={24} className={styles.auditIcon} />
          <div>
            <div className={styles.auditTitle}>Institutional-Grade Verification Process</div>
            <div className={styles.auditDesc}>
              Every partner NGO on DonateHub undergoes rigorous 4-step compliance: Section 12A/80G status confirmation, FCRA registration check, on-ground field audits, and quarterly financial statements. Fund disbursements are milestone-based and released directly to validated vendor accounts or verified NGO escrow accounts.
            </div>
            <div className={styles.auditBadges}>
              <span className={styles.auditBadge}><CheckCircle2 size={13} /> 12A & 80G Certified</span>
              <span className={styles.auditBadge}><CheckCircle2 size={13} /> CSR-1 Compliant</span>
              <span className={styles.auditBadge}><CheckCircle2 size={13} /> Escrow Protected</span>
              <span className={styles.auditBadge}><CheckCircle2 size={13} /> Quarterly Public Audits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
