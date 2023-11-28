import { useState } from 'react';
import Player from './Player';
import ModeratorPanel from './ModeratorPanel';
import './Game.scss';

const Game = () => {
  // Пример данных о игроках (ваша логика может быть разной)
  const initialPlayers = [
    { id: 1, name: 'Игрок 1', role: 'Мафия', alive: true },
    { id: 2, name: 'Игрок 2', role: 'Комисар', alive: true },
    { id: 3, name: 'Игрок 3', role: 'Мафия', alive: true },
    { id: 4, name: 'Игрок 4', role: 'Мирный', alive: true },
    { id: 5, name: 'Игрок 5', role: 'Мирный', alive: true },
    { id: 6, name: 'Игрок 6', role: 'Мафия', alive: true },
    { id: 7, name: 'Игрок 7', role: 'Мирный', alive: true },
    { id: 8, name: 'Игрок 8', role: 'Мирный', alive: true },
    { id: 9, name: 'Игрок 9', role: 'Мирный', alive: true },
    { id: 10, name: 'Игрок 10', role: 'Мирный', alive: true },
  ];

  const [players, setPlayers] = useState(initialPlayers);

  // Пример функции для убийства игрока
  const killPlayer = (playerId: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId ? { ...player, alive: false } : player
      )
    );
  };

  const handleNextRound = () => {
    // Логика для начала нового раунда
    console.log('Начинаем новый раунд');
  };

  const handleEndGame = () => {
    // Логика для завершения игры
    console.log('Игра завершена');
  };

  return (
    <div className='game-container'>
      <h2 className='title'>Игра в "Мафию"</h2>
      <div className='player-list'>
        {players.map(player => (
          <Player
            key={player.id}
            id={player.id}
            name={player.name}
            role={player.role}
            alive={player.alive}
            onKill={killPlayer}
          />
        ))}
      </div>
      <button className='button'>Следующий раунд</button>
      <ModeratorPanel onNextRound={handleNextRound} onEndGame={handleEndGame} />
    </div>
  );
};

export default Game;
