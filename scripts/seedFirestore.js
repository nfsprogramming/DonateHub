const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

// We have to extract the mockData dynamically or just redefine it here.
// For simplicity, we'll redefine the essential campaigns.
const campaigns = [
  {
    id: "c1",
    title: "Rebuild Schools in Flood-Hit Assam",
    slug: "rebuild-schools-assam",
    shortDesc: "Heavy floods destroyed 14 primary schools. Help rebuild classrooms and restore education for 3,200 children.",
    description: "The devastating floods of 2025 swept through lower Assam, leaving 14 primary schools in ruins. Over 3,200 children are without classrooms, teachers are holding classes under open skies. Your donation helps rebuild permanent, flood-resilient structures with proper sanitation and learning material.",
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
      { label: "Construction", percentage: 60, amount: 3000000, color: "#6C63FF" },
      { label: "Books & Supplies", percentage: 20, amount: 1000000, color: "#43E8C5" },
      { label: "Teacher Training", percentage: 12, amount: 600000, color: "#FFB830" },
      { label: "Admin & Logistics", percentage: 8, amount: 400000, color: "#FF6B8A" },
    ],
    updates: [
      { date: "2026-04-10", title: "Foundation work begins!", description: "We've broken ground on the first 3 schools. 120 workers are on site. Expected completion by June." }
    ],
    itemDonations: [],
    createdAt: "2026-02-14",
  },
  {
    id: "c2",
    title: "Cancer Care for Underprivileged Patients",
    slug: "cancer-care-underprivileged",
    shortDesc: "Providing chemotherapy, medicines, and support to 200 cancer patients who cannot afford treatment.",
    description: "Cancer doesn't discriminate—but access to treatment does. Our hospital-NGO partnership provides free chemotherapy cycles, medicines, diagnostics, and emotional support to 200 verified underprivileged patients across Maharashtra and Karnataka.",
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
      { label: "Chemotherapy", percentage: 55, amount: 4400000, color: "#FF6B8A" },
      { label: "Medicines", percentage: 25, amount: 2000000, color: "#6C63FF" }
    ],
    updates: [],
    itemDonations: [],
    createdAt: "2026-01-20",
  },
  {
    id: "c3",
    title: "Plant a Million Trees in Rajasthan",
    slug: "million-trees-rajasthan",
    shortDesc: "Combat desertification in the Thar Desert region by planting drought-resistant trees with local communities.",
    description: "The Thar Desert is expanding. We work with local communities to plant 1 million drought-resistant native trees, train farmers in agroforestry, and create green belts that protect villages from sand storms and improve groundwater levels.",
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
      { label: "Saplings & Seeds", percentage: 45, amount: 1125000, color: "#43E8C5" }
    ],
    updates: [],
    itemDonations: [],
    createdAt: "2025-12-01",
  },
  {
    id: "c4",
    title: "Emergency Food Kits – Kerala Floods",
    slug: "emergency-food-kerala",
    shortDesc: "Distribute 10,000 food kits to families displaced by sudden flooding in northern Kerala.",
    description: "Unexpected cloudbursts have displaced 45,000 families across 3 districts in northern Kerala. We need to immediately distribute 10,000 food kits containing rice, dal, cooking oil, and hygiene items to last 2 weeks.",
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
      { label: "Food Kits", percentage: 75, amount: 1125000, color: "#FFB830" }
    ],
    updates: [],
    itemDonations: [],
    createdAt: "2026-04-10",
  },
  {
    id: "c5",
    title: "Skill Training for Rural Women",
    slug: "skill-training-women",
    shortDesc: "Train 500 rural women in digital skills, tailoring, and microenterprise to achieve financial independence.",
    description: "Financial independence for women transforms communities. Our 6-month intensive program trains 500 rural women aged 18-45 in digital literacy, tailoring & fashion design, and microenterprise management. We also provide startup capital and mentorship.",
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
      { label: "Training Centers", percentage: 35, amount: 1050000, color: "#FF6B8A" }
    ],
    updates: [],
    itemDonations: [],
    createdAt: "2026-02-01",
  },
  {
    id: "c6",
    title: "Stray Animal Rescue & Vaccination Drive",
    slug: "stray-animal-rescue",
    shortDesc: "Rescue, vaccinate and neuter 2,000 stray dogs and cats in Bengaluru's high-density areas.",
    description: "Bengaluru has over 3 lakh stray animals. We conduct rescue ops, provide veterinary care, vaccinate against rabies, neuter/spay to control population, and facilitate adoption. Every donation funds one animal's complete care cycle.",
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
      { label: "Veterinary Care", percentage: 50, amount: 1000000, color: "#43E8C5" }
    ],
    updates: [],
    itemDonations: [],
    createdAt: "2026-03-01",
  }
];

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function seed() {
  if (!firebaseConfig.projectId || firebaseConfig.projectId === 'your_project_id') {
    console.error('Error: Please configure your Firebase credentials in .env.local first!');
    process.exit(1);
  }

  console.log('Connecting to Firebase project:', firebaseConfig.projectId);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('Seeding campaigns collection...');
  let count = 0;
  
  for (const campaign of campaigns) {
    try {
      const docRef = doc(db, 'campaigns', campaign.id);
      await setDoc(docRef, campaign);
      console.log(`✅ Added campaign: ${campaign.title}`);
      count++;
    } catch (error) {
      console.error(`❌ Error adding campaign ${campaign.id}:`, error);
    }
  }

  console.log(`\n🎉 Successfully seeded ${count} campaigns to Firestore!`);
  process.exit(0);
}

seed();
