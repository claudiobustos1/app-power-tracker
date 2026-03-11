export interface Attempt {
  weight: number;
  successful: boolean;
}

export interface Competitor {
  id: string;
  name: string;
  gender: string;
  equipment: string;
  age: number;
  category: string;
  bodyweight: number;
  squats: Attempt[];
  bench: Attempt[];
  deadlift: Attempt[];
  total: number;
  wilksPoints: number;
  glPoints: number;
}
