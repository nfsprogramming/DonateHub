'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Heart, Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Try: arjun@example.com');
    }
  };

  const quickLogin = (e: string) => { setEmail(e); setPassword('password123'); };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}><Heart size={22} fill="currentColor" /></div>
          <span className={styles.logoText}>Donate<span className={styles.logoAccent}>Hub</span></span>
        </div>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to continue your impact journey</p>

        {/* Quick login hint */}
        <div className={styles.demoHint}>
          <span className={styles.demoLabel}>Demo accounts:</span>
          <button id="login-demo-donor" className={styles.demoBtn} onClick={() => quickLogin('arjun@example.com')}>Donor</button>
          <button id="login-demo-ngo" className={styles.demoBtn} onClick={() => quickLogin('priya@healindia.org')}>NGO</button>
          <button id="login-demo-admin" className={styles.demoBtn} onClick={() => quickLogin('admin@donatehub.in')}>Admin</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} id="login-form">
          {error && (
            <div className={styles.errorBox}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="login-email" className="label">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                id="login-email"
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
            <label htmlFor="login-password" className="label">Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`input ${styles.inputWithIcon} ${styles.inputWithIconRight}`}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className={styles.forgotRow}>
            <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
          </div>

          <button id="login-submit" type="submit" className={`btn btn-primary btn-lg ${styles.submitBtn}`} disabled={loading}>
            {loading ? <><Loader size={16} className={styles.spin} /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <p className={styles.registerLink}>
          Don&apos;t have an account?{' '}
          <Link href="/register" id="login-go-register" className={styles.link}>Create one free</Link>
        </p>
      </div>
    </div>
  );
}
