import React, { useState } from 'react';
import { Competitor } from '../types';
import { Trophy, ArrowLeft } from 'lucide-react';

interface Props {
  competitors: Competitor[];
  onBack: () => void;
}

type SortOption = 'Total' | 'GLPoints' | 'Wilks';

export const RankingView: React.FC<Props> = ({ competitors, onBack }) => {
  const [sortBy, setSortBy] = useState<SortOption>('GLPoints');

  const sortedCompetitors = [...competitors].sort((a, b) => {
    if (sortBy === 'Total') return b.total - a.total;
    if (sortBy === 'GLPoints') return b.glPoints - a.glPoints;
    if (sortBy === 'Wilks') return b.wilksPoints - a.wilksPoints;
    return 0;
  });

  return (
    <div className="container" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <button 
        onClick={onBack} 
        className="btn btn-primary mb-6"
        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
      >
        <ArrowLeft size={18} />
        Volver a Competencia
      </button>

      <div className="glass-panel p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3 items-center">
            <Trophy className="text-warning" size={32} style={{ color: '#eab308' }} />
            <h2 className="title-gradient text-2xl">Ranking Global</h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              className={`btn ${sortBy === 'GLPoints' ? 'btn-primary' : ''}`}
              style={sortBy !== 'GLPoints' ? { background: 'var(--bg-tertiary)' } : {}}
              onClick={() => setSortBy('GLPoints')}
            >
              GL Points
            </button>
            <button 
              className={`btn ${sortBy === 'Wilks' ? 'btn-primary' : ''}`}
              style={sortBy !== 'Wilks' ? { background: 'var(--bg-tertiary)' } : {}}
              onClick={() => setSortBy('Wilks')}
            >
              Wilks2
            </button>
            <button 
              className={`btn ${sortBy === 'Total' ? 'btn-primary' : ''}`}
              style={sortBy !== 'Total' ? { background: 'var(--bg-tertiary)' } : {}}
              onClick={() => setSortBy('Total')}
            >
              Total kg
            </button>
          </div>
        </div>

        {sortedCompetitors.length === 0 ? (
          <p className="text-secondary text-center py-8">No hay competidores registrados aún.</p>
        ) : (
          <div className="overflow-x-auto" style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th className="p-4 text-secondary font-medium">Pos.</th>
                  <th className="p-4 text-secondary font-medium">Atleta</th>
                  <th className="p-4 text-secondary font-medium">Categoría</th>
                  <th className="p-4 text-secondary font-medium text-center">GL Points</th>
                  <th className="p-4 text-secondary font-medium text-center">Wilks</th>
                  <th className="p-4 text-secondary font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {sortedCompetitors.map((competitor, idx) => (
                  <tr 
                    key={competitor.id} 
                    style={{ 
                      borderBottom: '1px solid var(--glass-border)',
                      background: idx === 0 ? 'rgba(234, 179, 8, 0.05)' : idx === 1 ? 'rgba(148, 163, 184, 0.05)' : idx === 2 ? 'rgba(180, 83, 9, 0.05)' : 'transparent'
                    }}
                  >
                    <td className="p-4">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}°`}
                    </td>
                    <td className="p-4 font-bold">
                      {competitor.name}
                      <div className="text-secondary text-xs mt-1">
                        {competitor.gender} • {competitor.bodyweight} kg • {competitor.equipment}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="badge badge-neutral">{competitor.category}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={sortBy === 'GLPoints' ? 'title-gradient font-bold' : ''}>
                        {competitor.glPoints}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={sortBy === 'Wilks' ? 'title-gradient font-bold' : ''}>
                        {competitor.wilksPoints}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={sortBy === 'Total' ? 'title-gradient font-bold' : ''}>
                        {competitor.total} kg
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
