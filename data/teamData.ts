export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: any; // require('./path/to/image')
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Pranay Kumar Mamidi',
    role: 'Founder & CEO',
    image: require('../assets/team/pranay.jpg'),
    bio: "Visionary leader and the driving force behind Green Legacy's mission to plant change.",
  },
  {
    id: '2',
    name: 'Varshitha Bommisetti',
    role: 'Operations Head',
    image: require('../assets/team/varshitha.jpg'),
    bio: 'Orchestrates on-ground drives, logistics, and partnerships with precision and passion.',
  },
  {
    id: '3',
    name: 'Soba Reddy Maddula',
    role: 'Volunteer Management',
    image: require('../assets/team/soba.jpg'),
    bio: 'Builds and nurtures our vibrant volunteer community, ensuring every hand makes a difference.',
  },
  {
    id: '4',
    name: 'Varshini Motamarri',
    role: 'Content & Design Lead',
    image: require('../assets/team/varshini.jpg'),
    bio: 'Crafts compelling stories, visuals, and campaigns that bring our green message to life.',
  },
  {
    id: '5',
    name: 'Chakradhar Reddi',
    role: 'Tech Lead',
    image: require('../assets/team/chakradhar.jpg'),
    bio: 'Powers our digital presence and tools, from the Green Legacy app to the tree tracker.',
  },
  {
    id: '6',
    name: 'Sai Kumar Bayineni',
    role: 'CSR, Donor Relations & Finance',
    image: require('../assets/team/sai.jpg'),
    bio: 'Bridges the gap between purpose and partnership, managing donor engagement and financial transparency.',
  },
  {
    id: '7',
    name: 'Subbarao Mamidi',
    role: 'Advisor',
    image: require('../assets/team/subbarao.jpg'),
    bio: 'Guides our strategy with wisdom, experience, and unwavering support.',
  },
];