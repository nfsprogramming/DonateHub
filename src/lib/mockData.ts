import { Campaign, User, Donation, Stats, Transaction } from "./types";

// =====================================================================
// Mock Stats
// =====================================================================
export const mockStats: Stats = {
  totalRaised: 18540000,
  totalDonors: 94320,
  activeCampaigns: 238,
  ngosOnboarded: 847,
  livesImpacted: 2100000,
};

// =====================================================================
// Mock Campaigns
// =====================================================================
export const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    title: "Rebuild Schools in Flood-Hit Assam",
    slug: "rebuild-schools-assam",
    shortDesc: "Heavy floods destroyed 14 primary schools. Help rebuild classrooms and restore education for 3,200 children.",
    description:
      "The devastating floods of 2025 swept through lower Assam, leaving 14 primary schools in ruins. Over 3,200 children are without classrooms, teachers are holding classes under open skies. Your donation helps rebuild permanent, flood-resilient structures with proper sanitation and learning material.",
    category: "Education",
    image: "/images/campaign-school.jpg",
    ngoName: "EduReach Foundation",
    ngoId: "ngo1",
    ngoVerified: true,
    goalAmount: 5000000,
    raisedAmount: 3840000,
    donorCount: 4218,
    deadline: "2026-07-31",
    status: "urgent",
    location: "Assam, India",
    tags: ["Education", "Disaster Relief", "Children"],
    fundUsage: [
      { label: "Construction", percentage: 60, amount: 3000000, color: "#124B3A" },
      { label: "Books & Supplies", percentage: 20, amount: 1000000, color: "#2F8A5B" },
      { label: "Teacher Training", percentage: 12, amount: 600000, color: "#C99A3D" },
      { label: "Admin & Logistics", percentage: 8, amount: 400000, color: "#8B948F" },
    ],
    updates: [
      {
        date: "2026-04-10",
        title: "Foundation work begins!",
        description: "We've broken ground on the first 3 schools. 120 workers are on site. Expected completion by June.",
      },
      {
        date: "2026-03-22",
        title: "Goal halfway reached!",
        description: "Thanks to 2,100 donors we have crossed 50% of our target. Your support is making this real.",
      },
    ],
    itemDonations: [
      { id: "id1", item: "School Bags", quantity: 500, unit: "bags", status: "requested" },
      { id: "id2", item: "Notebooks", quantity: 3000, unit: "notebooks", status: "pledged" },
      { id: "id3", item: "Pencil Sets", quantity: 3200, unit: "sets", status: "delivered" },
    ],
    createdAt: "2026-02-14",
  },
  {
    id: "c2",
    title: "Cancer Care for Underprivileged Patients",
    slug: "cancer-care-underprivileged",
    shortDesc: "Providing chemotherapy, medicines, and support to 200 cancer patients who cannot afford treatment.",
    description:
      "Cancer doesn't discriminate—but access to treatment does. Our hospital-NGO partnership provides free chemotherapy cycles, medicines, diagnostics, and emotional support to 200 verified underprivileged patients across Maharashtra and Karnataka.",
    category: "Healthcare",
    image: "/images/campaign-health.jpg",
    ngoName: "HealIndia Trust",
    ngoId: "ngo2",
    ngoVerified: true,
    goalAmount: 8000000,
    raisedAmount: 5920000,
    donorCount: 7341,
    deadline: "2026-09-30",
    status: "active",
    location: "Maharashtra & Karnataka",
    tags: ["Healthcare", "Cancer", "Underprivileged"],
    fundUsage: [
      { label: "Chemotherapy", percentage: 55, amount: 4400000, color: "#124B3A" },
      { label: "Medicines", percentage: 25, amount: 2000000, color: "#2F8A5B" },
      { label: "Diagnostics", percentage: 12, amount: 960000, color: "#C99A3D" },
      { label: "Counseling", percentage: 8, amount: 640000, color: "#8B948F" },
    ],
    updates: [
      {
        date: "2026-04-15",
        title: "Month 3 Update",
        description: "42 patients have completed their first chemo cycle. 18 patients show significant improvement. Thank you.",
      },
    ],
    itemDonations: [
      { id: "id4", item: "Surgical Masks", quantity: 10000, unit: "pieces", status: "delivered" },
      { id: "id5", item: "Nutritional Supplements", quantity: 500, unit: "packs", status: "pledged" },
    ],
    createdAt: "2026-01-20",
  },
  {
    id: "c3",
    title: "Plant a Million Trees in Rajasthan",
    slug: "million-trees-rajasthan",
    shortDesc: "Combat desertification in the Thar Desert region by planting drought-resistant trees with local communities.",
    description:
      "The Thar Desert is expanding. We work with local communities to plant 1 million drought-resistant native trees, train farmers in agroforestry, and create green belts that protect villages from sand storms and improve groundwater levels.",
    category: "Environment",
    image: "/images/campaign-trees.jpg",
    ngoName: "GreenSeed India",
    ngoId: "ngo3",
    ngoVerified: true,
    goalAmount: 2500000,
    raisedAmount: 2150000,
    donorCount: 11820,
    deadline: "2026-06-15",
    status: "active",
    location: "Rajasthan, India",
    tags: ["Environment", "Climate", "Trees"],
    fundUsage: [
      { label: "Saplings & Seeds", percentage: 45, amount: 1125000, color: "#124B3A" },
      { label: "Community Wages", percentage: 30, amount: 750000, color: "#2F8A5B" },
      { label: "Irrigation", percentage: 15, amount: 375000, color: "#C99A3D" },
      { label: "Monitoring", percentage: 10, amount: 250000, color: "#8B948F" },
    ],
    updates: [
      {
        date: "2026-04-05",
        title: "350,000 trees planted!",
        description: "We've reached 35% of our million-tree goal. The monsoon window is approaching — critical planting season begins.",
      },
    ],
    itemDonations: [],
    createdAt: "2025-12-01",
  },
  {
    id: "c4",
    title: "Emergency Food Kits – Kerala Floods",
    slug: "emergency-food-kerala",
    shortDesc: "Distribute 10,000 food kits to families displaced by sudden flooding in northern Kerala.",
    description:
      "Unexpected cloudbursts have displaced 45,000 families across 3 districts in northern Kerala. We need to immediately distribute 10,000 food kits containing rice, dal, cooking oil, and hygiene items to last 2 weeks.",
    category: "Disaster Relief",
    image: "/images/campaign-food.jpg",
    ngoName: "RapidAid India",
    ngoId: "ngo4",
    ngoVerified: true,
    goalAmount: 1500000,
    raisedAmount: 1480000,
    donorCount: 9870,
    deadline: "2026-05-01",
    status: "urgent",
    location: "Kerala, India",
    tags: ["Food", "Disaster Relief", "Emergency"],
    fundUsage: [
      { label: "Food Kits", percentage: 75, amount: 1125000, color: "#124B3A" },
      { label: "Transport", percentage: 15, amount: 225000, color: "#2F8A5B" },
      { label: "Packaging", percentage: 6, amount: 90000, color: "#C99A3D" },
      { label: "Volunteers", percentage: 4, amount: 60000, color: "#8B948F" },
    ],
    updates: [
      {
        date: "2026-04-18",
        title: "98.7% funded! Final push!",
        description: "We are almost there. 8,200 kits already packed and ready for dispatch the moment we hit the goal.",
      },
    ],
    itemDonations: [
      { id: "id6", item: "Rice (5kg bags)", quantity: 10000, unit: "bags", status: "requested" },
      { id: "id7", item: "Cooking Oil (1L)", quantity: 10000, unit: "bottles", status: "pledged" },
      { id: "id8", item: "Soap Bars", quantity: 50000, unit: "pieces", status: "delivered" },
    ],
    createdAt: "2026-04-10",
  },
  {
    id: "c5",
    title: "Skill Training for Rural Women",
    slug: "skill-training-women",
    shortDesc: "Train 500 rural women in digital skills, tailoring, and microenterprise to achieve financial independence.",
    description:
      "Financial independence for women transforms communities. Our 6-month intensive program trains 500 rural women aged 18-45 in digital literacy, tailoring & fashion design, and microenterprise management. We also provide startup capital and mentorship.",
    category: "Women Empowerment",
    image: "/images/campaign-women.jpg",
    ngoName: "SheRises NGO",
    ngoId: "ngo5",
    ngoVerified: true,
    goalAmount: 3000000,
    raisedAmount: 1890000,
    donorCount: 2340,
    deadline: "2026-08-31",
    status: "active",
    location: "Uttar Pradesh & Bihar",
    tags: ["Women", "Skills", "Empowerment"],
    fundUsage: [
      { label: "Training Centers", percentage: 35, amount: 1050000, color: "#124B3A" },
      { label: "Equipment", percentage: 25, amount: 750000, color: "#2F8A5B" },
      { label: "Startup Funds", percentage: 25, amount: 750000, color: "#C99A3D" },
      { label: "Mentorship", percentage: 15, amount: 450000, color: "#8B948F" },
    ],
    updates: [
      {
        date: "2026-03-30",
        title: "First batch of 120 women enrolled",
        description: "Centers opened in 4 villages. Digital literacy classes started. The energy is incredible.",
      },
    ],
    itemDonations: [
      { id: "id9", item: "Sewing Machines", quantity: 50, unit: "machines", status: "pledged" },
      { id: "id10", item: "Fabric Rolls", quantity: 200, unit: "rolls", status: "requested" },
    ],
    createdAt: "2026-02-01",
  },
  {
    id: "c6",
    title: "Stray Animal Rescue & Vaccination Drive",
    slug: "stray-animal-rescue",
    shortDesc: "Rescue, vaccinate and neuter 2,000 stray dogs and cats in Bengaluru's high-density areas.",
    description:
      "Bengaluru has over 3 lakh stray animals. We conduct rescue ops, provide veterinary care, vaccinate against rabies, neuter/spay to control population, and facilitate adoption. Every donation funds one animal's complete care cycle.",
    category: "Animal Welfare",
    image: "/images/campaign-animals.jpg",
    ngoName: "PawsForever Trust",
    ngoId: "ngo6",
    ngoVerified: false,
    goalAmount: 2000000,
    raisedAmount: 940000,
    donorCount: 5620,
    deadline: "2026-10-31",
    status: "active",
    location: "Bengaluru, Karnataka",
    tags: ["Animals", "Rescue", "Healthcare"],
    fundUsage: [
      { label: "Veterinary Care", percentage: 50, amount: 1000000, color: "#124B3A" },
      { label: "Medicines", percentage: 25, amount: 500000, color: "#2F8A5B" },
      { label: "Shelter", percentage: 15, amount: 300000, color: "#C99A3D" },
      { label: "Staff", percentage: 10, amount: 200000, color: "#8B948F" },
    ],
    updates: [],
    itemDonations: [
      { id: "id11", item: "Dog Food (20kg bags)", quantity: 500, unit: "bags", status: "requested" },
      { id: "id12", item: "Blankets", quantity: 300, unit: "pieces", status: "delivered" },
    ],
    createdAt: "2026-03-01",
  },
];

