import { useState } from 'react';
import './ModeratorPanel.scss';

const ModeratorPanel = ({ onNextRound, onEndGame }: any) => {
  const [newRound, setNewRound] = useState(false);

  const handleNextRound = () => {
    onNextRound();
    setNewRound(true);
  };

  const handleEndGame = () => {
    onEndGame();
  };

  return (
    <div className='moderator-panel'>
      <h2 className='title'>Панель модератора</h2>
      <button className='button' onClick={handleNextRound} disabled={newRound}>
        Следующий раунд
      </button>
      <button className='button' onClick={handleEndGame}>
        Завершить игру
      </button>
    </div>
  );
};

export default ModeratorPanel;
