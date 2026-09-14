'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockCampaigns, formatCurrency } from '@/lib/mockData';
import { ItemDonation } from '@/lib/types';
import {
  Heart, CreditCard, Smartphone, Landmark, RefreshCw,
  Gift, CheckCircle, Download, ArrowRight, Loader, X,
  Package, Truck, MapPin, User, Phone, Calendar
} from 'lucide-react';
import styles from './page.module.css';
import { Suspense } from 'react';

const AMOUNTS = [500, 1000, 2000, 5000, 10000];
const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: Landmark },
];
const FREQUENCIES = [
  { id: 'one-time', label: 'One Time' },
  { id: 'monthly', label: 'Monthly' },
];

function DonateForm() {
  const searchParams = useSearchParams();
  const campaignId = searchParams?.get('campaign') ?? '';
  const campaign = mockCampaigns.find(c => c.id === campaignId) ?? mockCampaigns[0];

  // Money states
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [donationType, setDonationType] = useState<'money' | 'items'>('money');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [receiptId] = useState(`RCP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);

  // Items / Pledge states
  const [items, setItems] = useState<ItemDonation[]>(campaign.itemDonations || []);
  const [pledgeTarget, setPledgeTarget] = useState<ItemDonation | null>(null);
  const [pledgeQty, setPledgeQty] = useState<number>(10);
  const [pledgeDonorName, setPledgeDonorName] = useState('');
  const [pledgePhone, setPledgePhone] = useState('');
  const [pledgeMethod, setPledgeMethod] = useState<'dropoff' | 'pickup'>('dropoff');
  const [pledgeAddress, setPledgeAddress] = useState('');
  const [pledgeLoading, setPledgeLoading] = useState(false);
  const [pledgeSuccess, setPledgeSuccess] = useState<{
    pledgeId: string;
    item: string;
    qty: number;
    unit: string;
  } | null>(null);

  const finalAmount = amount !== '' ? amount : Number(customAmount) || 0;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount < 10) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  const handleOpenPledge = (item: ItemDonation) => {
    setPledgeTarget(item);
    setPledgeQty(Math.min(item.quantity, 25));
  };

  const handleConfirmPledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeTarget) return;
    setPledgeLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setPledgeLoading(false);

    const generatedId = `PLG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update item status in local list
    setItems(prev =>
      prev.map(i => (i.id === pledgeTarget.id ? { ...i, status: 'pledged' } : i))
    );

    setPledgeSuccess({
      pledgeId: generatedId,
      item: pledgeTarget.item,
      qty: pledgeQty,
      unit: pledgeTarget.unit,
    });
    setPledgeTarget(null);
  };

  if (success) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <CheckCircle size={56} />
          </div>
          <h1 className={styles.successTitle}>Donation Successful! 🎉</h1>
          <p className={styles.successSubtitle}>
            Your {frequency === 'monthly' ? 'monthly ' : ''}donation of{' '}
            <strong>{formatCurrency(finalAmount)}</strong> to{' '}
            <strong>{campaign.title}</strong> has been processed.
          </p>

          <div className={styles.receiptCard}>
            <div className={styles.receiptRow}>
              <span>Receipt ID</span><span>{receiptId}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Amount</span><span>{formatCurrency(finalAmount)}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Campaign</span><span>{campaign.title.slice(0, 30)}...</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Date</span><span>{new Date().toLocaleDateString('en-IN')}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Status</span>
              <span className={styles.receiptSuccess}>✓ Success</span>
            </div>
          </div>

          <div className={styles.successActions}>
            <button id="donate-download-receipt" className={`btn btn-secondary`}>
              <Download size={16} /> Download 80G Receipt
            </button>
            <a href="/campaigns" id="donate-browse-more" className={`btn btn-primary`}>
              Browse More Campaigns <ArrowRight size={16} />
            </a>
          </div>

          <p className={styles.taxNote}>
            Your Section 80G tax exemption certificate will be emailed within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  if (pledgeSuccess) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <Package size={56} />
          </div>
          <h1 className={styles.successTitle}>Item Pledge Confirmed! 📦</h1>
          <p className={styles.successSubtitle}>
            Thank you for pledging <strong>{pledgeSuccess.qty} {pledgeSuccess.unit} of {pledgeSuccess.item}</strong> for{' '}
            <strong>{campaign.title}</strong>.
          </p>

          <div className={styles.receiptCard}>
            <div className={styles.receiptRow}>
              <span>Pledge ID</span><span>{pledgeSuccess.pledgeId}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Pledged Material</span><span>{pledgeSuccess.qty} {pledgeSuccess.unit} ({pledgeSuccess.item})</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Beneficiary NGO</span><span>{campaign.ngoName}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Fulfillment Method</span>
              <span>{pledgeMethod === 'pickup' ? 'Doorstep NGO Pickup' : 'Self Drop-off / Dispatch'}</span>
            </div>
            <div className={styles.receiptRow}>
              <span>Status</span>
              <span className={styles.receiptSuccess}>✓ Scheduled / Awaiting Dispatch</span>
            </div>
          </div>

          <div className={styles.pledgeInstructions}>
            <h4>Next Steps for Dispatch:</h4>
            <ul>
              <li>Our field coordinator from <strong>{campaign.ngoName}</strong> will contact you via WhatsApp / phone within 24 hours.</li>
              <li>A digital shipping slip has been generated with your Pledge ID.</li>
              <li>Once verified at the distribution hub, photo proof of delivery will be emailed to you!</li>
            </ul>
          </div>

          <div className={styles.successActions}>
            <button
              id="donate-pledge-another"
              className="btn btn-secondary"
              onClick={() => setPledgeSuccess(null)}
            >
              Pledge More Items
            </button>
            <a href="/campaigns" id="donate-browse-more-pledge" className="btn btn-primary">
              Browse More Campaigns <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* Form */}
          <div className={styles.formArea}>
            <h1 className={styles.title}>Make a <span className="gradient-text">Contribution</span></h1>
            <p className={styles.subtitle}>Every contribution counts. 100% transparent, 100% verified impact.</p>

            {/* Donation Type Tabs */}
            <div className={styles.typeTabs} role="tablist">
              <button
                id="donate-type-money"
                role="tab"
                aria-selected={donationType === 'money'}
                className={`${styles.typeTab} ${donationType === 'money' ? styles.typeTabActive : ''}`}
                onClick={() => setDonationType('money')}
              >
                <Heart size={16} /> Donate Money
              </button>
              <button
                id="donate-type-items"
                role="tab"
                aria-selected={donationType === 'items'}
                className={`${styles.typeTab} ${donationType === 'items' ? styles.typeTabActive : ''}`}
                onClick={() => setDonationType('items')}
              >
                <Gift size={16} /> Donate Items / Materials
              </button>
            </div>

            {donationType === 'items' ? (
              <div className={styles.itemDonation}>
                <div className={styles.itemIntro}>
                  <h3 className={styles.itemTitle}>Material Donations Needed by {campaign.ngoName}</h3>
                  <p className={styles.itemSubtitle}>
                    Directly provide essential items required on-ground. All pledged goods are tracked until delivered to beneficiaries.
                  </p>
                </div>

                {items && items.length > 0 ? (
                  <div className={styles.itemList}>
                    {items.map(item => (
                      <div key={item.id} className={styles.itemRow}>
                        <div className={styles.itemInfo}>
                          <div className={styles.itemName}>{item.item}</div>
                          <div className={styles.itemQty}>
                            Requirement: <strong>{item.quantity.toLocaleString()} {item.unit}</strong>
                          </div>
                        </div>

                        {item.status === 'delivered' ? (
                          <span className="badge badge-success">✓ Delivered</span>
                        ) : item.status === 'pledged' ? (
                          <span className="badge badge-warning">Pledged ✓</span>
                        ) : (
                          <button
                            id={`donate-pledge-${item.id}`}
                            className="btn btn-primary btn-sm"
                            onClick={() => handleOpenPledge(item)}
                          >
                            Pledge Items
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noItems}>No physical item donations requested for this campaign currently.</p>
                )}
              </div>
            ) : (
              <form onSubmit={handleDonate} id="donate-form" className={styles.form}>
                {/* Frequency */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Donation Frequency</label>
                  <div className={styles.freqBtns}>
                    {FREQUENCIES.map(f => (
                      <button
                        key={f.id}
                        id={`donate-freq-${f.id}`}
                        type="button"
                        className={`${styles.freqBtn} ${frequency === f.id ? styles.freqBtnActive : ''}`}
                        onClick={() => setFrequency(f.id)}
                      >
                        {f.id === 'monthly' && <RefreshCw size={13} />} {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Select Amount</label>
                  <div className={styles.amountGrid}>
                    {AMOUNTS.map(a => (
                      <button
                        key={a}
                        id={`donate-amount-${a}`}
                        type="button"
                        className={`${styles.amountBtn} ${amount === a ? styles.amountBtnActive : ''}`}
                        onClick={() => { setAmount(a); setCustomAmount(''); }}
                      >
                        ₹{a.toLocaleString('en-IN')}
                      </button>
                    ))}
                    <input
                      id="donate-custom-amount"
                      type="number"
                      placeholder="Custom ₹"
                      value={customAmount}
                      min="10"
                      onChange={e => { setCustomAmount(e.target.value); setAmount(''); }}
                      className={`${styles.customAmount} ${customAmount ? styles.amountBtnActive : ''}`}
                    />
                  </div>
                  {finalAmount >= 500 && (
                    <p className={styles.impactHint}>
                      💡 ₹{finalAmount.toLocaleString()} can {finalAmount >= 5000 ? 'fund a week of intensive medical treatment' : finalAmount >= 1000 ? 'provide 20 native trees & sapling protection' : 'feed a displaced family for 3 days'}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Payment Gateway</label>
                  <div className={styles.paymentBtns}>
                    {PAYMENT_METHODS.map(m => (
                      <button
                        key={m.id}
                        id={`donate-pay-${m.id}`}
                        type="button"
                        className={`${styles.paymentBtn} ${paymentMethod === m.id ? styles.paymentBtnActive : ''}`}
                        onClick={() => setPaymentMethod(m.id)}
                      >
                        <m.icon size={16} /> {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="donate-message" className={styles.fieldLabel}>Message of Encouragement (Optional)</label>
                  <textarea
                    id="donate-message"
                    placeholder="Leave a word of warmth or hope for the campaign team and beneficiaries..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className={`input ${styles.messageInput}`}
                    rows={3}
                  />
                </div>

                {/* Anonymous */}
                <label className={styles.checkboxLabel} htmlFor="donate-anonymous">
                  <input
                    id="donate-anonymous"
                    type="checkbox"
                    checked={anonymous}
                    onChange={e => setAnonymous(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>Donate anonymously (hide my identity on the public supporters board)</span>
                </label>

                {/* Submit */}
                <button
                  id="donate-submit"
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  disabled={loading || finalAmount < 10}
                >
                  {loading ? (
                    <><Loader size={16} className={styles.spin} /> Processing Securely...</>
                  ) : (
                    <><Heart size={18} fill="currentColor" /> Donate {finalAmount >= 10 ? formatCurrency(finalAmount) : 'Now'}</>
                  )}
                </button>

                <p className={styles.secureNote}>
                  🔒 256-Bit Encrypted · PCI DSS Level 1 · Supported by RBI-Regulated Gateways
                </p>
              </form>
            )}
          </div>

          {/* Campaign summary sidebar */}
          <aside className={styles.campaignSidebar}>
            <div className={styles.campaignSummary}>
              <h3 className={styles.summaryTitle}>Campaign Beneficiary</h3>
              <div className={styles.summaryImagePlaceholder}>
                <span>{campaign.category}</span>
              </div>
              <div className={styles.summaryName}>{campaign.title}</div>
              <div className={styles.summaryNgo}>by {campaign.ngoName}</div>
              <div className="divider" />
              <div className={styles.summaryStats}>
                <div className={styles.summaryStat}>
                  <span className={styles.summaryStatValue}>{formatCurrency(campaign.raisedAmount)}</span>
                  <span className={styles.summaryStatLabel}>Raised</span>
                </div>
                <div className={styles.summaryStat}>
                  <span className={styles.summaryStatValue}>{campaign.donorCount.toLocaleString()}</span>
                  <span className={styles.summaryStatLabel}>Donors</span>
                </div>
              </div>
            </div>

            <div className={styles.trustBox}>
              <div className={styles.trustItem}><CheckCircle size={14} className={styles.trustCheck} /> 100% Itemized Fund Transparency</div>
              <div className={styles.trustItem}><CheckCircle size={14} className={styles.trustCheck} /> Section 80G Tax Exemption Guarantee</div>
              <div className={styles.trustItem}><CheckCircle size={14} className={styles.trustCheck} /> Real-Time On-Ground Milestone Audits</div>
              <div className={styles.trustItem}><CheckCircle size={14} className={styles.trustCheck} /> Automated Instant Receipt Generation</div>
            </div>
          </aside>
        </div>
      </div>

      {/* Pledge Modal */}
      {pledgeTarget && (
        <div className={styles.modalOverlay} onClick={() => setPledgeTarget(null)}>
          <div className={styles.pledgeModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTitle}>
                <Package size={20} className={styles.modalIcon} />
                <h3>Pledge {pledgeTarget.item}</h3>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setPledgeTarget(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmPledge} className={styles.pledgeForm}>
              <div className={styles.pledgeItemBadge}>
                <span>Need: {pledgeTarget.quantity} {pledgeTarget.unit}</span>
                <span>Beneficiary: {campaign.ngoName}</span>
              </div>

              <div className="form-group">
                <label className="label">Quantity to Pledge ({pledgeTarget.unit})</label>
                <input
                  type="number"
                  min="1"
                  max={pledgeTarget.quantity}
                  value={pledgeQty}
                  onChange={e => setPledgeQty(Math.max(1, Number(e.target.value)))}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={pledgeDonorName}
                  onChange={e => setPledgeDonorName(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Contact Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={pledgePhone}
                  onChange={e => setPledgePhone(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Fulfillment Method</label>
                <div className={styles.methodToggle}>
                  <button
                    type="button"
                    className={`${styles.methodBtn} ${pledgeMethod === 'dropoff' ? styles.methodBtnActive : ''}`}
                    onClick={() => setPledgeMethod('dropoff')}
                  >
                    <MapPin size={14} /> Self Dispatch / Drop-off
                  </button>
                  <button
                    type="button"
                    className={`${styles.methodBtn} ${pledgeMethod === 'pickup' ? styles.methodBtnActive : ''}`}
                    onClick={() => setPledgeMethod('pickup')}
                  >
                    <Truck size={14} /> Doorstep NGO Pickup
                  </button>
                </div>
              </div>

              {pledgeMethod === 'pickup' && (
                <div className="form-group">
                  <label className="label">Pickup Address & City</label>
                  <textarea
                    placeholder="Enter complete address, landmark, and pincode..."
                    value={pledgeAddress}
                    onChange={e => setPledgeAddress(e.target.value)}
                    className="input"
                    rows={2}
                    required
                  />
                </div>
              )}

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPledgeTarget(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={pledgeLoading || pledgeQty < 1}
                >
                  {pledgeLoading ? <><Loader size={14} className={styles.spin} /> Confirming...</> : 'Confirm Pledge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense>
      <DonateForm />
    </Suspense>
  );
}
