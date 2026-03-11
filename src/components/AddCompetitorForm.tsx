import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface Props {
  onAdd: (name: string, gender: string, equipment: string, age: number, bodyweight: number) => void;
}

export const AddCompetitorForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('selecionar');
  const [equipment, setEquipment] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && age && weight) {
      onAdd(name.trim(), gender, equipment, parseInt(age, 10), parseFloat(weight));
      setName('');
      setGender('');
      setEquipment('');
      setAge('');
      setWeight('');
    }
  };

  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="text-accent-primary" size={24} />
        <h2 className="title-gradient">Registrar Competidor</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 items-end flex-wrap">
        <div className="input-group" style={{ flex: '1 1 200px' }}>
          <label htmlFor="name" className="input-label">Nombre del Atleta</label>
          <input
            id="name"
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>

        <div className="input-group" style={{ flex: '1 1 120px' }}>
          <label htmlFor="gender" className="input-label">Género</label>
          <select
            id="gender"
            className="input-field"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="input-group" style={{ flex: '1 1 120px' }}>
          <label htmlFor="equipment" className="input-label">Modalidad</label>
          <select
            id="equipment"
            className="input-field"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Raw">Raw</option>
            <option value="Equipado">Equipado</option>
          </select>
        </div>

        <div className="input-group" style={{ flex: '1 1 100px' }}>
          <label htmlFor="age" className="input-label">Edad</label>
          <input
            id="age"
            type="number"
            className="input-field"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ej. 24"
            required
            min="1"
          />
        </div>

        <div className="input-group" style={{ flex: '1 1 150px' }}>
          <label htmlFor="weight" className="input-label">Peso Corporal (kg)</label>
          <input
            id="weight"
            type="number"
            step="0.01"
            className="input-field"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ej. 82.5"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ flex: '0 0 auto', height: '42px' }}>
          Registrar
        </button>
      </form>
    </div>
  );
};
