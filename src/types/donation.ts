export type OccasionType = 'Birthday' | 'Anniversary' | 'In Memory' | 'Festival / Other';

export interface TreeOption {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
}

export interface DonationData {
  occasion?: OccasionType;
  tree?: TreeOption;
  recipientName: string;
  occasionDate: string; // ISO string or simple text for now
  message: string;
  donorEmail: string;
}

export interface DonationContextType {
  donationData: DonationData;
  updateDonationData: (data: Partial<DonationData>) => void;
  resetDonationData: () => void;
}
