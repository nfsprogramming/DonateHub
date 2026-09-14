'use client';

import { useState, useMemo } from 'react';
import { mockCampaigns } from '@/lib/mockData';
import { CampaignCard } from '@/components/ui/CampaignCard';
import { CampaignCategory } from '@/lib/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import styles from './page.module.css';

const CATEGORIES: CampaignCategory[] = [
  'Education', 'Healthcare', 'Disaster Relief', 'Environment',
  'Food & Hunger', 'Animal Welfare', 'Women Empowerment', 'Child Welfare'
];

const SORT_OPTIONS = [
  { value: 'urgent', label: 'Urgent First' },
  { value: 'progress', label: 'Most Funded' },
  { value: 'donors', label: 'Most Donors' },
  { value: 'deadline', label: 'Ending Soon' },
  { value: 'newest', label: 'Newest' },
];

export default function CampaignsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CampaignCategory | ''>('');
  const [sort, setSort] = useState('urgent');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...mockCampaigns];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.ngoName.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (category) list = list.filter(c => c.category === category);

    switch (sort) {
      case 'urgent': list.sort((a, b) => (b.status === 'urgent' ? 1 : 0) - (a.status === 'urgent' ? 1 : 0)); break;
      case 'progress': list.sort((a, b) => (b.raisedAmount / b.goalAmount) - (a.raisedAmount / a.goalAmount)); break;
      case 'donors': list.sort((a, b) => b.donorCount - a.donorCount); break;
      case 'deadline': list.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()); break;
      case 'newest': list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return list;
  }, [search, category, sort]);

  const clearFilters = () => { setSearch(''); setCategory(''); setSort('urgent'); };
  const hasFilters = search || category || sort !== 'urgent';

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Browse <span className="gradient-text">Campaigns</span></h1>
          <p className={styles.subtitle}>Discover verified campaigns making real-world impact across India</p>
        </div>
      </div>

      <div className="container">
        {/* Search & Filters Bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchInput}>
            <Search size={18} className={styles.searchIcon} />
            <input
              id="campaigns-search"
              type="text"
              placeholder="Search campaigns, NGOs, locations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchField}
            />
            {search && (
              <button onClick={() => setSearch('')} className={styles.clearSearch}><X size={16} /></button>
            )}
          </div>
          <select
            id="campaigns-sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
            className={styles.sortSelect}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            id="campaigns-filter-toggle"
            className={`btn btn-secondary ${showFilters ? styles.filterBtnActive : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          {hasFilters && (
            <button id="campaigns-clear-filters" className="btn btn-danger btn-sm" onClick={clearFilters}>
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        {showFilters && (
          <div className={styles.categoryPills}>
            <button
              id="cat-filter-all"
              className={`${styles.pill} ${category === '' ? styles.pillActive : ''}`}
              onClick={() => setCategory('')}
            >
              All Categories
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c}
                id={`cat-filter-${c.toLowerCase().replace(/\s+/g, '-')}`}
                className={`${styles.pill} ${category === c ? styles.pillActive : ''}`}
                onClick={() => setCategory(category === c ? '' : c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className={styles.results}>
          <span className={styles.resultCount}>{filtered.length} campaigns found</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid-auto-fill">
            {filtered.map(c => <CampaignCard key={c.id} campaign={c} />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <h3>No campaigns found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
