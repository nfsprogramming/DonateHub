import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Campaign } from '../types';
import { mockCampaigns } from '../mockData';

const CAMPAIGNS_COLLECTION = 'campaigns';

/**
 * Fetches all campaigns from Firestore. Falls back to mockData if Firebase is unconfigured or empty.
 */
export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.warn('Firebase config missing. Falling back to mock data.');
      return mockCampaigns;
    }
    
    const q = query(collection(db, CAMPAIGNS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.warn('Firestore is empty. Falling back to mock data.');
      return mockCampaigns;
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Campaign[];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return mockCampaigns; // Fallback
  }
};

/**
 * Fetches a single campaign by slug.
 */
export const getCampaignBySlug = async (slug: string): Promise<Campaign | undefined> => {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      return mockCampaigns.find(c => c.slug === slug);
    }

    const q = query(collection(db, CAMPAIGNS_COLLECTION), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return mockCampaigns.find(c => c.slug === slug);
    }
    
    const docData = querySnapshot.docs[0];
    return { id: docData.id, ...docData.data() } as Campaign;
  } catch (error) {
    console.error('Error fetching campaign by slug:', error);
    return mockCampaigns.find(c => c.slug === slug);
  }
};
