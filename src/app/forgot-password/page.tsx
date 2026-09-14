'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, Heart } from 'lucide-react';
import styles from './page.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}><Heart size={22} fill="currentColor" /></div>
          <span className={styles.logoText}>Donate<span className={styles.logoAccent}>Hub</span></span>
        </div>

        {submitted ? (
          <div className={styles.successBox}>
            <CheckCircle size={48} className={styles.successIcon} />
            <h2 className={styles.title}>Password Reset Link Sent</h2>
            <p className={styles.subtitle}>
              We have sent a secure password reset link to <strong>{email}</strong>. Please check your inbox and spam folders.
            </p>
            <Link href="/login" className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
              Return to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Reset your password</h1>
            <p className={styles.subtitle}>
              Enter your registered email address and we&apos;ll send you instructions to safely reset your password.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className="form-group">
                <label className="label">Registered Email Address</label>
                <div className={styles.inputWrap}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`input ${styles.inputWithIcon}`}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Send Reset Link
              </button>
            </form>

            <div className={styles.backLinkWrap}>
              <Link href="/login" className={styles.backLink}>
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
