import { useState } from 'react';
import { Link } from 'react-router-dom';
import './RoleSelection.scss';

const RoleSelection = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(
        selectedRoles.filter(selectedRole => selectedRole !== role)
      );
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='text-center'>
        <h2 className='title'>Выберите роли для игры</h2>
        <div className='role-list'>
          <div
            className={`role-item ${
              selectedRoles.includes('mafia') ? 'selected' : ''
            }`}
            onClick={() => toggleRole('mafia')}
          >
            Мафия
          </div>
          <div
            className={`role-item ${
              selectedRoles.includes('doctor') ? 'selected' : ''
            }`}
            onClick={() => toggleRole('doctor')}
          >
            Комисар
          </div>
          <div
            className={`role-item ${
              selectedRoles.includes('simple') ? 'selected' : ''
            }`}
            onClick={() => toggleRole('simple')}
          >
            Мирный
          </div>
          {/* Добавьте другие роли по мере необходимости */}
        </div>
        <Link to='/game' className='button'>
          Начать игру
        </Link>
      </div>
    </div>
  );
};

export default RoleSelection;
