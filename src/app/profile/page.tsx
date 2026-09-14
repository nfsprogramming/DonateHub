'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockUsers, mockDonations, formatCurrency } from '@/lib/mockData';
import { User, Mail, MapPin, Phone, ShieldCheck, Heart, Save, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const currentUser = user || mockUsers[0];
  const userDonations = mockDonations.filter(d => d.donorId === currentUser.id);
  const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);

  const [name, setName] = useState(currentUser.name);
  const [email] = useState(currentUser.email);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState(currentUser.location || 'Mumbai, Maharashtra');
  const [pan, setPan] = useState('ABCDE1234F');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatarLarge}>{currentUser.avatar || 'AS'}</div>
          <div className={styles.headerInfo}>
            <div className={styles.nameRow}>
              <h1 className={styles.userName}>{name}</h1>
              <span className={`badge ${currentUser.role === 'admin' ? 'badge-danger' : currentUser.role === 'ngo' ? 'badge-warning' : 'badge-primary'}`}>
                {currentUser.role.toUpperCase()}
              </span>
            </div>
            <p className={styles.userEmail}>{email}</p>
            <div className={styles.metaRow}>
              <span><MapPin size={13} /> {location}</span>
              <span><Heart size={13} /> Member since {currentUser.joinedAt || '2025'}</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Contributions</span>
            <span className={styles.statValue}>{formatCurrency(totalDonated || 45000)}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Campaigns Backed</span>
            <span className={styles.statValue}>{userDonations.length || 3} Causes</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Tax Benefit Status</span>
            <span className={styles.statValue} style={{ color: 'var(--emerald-700)' }}>80G Active</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Pledges Fulfilled</span>
            <span className={styles.statValue}>100%</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Personal Settings Form */}
          <div className={styles.formCard}>
            <h2 className={styles.cardTitle}>Account & Tax Profile</h2>
            <p className={styles.cardSubtitle}>
              Keep your contact and PAN details updated for accurate automated Section 80G tax certificates.
            </p>

            {saved && (
              <div className={styles.savedAlert}>
                <CheckCircle size={16} /> Profile settings updated successfully!
              </div>
            )}

            <form onSubmit={handleSave} className={styles.form}>
              <div className="form-group">
                <label className="label">Full Legal Name</label>
                <div className={styles.inputWrap}>
                  <User size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={`input ${styles.inputWithIcon}`}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Email Address (Immutable)</label>
                <div className={styles.inputWrap}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    type="email"
                    value={email}
                    disabled
                    className={`input ${styles.inputWithIcon} ${styles.inputDisabled}`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Mobile Number (for Receipt & Dispatch SMS)</label>
                <div className={styles.inputWrap}>
                  <Phone size={16} className={styles.inputIcon} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={`input ${styles.inputWithIcon}`}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">City & State</label>
                <div className={styles.inputWrap}>
                  <MapPin size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className={`input ${styles.inputWithIcon}`}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Permanent Account Number (PAN) for 80G Tax Exemption</label>
                <div className={styles.inputWrap}>
                  <FileText size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={pan}
                    maxLength={10}
                    onChange={e => setPan(e.target.value.toUpperCase())}
                    className={`input ${styles.inputWithIcon}`}
                    placeholder="ABCDE1234F"
                  />
                </div>
                <span className={styles.hint}>Mandatory under Form 10BD for claiming 50% tax deduction on Income Tax filings.</span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Save size={16} /> Save Profile Changes
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Quick Actions</h3>
              <div className={styles.sideActions}>
                <Link href="/dashboard" className={styles.actionBtn}>
                  <div>
                    <strong>Impact Dashboard</strong>
                    <span>Review your donation history and impact reports</span>
                  </div>
                  <ArrowRight size={16} />
                </Link>

                <Link href="/donate" className={styles.actionBtn}>
                  <div>
                    <strong>Make a New Contribution</strong>
                    <span>Support urgent campaigns across India</span>
                  </div>
                  <ArrowRight size={16} />
                </Link>

                <Link href="/transparency" className={styles.actionBtn}>
                  <div>
                    <strong>Public Audit Ledger</strong>
                    <span>Inspect itemized fund allocations</span>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.trustCard}>
              <ShieldCheck size={28} className={styles.trustIcon} />
              <h4>Verified Account Security</h4>
              <p>Your profile is protected by 256-bit encryption and RBI-mandated data localization norms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
