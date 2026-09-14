'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Heart, Eye, TrendingUp, BarChart3, Users,
  Settings, User, X, ArrowRight
} from 'lucide-react';
import styles from './CommandPalette.module.css';

interface CommandItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  category: string;
}

const commands: CommandItem[] = [
  { id: 'campaigns', label: 'Browse Campaigns', href: '/campaigns', icon: <Heart size={16} />, category: 'Navigate' },
  { id: 'donate', label: 'Donate Now', href: '/donate', icon: <Heart size={16} />, category: 'Navigate' },
  { id: 'transparency', label: 'View Transparency', href: '/transparency', icon: <Eye size={16} />, category: 'Navigate' },
  { id: 'education', label: 'Education Campaigns', href: '/campaigns?category=Education', icon: <TrendingUp size={16} />, category: 'Causes' },
  { id: 'healthcare', label: 'Healthcare Campaigns', href: '/campaigns?category=Healthcare', icon: <TrendingUp size={16} />, category: 'Causes' },
  { id: 'disaster', label: 'Disaster Relief', href: '/campaigns?category=Disaster+Relief', icon: <TrendingUp size={16} />, category: 'Causes' },
  { id: 'environment', label: 'Environment', href: '/campaigns?category=Environment', icon: <TrendingUp size={16} />, category: 'Causes' },
  { id: 'dashboard', label: 'My Dashboard', href: '/dashboard', icon: <BarChart3 size={16} />, category: 'Account' },
  { id: 'profile', label: 'Profile', href: '/profile', icon: <User size={16} />, category: 'Account' },
  { id: 'login', label: 'Sign In', href: '/login', icon: <Users size={16} />, category: 'Account' },
  { id: 'register', label: 'Get Started', href: '/register', icon: <Settings size={16} />, category: 'Account' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
    setQuery('');
    setSelectedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    const handler = () => handleOpen();
    window.addEventListener('open-command-palette', handler);
    return () => window.removeEventListener('open-command-palette', handler);
  }, [handleOpen]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        router.push(filtered[selectedIndex].href);
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, filtered, selectedIndex, router]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  if (!open) return null;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div className={styles.palette} onClick={e => e.stopPropagation()}>
        <div className={styles.searchRow}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search campaigns, causes, pages..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={styles.searchInput}
            id="command-palette-input"
          />
          <button className={styles.escBtn} onClick={() => setOpen(false)} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className={styles.results}>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className={styles.group}>
              <div className={styles.groupLabel}>{category}</div>
              {items.map((item) => {
                const flatIdx = filtered.indexOf(item);
                return (
                  <button
                    key={item.id}
                    className={`${styles.item} ${flatIdx === selectedIndex ? styles.itemActive : ''}`}
                    onClick={() => { router.push(item.href); setOpen(false); }}
                    onMouseEnter={() => setSelectedIndex(flatIdx)}
                    id={`command-${item.id}`}
                  >
                    <span className={styles.itemIcon}>{item.icon}</span>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <ArrowRight size={14} className={styles.itemArrow} />
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={styles.empty}>
              <span>No results for &ldquo;{query}&rdquo;</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
