'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Heart, Menu, X, User, ChevronDown,
  LayoutDashboard, LogOut, Shield, Search, Command
} from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/transparency', label: 'Transparency' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = () => setDropdownOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [dropdownOpen]);

  // Ctrl+K handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      // Dispatch custom event for CommandPalette
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} id="nav-logo">
          <span className={styles.logoIcon}>
            <Heart size={18} fill="currentColor" />
          </span>
          <span className={styles.logoText}>
            Donate<span className={styles.logoAccent}>Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g,'-')}`}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className={styles.actions}>
          {/* Search trigger */}
          <button
            className={styles.searchBtn}
            title="Search (Ctrl+K)"
            id="nav-search"
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          >
            <Search size={16} />
            <span className={styles.searchLabel}>Search</span>
            <kbd className={styles.kbd}>
              <Command size={10} />K
            </kbd>
          </button>

          {/* Donate CTA */}
          <Link href="/donate" id="nav-donate-cta" className={`btn btn-primary ${styles.donateCta}`}>
            <Heart size={15} fill="currentColor" />
            <span>Donate</span>
          </Link>

          {user ? (
            <div className={styles.userMenu}>
              <button
                id="nav-user-menu"
                className={styles.userBtn}
                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                aria-expanded={dropdownOpen}
              >
                <span className={styles.avatar}>{user.avatar}</span>
                <span className={styles.userName}>{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={dropdownOpen ? styles.chevronOpen : ''} />
              </button>

              {dropdownOpen && (
                <div className={styles.dropdown} onClick={e => e.stopPropagation()}>
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownName}>{user.name}</span>
                    <span className={styles.dropdownEmail}>{user.email}</span>
                  </div>
                  <div className={styles.dropdownDivider} />
                  {user.role === 'donor' && (
                    <Link href="/dashboard" id="nav-dashboard" className={styles.dropdownItem}>
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                  )}
                  {user.role === 'ngo' && (
                    <Link href="/ngo" id="nav-ngo" className={styles.dropdownItem}>
                      <LayoutDashboard size={15} /> NGO Portal
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link href="/admin" id="nav-admin" className={styles.dropdownItem}>
                      <Shield size={15} /> Admin Panel
                    </Link>
                  )}
                  <Link href="/profile" id="nav-profile" className={styles.dropdownItem}>
                    <User size={15} /> Profile
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <button id="nav-logout" className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={logout}>
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authBtns}>
              <Link href="/login" id="nav-login" className={styles.signInLink}>Sign In</Link>
              <Link href="/register" id="nav-register" className={`btn btn-primary btn-sm`}>Get Started</Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            id="nav-mobile-toggle"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={styles.mobileLink}>
                {link.label}
              </Link>
            ))}
            <Link href="/donate" className={`${styles.mobileLink} ${styles.mobileDonate}`}>
              <Heart size={16} fill="currentColor" /> Donate Now
            </Link>
          </nav>
          <div className={styles.mobileDivider} />
          {!user && (
            <div className={styles.mobileAuthBtns}>
              <Link href="/login" className="btn btn-secondary">Sign In</Link>
              <Link href="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}
          {user && (
            <>
              {user.role === 'donor' && <Link href="/dashboard" className={styles.mobileLink}>Dashboard</Link>}
              {user.role === 'ngo' && <Link href="/ngo" className={styles.mobileLink}>NGO Portal</Link>}
              {user.role === 'admin' && <Link href="/admin" className={styles.mobileLink}>Admin Panel</Link>}
              <button className={`${styles.mobileLink} ${styles.logoutItem}`} onClick={logout}>Sign Out</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
