// Currency utility for Indian Rupees (INR)

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatINRWithDecimals = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Convert USD to INR (approximate rate: 1 USD = 83 INR)
export const convertUSDToINR = (usdAmount: number): number => {
  const exchangeRate = 83; // Approximate current rate
  return Math.round(usdAmount * exchangeRate);
};

// Price ranges in INR
export const priceRanges = {
  budget: [
    "₹40,000 - ₹1,25,000",
    "₹1,25,000 - ₹2,50,000", 
    "₹2,50,000 - ₹6,25,000",
    "₹6,25,000 - ₹12,50,000",
    "₹12,50,000+"
  ],
  gemstones: {
    diamond: "₹83,000 - ₹41,50,000+",
    ruby: "₹66,000 - ₹20,75,000+",
    sapphire: "₹50,000 - ₹16,60,000+",
    emerald: "₹33,000 - ₹12,45,000+",
    pearl: "₹8,300 - ₹4,15,000+"
  },
  metals: {
    gold18k: "₹5,000 - ₹6,600 per gram",
    gold22k: "₹5,800 - ₹7,500 per gram", 
    roseGold: "₹5,400 - ₹7,100 per gram",
    whiteGold: "₹5,400 - ₹7,100 per gram",
    platinum: "₹2,900 - ₹4,150 per gram"
  }
};

// Common ring prices in INR
export const ringPrices = {
  traditionalLotus: "₹2,07,500",
  royalSignet: "₹2,90,500", 
  sacredOm: "₹3,32,000",
  peacockMotif: "₹1,49,000",
  customEngagement: "₹4,32,000",
  traditionalWedding: "₹2,32,000",
  lotusEngagement: "₹2,85,000",
  royalWedding: "₹3,25,000",
  templeArchitecture: "₹2,25,000",
  mangalsutra: "₹1,95,000"
};
