import React, { useState } from 'react';
import { Competitor } from '../types';
import { Trash2, Check, X } from 'lucide-react';
import { getHighestSuccessfulAttempt, CATEGORIES } from '../utils/calculations';

interface Props {
  competitor: Competitor;
  onAddAttempt: (id: string, liftType: 'squats' | 'bench' | 'deadlift', weight: number, successful: boolean) => void;
  onRemoveCompetitor: (id: string) => void;
  onRemoveAttempt: (id: string, liftType: 'squats' | 'bench' | 'deadlift', index: number) => void;
  onUpdateCategory: (id: string, newCategory: string) => void;
}

export const CompetitorCard: React.FC<Props> = ({ competitor, onAddAttempt, onRemoveCompetitor, onRemoveAttempt, onUpdateCategory }) => {
  const [activeTab, setActiveTab] = useState<'squats' | 'bench' | 'deadlift'>('squats');
  const [weightInput, setWeightInput] = useState('');
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState(competitor.category);

  const handleSaveCategory = () => {
    if (categoryInput.trim()) {
      onUpdateCategory(competitor.id, categoryInput.trim());
    }
    setIsEditingCategory(false);
  };

  const handleAddAttempt = (successful: boolean) => {
    if (!weightInput) return;
    onAddAttempt(competitor.id, activeTab, parseFloat(weightInput), successful);
    setWeightInput('');
  };

  const renderLiftSection = (liftType: 'squats' | 'bench' | 'deadlift', label: string) => {
    const attempts = competitor[liftType];
    const best = getHighestSuccessfulAttempt(attempts);

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-secondary" style={{ textTransform: 'capitalize' }}>{label}</h4>
          <span className="badge badge-neutral">Max: {best} kg</span>
        </div>
        
        <div className="flex gap-2 mb-4" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
          {attempts.map((attempt, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-1 glass-panel"
              style={{ padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.875rem', borderColor: attempt.successful ? 'var(--success)' : 'var(--danger)' }}
            >
              <span>{attempt.weight}kg</span>
              {attempt.successful ? <Check size={14} className="text-success" /> : <X size={14} className="text-danger" />}
              <button 
                onClick={() => onRemoveAttempt(competitor.id, liftType, idx)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '4px', opacity: 0.5 }}
                title="Eliminar intento"
              >
                <X size={12} color="white" />
              </button>
            </div>
          ))}
          {attempts.length === 0 && <span className="text-muted" style={{ fontSize: '0.875rem' }}>Sin intentos</span>}
        </div>

        {attempts.length < 3 && (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              className="input-field"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder="Peso (kg)"
              style={{ width: '100px', padding: '0.4rem 0.75rem' }}
            />
            <button 
              onClick={() => handleAddAttempt(true)} 
              className="btn" 
              style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', padding: '0.4rem 0.75rem' }}
              disabled={!weightInput}
            >
              <Check size={16} /> Válido
            </button>
            <button 
              onClick={() => handleAddAttempt(false)} 
              className="btn"
              style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '0.4rem 0.75rem' }}
              disabled={!weightInput}
            >
              <X size={16} /> Nulo
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="glass-panel p-6 flex flex-col" style={{ position: 'relative' }}>
      <button 
        onClick={() => onRemoveCompetitor(competitor.id)}
        className="btn-danger"
        style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.4rem', borderRadius: '8px' }}
        title="Eliminar competidor"
      >
        <Trash2 size={16} />
      </button>

      <div className="mb-4">
        <h3 className="title-gradient" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{competitor.name}</h3>
        <div className="text-secondary flex gap-2 flex-wrap items-center" style={{ fontSize: '0.875rem' }}>
          
          {isEditingCategory ? (
            <div className="flex gap-1 items-center">
              <select
                className="input-field" 
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                style={{ padding: '0.1rem 0.5rem', width: '150px', fontSize: '0.75rem', height: '24px' }}
                autoFocus
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button 
                onClick={handleSaveCategory}
                className="btn btn-primary" 
                style={{ padding: '0.15rem 0.4rem', fontSize: '0.65rem' }}
              >
                Guardar
              </button>
            </div>
          ) : (
            <span 
              className="badge badge-neutral" 
              onClick={() => setIsEditingCategory(true)}
              style={{ cursor: 'pointer' }}
              title="Click para editar categoría"
            >
              {competitor.category} ✎
            </span>
          )}

          <span className="badge badge-neutral" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)' }}>
            {competitor.gender === 'Femenino' ? '♀️' : '♂️'} {competitor.gender}
          </span>
          <span className="badge badge-neutral" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
            {competitor.equipment}
          </span>
          <span className="badge badge-neutral" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
            {competitor.age} años
          </span>
          <span>Peso Corporal: {competitor.bodyweight} kg</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 border-b border-color pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
        {(['squats', 'bench', 'deadlift'] as const).map((tab) => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? 'btn-primary' : ''}`}
            style={{ 
              background: activeTab === tab ? '' : 'transparent', 
              color: activeTab === tab ? '' : 'var(--text-secondary)',
              padding: '0.4rem 0.75rem'
            }}
            onClick={() => { setActiveTab(tab); setWeightInput(''); }}
          >
            {tab === 'squats' ? 'Sentadilla' : tab === 'bench' ? 'Banco' : 'Peso Muerto'}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        {activeTab === 'squats' && renderLiftSection('squats', 'Sentadilla')}
        {activeTab === 'bench' && renderLiftSection('bench', 'Press de Banca')}
        {activeTab === 'deadlift' && renderLiftSection('deadlift', 'Peso Muerto')}
      </div>

      <div className="mt-6 pt-4 flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-secondary font-medium text-xs">Puntos GL</span>
            <span className="text-primary font-bold">{competitor.glPoints}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary font-medium text-xs">Puntos Wilks</span>
            <span className="text-primary font-bold">{competitor.wilksPoints}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary font-medium text-xs">Puntos DOTS</span>
            <span className="text-primary font-bold">{competitor.dotsPoints}</span>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-secondary font-medium">Total:</span>
          <span className="title-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{competitor.total} kg</span>
        </div>
      </div>
    </div>
  );
};