// =====================================================================
// Mock Users
// =====================================================================
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    role: "donor",
    avatar: "AS",
    location: "Mumbai, India",
    totalDonated: 45000,
    wishlist: ["c1", "c3"],
    joinedAt: "2025-08-15",
  },
  {
    id: "u2",
    name: "Priya Nair",
    email: "priya@healindia.org",
    role: "ngo",
    avatar: "PN",
    location: "Bengaluru, India",
    campaigns: ["c2", "c5"],
    joinedAt: "2025-06-01",
  },
  {
    id: "u3",
    name: "Admin User",
    email: "admin@donatehub.in",
    role: "admin",
    avatar: "AD",
    joinedAt: "2025-01-01",
  },
];

// =====================================================================
// Mock Donations
// =====================================================================
export const mockDonations: Donation[] = [
  {
    id: "d1",
    campaignId: "c1",
    campaignTitle: "Rebuild Schools in Flood-Hit Assam",
    donorId: "u1",
    donorName: "Arjun Sharma",
    amount: 5000,
    type: "money",
    frequency: "one-time",
    paymentMethod: "UPI",
    message: "Keep up the great work! Education is the future.",
    anonymous: false,
    receiptId: "RCP-2026-0421",
    createdAt: "2026-04-14",
  },
  {
    id: "d2",
    campaignId: "c2",
    campaignTitle: "Cancer Care for Underprivileged Patients",
    donorId: "u1",
    donorName: "Arjun Sharma",
    amount: 2000,
    type: "money",
    frequency: "monthly",
    paymentMethod: "Card",
    anonymous: false,
    receiptId: "RCP-2026-0389",
    createdAt: "2026-03-20",
  },
  {
    id: "d3",
    campaignId: "c3",
    campaignTitle: "Plant a Million Trees in Rajasthan",
    donorId: "u1",
    donorName: "Arjun Sharma",
    amount: 1000,
    type: "money",
    frequency: "one-time",
    paymentMethod: "Net Banking",
    anonymous: true,
    receiptId: "RCP-2026-0312",
    createdAt: "2026-02-28",
  },
];

