// Game Data Loader Utility
import { useGameStore } from '../hooks/useGameStore';

// Campus Map Data
export const campusMapData = {
  name: "NIT Campus",
  description: "Interactive map of NIT campus with hotspots",
  hotspots: [
    {
      id: "main_entrance",
      name: "Main Entrance",
      description: "Welcome to NIT Campus",
      coordinates: { x: 50, y: 80 },
      type: "entrance",
      level: 1,
      qrCode: "stall_1",
    },
    {
      id: "library",
      name: "Library",
      description: "Knowledge hub of the campus",
      coordinates: { x: 30, y: 60 },
      type: "academic",
      level: 3,
      qrCode: "stall_3",
    },
    {
      id: "canteen",
      name: "Canteen",
      description: "Food and refreshment area",
      coordinates: { x: 70, y: 40 },
      type: "facility",
      level: 7,
      qrCode: "stall_7",
    },
    {
      id: "sports_complex",
      name: "Sports Complex",
      description: "Basketball court and sports facilities",
      coordinates: { x: 20, y: 20 },
      type: "sports",
      level: 5,
      qrCode: "stall_5",
    },
    {
      id: "auditorium",
      name: "Auditorium",
      description: "Main auditorium for events",
      coordinates: { x: 80, y: 60 },
      type: "event",
      level: 1,
      qrCode: "stall_2",
    },
    {
      id: "parking_area",
      name: "Parking Area",
      description: "Student and staff parking",
      coordinates: { x: 90, y: 80 },
      type: "facility",
      level: 1,
      qrCode: "stall_4",
    },
    {
      id: "academic_block_a",
      name: "Academic Block A",
      description: "Main academic building",
      coordinates: { x: 40, y: 40 },
      type: "academic",
      level: 2,
      qrCode: "stall_6",
    },
    {
      id: "academic_block_b",
      name: "Academic Block B",
      description: "Secondary academic building",
      coordinates: { x: 60, y: 30 },
      type: "academic",
      level: 4,
      qrCode: "stall_8",
    },
  ],
  background: "/images/campus-map.png",
  width: 800,
  height: 600,
};

// Game Levels Data
export const gameLevelsData = [
  {
    id: 1,
    name: "Campus Orientation",
    description: "Explore the campus and find your first checkpoint",
    type: "physical",
    required: "QR scan at main entrance",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Navigate to the main entrance",
      "Scan the QR code located there",
      "Complete the orientation challenge",
    ],
    hints: [
      "Look for the main gate",
      "QR code is near the entrance sign",
    ],
  },
  {
    id: 2,
    name: "Digital Challenge",
    description: "Complete the online puzzle challenge",
    type: "software",
    required: "Solve the puzzle",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Solve the mathematical puzzle",
      "Find the pattern in the sequence",
      "Submit your answer",
    ],
    hints: [
      "Look for patterns in numbers",
      "Try different mathematical operations",
    ],
  },
  {
    id: 3,
    name: "Library Quest",
    description: "Navigate to the library and scan the QR code",
    type: "physical",
    required: "QR scan at library",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Find the library building",
      "Locate the QR code inside",
      "Scan and complete the task",
    ],
    hints: [
      "Library is in the academic area",
      "QR code is near the entrance",
    ],
  },
  {
    id: 4,
    name: "Code Breaker",
    description: "Decrypt the hidden message",
    type: "software",
    required: "Decrypt the code",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Decode the encrypted message",
      "Use the provided cipher",
      "Submit the decoded text",
    ],
    hints: [
      "Try Caesar cipher",
      "Look for common patterns",
    ],
  },
  {
    id: 5,
    name: "Sports Arena",
    description: "Visit the sports complex and complete the challenge",
    type: "physical",
    required: "QR scan at sports complex",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Go to the sports complex",
      "Find the QR code near the basketball court",
      "Complete the sports challenge",
    ],
    hints: [
      "Sports complex is near the entrance",
      "Look around the basketball court",
    ],
  },
  {
    id: 6,
    name: "Logic Puzzle",
    description: "Solve the mathematical puzzle",
    type: "software",
    required: "Solve the puzzle",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Solve the logic puzzle",
      "Use deductive reasoning",
      "Submit your solution",
    ],
    hints: [
      "Draw a diagram",
      "Use process of elimination",
    ],
  },
  {
    id: 7,
    name: "Canteen Hunt",
    description: "Find the hidden QR code in the canteen area",
    type: "physical",
    required: "QR scan at canteen",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Navigate to the canteen",
      "Search for the hidden QR code",
      "Complete the food-related challenge",
    ],
    hints: [
      "Canteen is in the central area",
      "QR code might be hidden",
    ],
  },
  {
    id: 8,
    name: "Final Challenge",
    description: "Complete the ultimate software challenge",
    type: "software",
    required: "Complete the challenge",
    points: 10,
    isUnlocked: true,
    instructions: [
      "Solve the final puzzle",
      "Combine all your skills",
      "Submit the final answer",
    ],
    hints: [
      "Think outside the box",
      "Use all previous knowledge",
    ],
  },
  {
    id: 9,
    name: "Treasure Hunt Finale",
    description: "Find the ultimate treasure using all your skills",
    type: "treasure",
    required: "Find the treasure QR",
    points: 50,
    isUnlocked: false,
    instructions: [
      "Use all your collected clues",
      "Find the hidden treasure location",
      "Scan the final treasure QR code",
    ],
    hints: [
      "Combine all previous QR codes",
      "Look for patterns in locations",
    ],
  },
];

