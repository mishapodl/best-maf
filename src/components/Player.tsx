import './Player.scss'; // Импорт файла стилей SCSS

const Player = ({ id, name, role, alive, onKill }: any) => {
  return (
    <div
      className={`player-item ${alive ? 'alive' : 'dead'}`}
      onClick={() => onKill(id)}
    >
      {name} - {role} ({alive ? 'Жив' : 'Мертв'})
    </div>
  );
};

export default Player;