// =====================================================================
// Mock Transactions (for admin)
// =====================================================================
export const mockTransactions: Transaction[] = [
  { id: "t1", donationId: "d1", campaignId: "c1", amount: 5000, status: "success", gateway: "Razorpay", createdAt: "2026-04-14" },
  { id: "t2", donationId: "d2", campaignId: "c2", amount: 2000, status: "success", gateway: "Razorpay", createdAt: "2026-03-20" },
  { id: "t3", donationId: "d3", campaignId: "c3", amount: 1000, status: "success", gateway: "Razorpay", createdAt: "2026-02-28" },
  { id: "t4", donationId: "d4", campaignId: "c4", amount: 500, status: "failed", gateway: "Stripe", createdAt: "2026-04-18" },
  { id: "t5", donationId: "d5", campaignId: "c1", amount: 10000, status: "success", gateway: "Razorpay", createdAt: "2026-04-17" },
  { id: "t6", donationId: "d6", campaignId: "c5", amount: 3000, status: "pending", gateway: "Razorpay", createdAt: "2026-04-19" },
];

// Helpers
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const formatNumber = (n: number): string => {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString("en-IN");
};

export const getProgress = (raised: number, goal: number): number =>
  Math.min(Math.round((raised / goal) * 100), 100);

export const getDaysLeft = (deadline: string): number => {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};
