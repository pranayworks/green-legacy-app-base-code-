import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DonationData, DonationContextType } from '../types/donation';

const defaultData: DonationData = {
  recipientName: '',
  occasionDate: '',
  message: '',
  donorEmail: '',
};

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider = ({ children }: { children: ReactNode }) => {
  const [donationData, setDonationData] = useState<DonationData>(defaultData);

  const updateDonationData = (data: Partial<DonationData>) => {
    setDonationData((prev) => ({ ...prev, ...data }));
  };

  const resetDonationData = () => {
    setDonationData(defaultData);
  };

  return (
    <DonationContext.Provider value={{ donationData, updateDonationData, resetDonationData }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};
