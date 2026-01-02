export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string; // require('./path/to/image')
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Pranay Kumar Mamidi',
    role: 'Founder & CEO',
  image: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1762096294/WhatsApp_Image_2025-11-02_at_20.40.43_ddd4c1c5_bzssdi.jpg',
    bio: "Visionary leader and the driving force behind Green Legacy's mission to plant change.",
  },
  {
    id: '2',
    name: 'Varshitha Bommisetti',
    role: 'Operations Head',
  image: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1766557357/Screenshot_2025-10-04_234345_bpn2uh.jpg',
    bio: 'Orchestrates on-ground drives, logistics, and partnerships with precision and passion.',
  },
  {
    id: '3',
    name: 'Soba Reddy Maddula',
    role: 'Volunteer Management',
  image: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1766557395/Screenshot_2025-10-04_234901_xnnsoa.png',
    bio: 'Builds and nurtures our vibrant volunteer community, ensuring every hand makes a difference.',
  },
  {
    id: '4',
    name: 'Varshini Motamarri',
    role: 'Content & Design Lead',
  image: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1766557464/Screenshot_2025-10-04_235412_zje61w.png',
    bio: 'Crafts compelling stories, visuals, and campaigns that bring our green message to life.',
  },
  {
    id: '5',
    name: 'Chakradhar Reddi',
    role: 'Tech Lead',
  image: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1762096294/WhatsApp_Image_2025-11-02_at_20.40.43_ddd4c1c5_bzssdi.jpg',
    bio: 'Powers our digital presence and tools, from the Green Legacy app to the tree tracker.',
  },
  {
    id: '6',
    name: 'Sai Kumar Bayineni',
    role: 'CSR, Donor Relations & Finance',
  image: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1766557531/Screenshot_2025-10-05_113652_fihp8k.png',
    bio: 'Bridges the gap between purpose and partnership, managing donor engagement and financial transparency.',
  },
  {
    id: '7',
    name: 'Subbarao Mamidi',
    role: 'Advisor',
  image: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1762096294/WhatsApp_Image_2025-11-02_at_20.40.43_ddd4c1c5_bzssdi.jpg',
    bio: 'Guides our strategy with wisdom, experience, and unwavering support.',
  },
];