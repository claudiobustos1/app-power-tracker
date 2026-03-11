import React from 'react';
import { usePowerlifting } from './hooks/usePowerlifting';
import { AddCompetitorForm } from './components/AddCompetitorForm';
import { CompetitorCard } from './components/CompetitorCard';
import { RankingView } from './components/RankingView';
import { Trophy, Activity, Users, BarChart2 } from 'lucide-react';
import { Competitor } from './types';

function App() {
  const { competitors, addCompetitor, removeCompetitor, updateCategory, addAttempt, removeAttempt } = usePowerlifting();
  const [currentView, setCurrentView] = React.useState<'home' | 'ranking'>('home');
  
  // Sort competitors by total descending for stats computation
  const sortedCompetitors = [...competitors].sort((a, b) => b.total - a.total);

  // Group competitors by Category
  const groupedCompetitors = competitors.reduce((groups, competitor) => {
    const category = competitor.category || 'Sin Categoría';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(competitor);
    return groups;
  }, {} as Record<string, Competitor[]>);
  
  // Sort categories alphabetically
  const categories = Object.keys(groupedCompetitors).sort();

  return (
    <div className="container">
      <header className="mb-8 flex flex-col items-center justify-center text-center gap-4 mt-4">
        <div className="glass-panel" style={{ padding: '1rem', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)' }}>
          <Trophy size={48} className="text-accent-primary" />
        </div>
        <div>
          <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>PowerTracker Pro</h1>
          <p className="text-secondary mb-4">Gestión de Competición de Powerlifting</p>
          
          {currentView === 'home' && (
            <button 
              onClick={() => setCurrentView('ranking')}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--accent-primary)', color: 'var(--text-primary)' }}
            >
              <BarChart2 size={18} />
              Ver Ranking Global
            </button>
          )}
        </div>
      </header>

      {currentView === 'ranking' ? (
        <RankingView competitors={competitors} onBack={() => setCurrentView('home')} />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
          <Users size={24} className="text-accent-primary mb-2" />
          <h3 className="text-secondary text-sm mb-1">Atletas</h3>
          <p className="title-gradient text-2xl font-bold">{competitors.length}</p>
        </div>
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
          <Trophy size={24} className="text-success mb-2" />
          <h3 className="text-secondary text-sm mb-1">Mejor Total</h3>
          <p className="title-gradient text-2xl font-bold">
            {sortedCompetitors[0]?.total || 0} <span className="text-sm text-secondary font-normal">kg</span>
          </p>
        </div>
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
          <Activity size={24} className="mb-2" style={{ color: '#eab308' }} />
          <h3 className="text-secondary text-sm mb-1">Mejor GL Points</h3>
          <p className="title-gradient text-2xl font-bold">
            {competitors.length > 0 ? Math.max(...competitors.map(c => c.glPoints || 0)) : 0} <span className="text-sm text-secondary font-normal">pts</span>
          </p>
        </div>
      </div>

      <AddCompetitorForm onAdd={addCompetitor} />

      {competitors.length > 0 ? (
        <div className="flex flex-col gap-8">
          {categories.map((category) => (
            <div key={category} className="category-section">
              <h2 className="title-gradient mb-4 flex items-center gap-2" style={{ fontSize: '1.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <Trophy size={20} className="text-accent-primary" />
                {category}
                <span className="badge badge-neutral ml-2">{groupedCompetitors[category].length} atletas</span>
              </h2>
              <div className="grid grid-cols-2 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {groupedCompetitors[category]
                  .sort((a, b) => b.total - a.total)
                  .map((competitor, index) => (
                  <div key={competitor.id} style={{ position: 'relative' }}>
                    {index === 0 && competitor.total > 0 && (
                      <div 
                        className="badge badge-success" 
                        style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}
                      >
                        <Trophy size={12} className="mr-1" style={{ marginRight: '4px' }} /> Líder
                      </div>
                    )}
                    <CompetitorCard
                      competitor={competitor}
                      onAddAttempt={addAttempt}
                      onRemoveAttempt={removeAttempt}
                      onRemoveCompetitor={removeCompetitor}
                      onUpdateCategory={updateCategory}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-8 text-center mt-8">
          <Trophy size={48} className="text-muted mx-auto mb-4" opacity={0.5} />
          <h3 className="text-secondary text-xl">Sin competidores registrados</h3>
          <p className="text-muted mt-2">Añade un atleta para comenzar la competición.</p>
        </div>
      )}
      </>
      )}
    </div>
  );
}

export default App;
