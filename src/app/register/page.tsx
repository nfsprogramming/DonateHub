'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, User, Mail, Lock, Eye, EyeOff, Building2, AlertCircle, CheckCircle } from 'lucide-react';
import { UserRole } from '@/lib/types';
import styles from './page.module.css';

const ROLES = [
  { value: 'donor' as UserRole, label: 'Donor', icon: '❤️', desc: 'I want to donate and support causes' },
  { value: 'ngo' as UserRole, label: 'NGO / Organization', icon: '🏢', desc: 'I want to create campaigns and raise funds' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('donor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError('Please agree to the Terms of Service.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push('/login'), 2000);
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successIcon}><CheckCircle size={48} /></div>
          <h2 className={styles.title}>Account Created!</h2>
          <p className={styles.subtitle}>Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}><Heart size={22} fill="currentColor" /></div>
          <span className={styles.logoText}>Donate<span className={styles.logoAccent}>Hub</span></span>
        </div>

        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Join 94,000+ changemakers on DonateHub</p>

        {/* Role Selection */}
        <div className={styles.roleGrid} role="radiogroup" aria-label="Account type">
          {ROLES.map(r => (
            <button
              key={r.value}
              id={`register-role-${r.value}`}
              type="button"
              className={`${styles.roleBtn} ${role === r.value ? styles.roleBtnActive : ''}`}
              onClick={() => setRole(r.value)}
              aria-pressed={role === r.value}
            >
              <span className={styles.roleIcon}>{r.icon}</span>
              <span className={styles.roleLabel}>{r.label}</span>
              <span className={styles.roleDesc}>{r.desc}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form} id="register-form">
          {error && (
            <div className={styles.errorBox}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="register-name" className="label">{role === 'ngo' ? 'Organization Name' : 'Full Name'}</label>
            <div className={styles.inputWrapper}>
              {role === 'ngo' ? <Building2 size={16} className={styles.inputIcon} /> : <User size={16} className={styles.inputIcon} />}
              <input
                id="register-name"
                type="text"
                placeholder={role === 'ngo' ? 'e.g. HealIndia Foundation' : 'e.g. Arjun Sharma'}
                value={name}
                onChange={e => setName(e.target.value)}
                className={`input ${styles.inputWithIcon}`}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-email" className="label">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`input ${styles.inputWithIcon}`}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-password" className="label">Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                id="register-password"
                type={showPass ? 'text' : 'password'}
                placeholder="Min 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`input ${styles.inputWithIcon} ${styles.inputWithIconRight}`}
                minLength={8}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className={styles.checkboxLabel}>
            <input
              id="register-agree"
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className={styles.checkbox}
            />
            <span>
              I agree to the{' '}
              <Link href="/terms" className={styles.link}>Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            </span>
          </label>

          <button
            id="register-submit"
            type="submit"
            className={`btn btn-primary btn-lg ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.divider}><span>Already have an account?</span></div>
        <Link href="/login" id="register-go-login" className={`btn btn-secondary ${styles.loginBtn}`}>
          Sign In Instead
        </Link>
      </div>
    </div>
  );
}
