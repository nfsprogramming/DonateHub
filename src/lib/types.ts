// =====================================================================
// DonateHub – Core Types
// =====================================================================

export type CampaignCategory =
  | "Education"
  | "Healthcare"
  | "Disaster Relief"
  | "Environment"
  | "Food & Hunger"
  | "Animal Welfare"
  | "Women Empowerment"
  | "Child Welfare";

export type DonationType = "money" | "items";
export type DonationFrequency = "one-time" | "monthly";
export type CampaignStatus = "active" | "completed" | "urgent" | "pending";
export type UserRole = "donor" | "ngo" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  totalDonated?: number;
  campaigns?: string[];
  wishlist?: string[];
  joinedAt: string;
}

export interface FundUsage {
  label: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface Update {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  category: CampaignCategory;
  image: string;
  ngoName: string;
  ngoId: string;
  ngoVerified: boolean;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  deadline: string;
  status: CampaignStatus;
  location: string;
  tags: string[];
  fundUsage: FundUsage[];
  updates: Update[];
  itemDonations?: ItemDonation[];
  createdAt: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  campaignTitle: string;
  donorId: string;
  donorName: string;
  amount: number;
  type: DonationType;
  frequency: DonationFrequency;
  paymentMethod: string;
  message?: string;
  anonymous: boolean;
  receiptId: string;
  createdAt: string;
}

export interface ItemDonation {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  donor?: string;
  status: "requested" | "pledged" | "delivered";
}

export interface Transaction {
  id: string;
  donationId: string;
  campaignId: string;
  amount: number;
  status: "pending" | "success" | "failed";
  gateway: string;
  createdAt: string;
}

export interface Stats {
  totalRaised: number;
  totalDonors: number;
  activeCampaigns: number;
  ngosOnboarded: number;
  livesImpacted: number;
}