// QR Codes Data
export const qrCodesData = {
  teams: Array.from({ length: 30 }, (_, i) => ({
    id: `team_${i + 1}`,
    type: 'team',
    name: `Team ${i + 1}`,
    points: 3,
    description: `Scan ${i + 1} team's QR code`,
    image: `/qr-codes/teams/team_${i + 1}.png`,
  })),
  stalls: Array.from({ length: 30 }, (_, i) => ({
    id: `stall_${i + 1}`,
    type: 'stall',
    name: `Stall ${i + 1}`,
    points: 5,
    description: `Visit stall ${i + 1}`,
    location: `Location ${i + 1}`,
    image: `/qr-codes/stalls/stall_${i + 1}.png`,
  })),
  treasures: Array.from({ length: 10 }, (_, i) => ({
    id: `treasure_${i + 1}`,
    type: 'treasure',
    name: `Treasure ${i + 1}`,
    points: 10,
    priority: i + 1,
    description: `Find treasure ${i + 1}`,
    location: `Hidden location ${i + 1}`,
    image: `/qr-codes/treasures/treasure_${i + 1}.png`,
  })),
};

// Load Game Data
export const loadGameData = async () => {
  try {
    // Load campus map data
    const mapData = campusMapData;
    
    // Load game levels
    const levels = gameLevelsData;
    
    // Load QR codes
    const qrCodes = qrCodesData;
    
    // Preload critical images
    await preloadImages([
      '/images/campus-map.png',
      '/images/mascot-3d.png',
      '/images/logo.png',
    ]);
    
    // Preload QR code images (first few)
    const qrImages = [
      ...qrCodes.teams.slice(0, 5).map(qr => qr.image),
      ...qrCodes.stalls.slice(0, 5).map(qr => qr.image),
      ...qrCodes.treasures.slice(0, 3).map(qr => qr.image),
    ];
    await preloadImages(qrImages);
    
    console.log('Game data loaded successfully');
    return { mapData, levels, qrCodes };
  } catch (error) {
    console.error('Failed to load game data:', error);
    throw error;
  }
};

// Preload Images
const preloadImages = async (imageUrls) => {
  const promises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });
  
  try {
    await Promise.all(promises);
    console.log('Images preloaded successfully');
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Get Campus Map Hotspot
export const getCampusHotspot = (hotspotId) => {
  return campusMapData.hotspots.find(hotspot => hotspot.id === hotspotId);
};

// Get Level Data
export const getLevelData = (levelId) => {
  return gameLevelsData.find(level => level.id === levelId);
};

// Get QR Code Data
export const getQRCodeData = (qrId) => {
  const allQRCodes = [
    ...qrCodesData.teams,
    ...qrCodesData.stalls,
    ...qrCodesData.treasures,
  ];
  return allQRCodes.find(qr => qr.id === qrId);
};

// Validate QR Code
export const validateQRCode = (qrId) => {
  const qrCode = getQRCodeData(qrId);
  return qrCode !== undefined;
};

// Get Available Hotspots for Level
export const getHotspotsForLevel = (levelId) => {
  return campusMapData.hotspots.filter(hotspot => hotspot.level === levelId);
};

// Get Game Progress Data
export const getGameProgressData = () => {
  const { team } = useGameStore.getState();
  
  if (!team) return null;
  
  const totalLevels = gameLevelsData.length;
  const completedLevels = team.completedLevels?.length || 0;
  const totalQRs = qrCodesData.teams.length + qrCodesData.stalls.length + qrCodesData.treasures.length;
  const scannedQRs = team.scannedQRs?.length || 0;
  
  return {
    levels: {
      total: totalLevels,
      completed: completedLevels,
      percentage: Math.round((completedLevels / totalLevels) * 100),
    },
    qrCodes: {
      total: totalQRs,
      scanned: scannedQRs,
      percentage: Math.round((scannedQRs / totalQRs) * 100),
    },
    points: team.points || 0,
    currentLevel: team.currentLevel || 1,
  };
};

