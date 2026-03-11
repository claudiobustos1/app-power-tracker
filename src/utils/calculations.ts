import { Competitor, Attempt } from '../types';

export const getHighestSuccessfulAttempt = (attempts: Attempt[]): number => {
  const successful = attempts.filter((a) => a.successful);
  if (successful.length === 0) return 0;
  return Math.max(...successful.map((a) => a.weight));
};

export const calculateTotal = (competitor: Competitor): number => {
  const bestSquat = getHighestSuccessfulAttempt(competitor.squats);
  const bestBench = getHighestSuccessfulAttempt(competitor.bench);
  const bestDeadlift = getHighestSuccessfulAttempt(competitor.deadlift);
  
  return bestSquat + bestBench + bestDeadlift;
};

export const calculateAverageTotal = (competitors: Competitor[]): number => {
  if (competitors.length === 0) return 0;
  const sum = competitors.reduce((acc, comp) => acc + calculateTotal(comp), 0);
  return Math.round((sum / competitors.length) * 100) / 100;
};

export const CATEGORIES = [
  'Sub-Junior (14-18)',
  'Junior (19-23)',
  'Open (24-39)',
  'Master 1 (40-49)',
  'Master 2 (50-59)',
  'Master 3 (60-69)',
  'Master 4 (70+)'
];

export const determineCategory = (age: number): string => {
  if (age <= 18) return CATEGORIES[0];
  if (age <= 23) return CATEGORIES[1];
  if (age <= 39) return CATEGORIES[2];
  if (age <= 49) return CATEGORIES[3];
  if (age <= 59) return CATEGORIES[4];
  if (age <= 69) return CATEGORIES[5];
  return CATEGORIES[6];
};

export const calculateWilksPoints = (competitor: Competitor): number => {
  if (competitor.total === 0 || !competitor.bodyweight) return 0;
  
  const bw = competitor.bodyweight;
  const isFemale = competitor.gender === 'Femenino';
  
  let a, b, c, d, e, f;
  
  if (isFemale) {
    a = 594.3164775;
    b = -27.23842536;
    c = 0.8211222687;
    d = -0.00930737376;
    e = 4.7315822e-5;
    f = -9.054e-8;
  } else {
    // Coeficientes masculinos
    a = -216.0475144;
    b = 16.2606339;
    c = -0.002388645;
    d = -0.00113732;
    e = 7.01863e-6;
    f = -1.291e-8;
  }
  
  const denominator = a + (b * bw) + (c * Math.pow(bw, 2)) + (d * Math.pow(bw, 3)) + (e * Math.pow(bw, 4)) + (f * Math.pow(bw, 5));
  
  if (denominator === 0) return 0; // Prevent division by zero error
  
  const wilksPoints = competitor.total * (600 / denominator);
  return Math.round(wilksPoints * 100) / 100;
};

export const calculateGLPoints = (competitor: Competitor): number => {
  if (competitor.total === 0 || !competitor.bodyweight || !competitor.gender || !competitor.equipment) return 0;

  // IPF GL Coefficients (Powerlifting 3-lift)
  let A = 0, B = 0, C = 0;
  
  const isEquipped = competitor.equipment === 'Equipado';
  const isFemale = competitor.gender === 'Femenino';
  
  if (isFemale) {
    if (isEquipped) {
      A = 758.63878; B = 949.31382; C = 0.02435;
    } else {
      // Classic/Raw Female
      A = 610.32796; B = 1045.59282; C = 0.03048;
    }
  } else {
    // Coeficientes masculinos
    if (isEquipped) {
      A = 1236.25115; B = 1449.21864; C = 0.01644;
    } else {
      // Classic/Raw Male
      A = 1199.72839; B = 1025.18162; C = 0.00921;
    }
  }

  const denominator = A - B * Math.exp(-C * competitor.bodyweight);
  if (denominator <= 0) return 0; 

  const glPoints = competitor.total * (100 / denominator);
  return Math.round(glPoints * 100) / 100; // Round to 2 decimals
};

export const calculateDOTS = (competitor: Competitor): number => {
  if (competitor.total === 0 || !competitor.bodyweight) return 0;

  const bw = competitor.bodyweight;
  const isFemale = competitor.gender === 'Femenino';

  let a, b, c, d, e;

  if (isFemale) {
    a = -0.0000010706;
    b = 0.0005158568;
    c = -0.1126655495;
    d = 13.6175032;
    e = -57.96288;
  } else {
    // Masculino
    a = -0.0000010930;
    b = 0.0007391293;
    c = -0.1918759221;
    d = 24.0900756;
    e = -307.75076;
  }

  const denominator = a * Math.pow(bw, 4) + b * Math.pow(bw, 3) + c * Math.pow(bw, 2) + d * bw + e;

  if (denominator === 0) return 0;

  const multiplier = 500 / denominator;
  const dots = competitor.total * multiplier;
  
  return Math.round(dots * 100) / 100;
};

