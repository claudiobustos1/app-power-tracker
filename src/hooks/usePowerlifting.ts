import { useState, useEffect } from 'react';
import { Competitor, Attempt } from '../types';
import { calculateTotal, determineCategory, calculateWilksPoints, calculateGLPoints } from '../utils/calculations';

const STORAGE_KEY = 'powerlifting-app-data';

export const usePowerlifting = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as any[];
        return parsed.map(c => ({
          ...c,
          gender: c.gender || 'Masculino',
          equipment: c.equipment || 'Raw',
          age: c.age || 20,
          category: c.category || determineCategory(c.age || 20),
          wilksPoints: c.wilksPoints !== undefined ? c.wilksPoints : calculateWilksPoints(c),
          glPoints: c.glPoints !== undefined ? c.glPoints : calculateGLPoints(c)
        })) as Competitor[];
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(competitors));
  }, [competitors]);

  const addCompetitor = (name: string, gender: 'Masculino' | 'Femenino', equipment: string, age: number, bodyweight: number) => {
    const newCompetitor: Competitor = {
      id: crypto.randomUUID(),
      name,
      gender,
      equipment,
      age,
      category: determineCategory(age),
      bodyweight,
      squats: [],
      bench: [],
      deadlift: [],
      total: 0,
      wilksPoints: 0,
      glPoints: 0,
    };
    setCompetitors((prev) => [...prev, newCompetitor]);
  };

  const removeCompetitor = (id: string) => {
    setCompetitors((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCategory = (id: string, newCategory: string) => {
    setCompetitors((prev) => 
      prev.map((c) => {
        if (c.id !== id) return c;
        return { ...c, category: newCategory };
      })
    );
  };

  const addAttempt = (
    competitorId: string,
    liftType: 'squats' | 'bench' | 'deadlift',
    weight: number,
    successful: boolean
  ) => {
    setCompetitors((prev) =>
      prev.map((c) => {
        if (c.id !== competitorId) return c;
        
        const newAttempt: Attempt = { weight, successful };
        const updatedCompetitor = {
          ...c,
          [liftType]: [...c[liftType], newAttempt],
        };
        
        // Update the metrics automatically
        updatedCompetitor.total = calculateTotal(updatedCompetitor);
        updatedCompetitor.wilksPoints = calculateWilksPoints(updatedCompetitor);
        updatedCompetitor.glPoints = calculateGLPoints(updatedCompetitor);
        
        return updatedCompetitor;
      })
    );
  };
  
  const removeAttempt = (
      competitorId: string,
      liftType: 'squats' | 'bench' | 'deadlift',
      index: number
  ) => {
      setCompetitors((prev) => 
          prev.map((c) => {
              if (c.id !== competitorId) return c;
              
              const newAttempts = [...c[liftType]];
              newAttempts.splice(index, 1);
              
              const updatedCompetitor = {
                  ...c,
                  [liftType]: newAttempts,
              };
              
              updatedCompetitor.total = calculateTotal(updatedCompetitor);
              updatedCompetitor.wilksPoints = calculateWilksPoints(updatedCompetitor);
              updatedCompetitor.glPoints = calculateGLPoints(updatedCompetitor);
              return updatedCompetitor;
          })
      );
  }

  return {
    competitors,
    addCompetitor,
    removeCompetitor,
    updateCategory,
    addAttempt,
    removeAttempt
  };
};
