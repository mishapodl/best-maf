// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.scss';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { TableBody, TableCell, TableHead } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTimer } from 'react-timer-hook';

type PlayerType = {
  id: 'maf' | 'don' | 'res' | 'com' | 'doc' | 'bit' | string;
  name: 'Мафия' | 'Дон' | 'Комисар' | 'Житель' | 'Доктор' | 'Шлюха';
  active: boolean;
  numberPlayer?: number;
};

const roles10: PlayerType[] = [
  { id: 'maf-1', name: 'Мафия', active: false },
  { id: 'maf-2', name: 'Мафия', active: false },
  { id: 'don', name: 'Дон', active: false },
  { id: 'com', name: 'Комисар', active: false },
  { id: 'res-1', name: 'Житель', active: false },
  { id: 'res-2', name: 'Житель', active: false },
  { id: 'res-3', name: 'Житель', active: false },
  { id: 'res-4', name: 'Житель', active: false },
  { id: 'res-5', name: 'Житель', active: false },
  { id: 'res-6', name: 'Житель', active: false },
];

const roles12: PlayerType[] = [
  { id: 'maf-1', name: 'Мафия', active: false },
  { id: 'maf-2', name: 'Мафия', active: false },
  { id: 'don', name: 'Дон', active: false },
  { id: 'com', name: 'Комисар', active: false },
  { id: 'res-1', name: 'Житель', active: false },
  { id: 'res-2', name: 'Житель', active: false },
  { id: 'res-3', name: 'Житель', active: false },
  { id: 'res-4', name: 'Житель', active: false },
  { id: 'res-5', name: 'Житель', active: false },
  { id: 'maf-3', name: 'Мафия', active: false },
  { id: 'bit', name: 'Шлюха', active: false },
  { id: 'doc', name: 'Доктор', active: false },
];

type StorageKeys =
  | 'countPlayers'
  | 'nextStep'
  | 'playersTabel'
  | 'listRoles'
  | 'listPlayers'
  | 'activeList'
  | 'isSelect'
  | 'isSave'
  | 'startGame';

const storage = {
  get: (key: StorageKeys) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove: (key: StorageKeys) => {
    localStorage.removeItem(key);
  },
  set: (key: StorageKeys, value: string | object | boolean | number) => {
    return localStorage.setItem(key, JSON.stringify(value));
  },
};

const MyTimer = ({ expiryTimestamp }: any) => {
  const { seconds, start, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  return (
    <div
      style={{
        textAlign: 'center',
        border: '1px solid black',
        padding: '10px',
        borderRadius: '10px',
        background: '#b9cbcd',
        marginTop: '15px',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          color: 'black',
        }}
      >
        <span
          style={{
            marginBottom: '10px',
          }}
        >
          {seconds}
        </span>
      </div>
      <button
        onClick={start}
        style={{
          width: '23%',
          marginRight: '5px',
          color: '#fff',
          padding: '5px',
        }}
      >
        Start
      </button>
      <button
        onClick={pause}
        style={{
          width: '23%',
          marginRight: '5px',
          color: '#fff',
          padding: '5px',
        }}
      >
        Pause
      </button>
      <button
        onClick={resume}
        style={{
          width: '23%',
          marginRight: '5px',
          color: '#fff',
          padding: '5px',
        }}
      >
        Resume
      </button>
      <button
        style={{ width: '23%', color: '#fff', padding: '5px' }}
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button>
    </div>
  );
};

const Popup = ({ resetGame, setShow }: any) => {
  return (
    <>
      <div
        style={{
          background: '#0000008c',
          position: 'fixed',
          height: '100vh',
          top: 0,
          width: '100%',
          left: 0,
        }}
      ></div>
      <Container
        sx={{
          margin: '0',
          border: '1px solid black',
          position: 'fixed',
          width: '95%',
          display: 'flex',
          height: '200px',
          justifyContent: 'space-around',
          padding: '50px 5px',
          top: '30%',
          background: '#84ea7a',
          borderRadius: '10px',
          alignItems: 'center',
          zIndex: 200,
        }}
      >
        <Button
          onClick={() => {
            console.log(233);
            resetGame();
            setShow(false);
          }}
          variant='contained'
          sx={{
            width: '20%',
            height: '50px',
            background: 'red',
          }}
        >
          ДА
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            setShow(false);
          }}
          sx={{
            width: '45%',
            height: '100px',
          }}
        >
          НЕТ
        </Button>
      </Container>
    </>
  );
};

const EmojiPicker = ({ onSelectEmoji, countListPlayers }: any) => {
  const lengthPlayers = storage.get('countPlayers');

  const emojis =
    lengthPlayers === '10' ? ['🔪'] : ['❤️‍🩹', '➕', '🔪', '🤐', '💕'];

  return (
    <div
      style={{
        border: '1px solid #ccc',
        background: '#fff',
        borderRadius: '10px',
        fontSize: '24px',
      }}
    >
      {emojis.map((emoji, index) => (
        <div
          key={index}
          style={{ padding: '1px', cursor: 'pointer' }}
          onClick={() => onSelectEmoji(emoji)}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

type PlayerTypes = {
  listPlayers: PlayerType[];
  changeStatusUser: any;
};

const Players = ({ listPlayers, changeStatusUser }: PlayerTypes) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(
    Array(listPlayers.length).fill(false)
  );
  const [inputValues, setInputValues] = useState(
    Array(listPlayers.length).fill('')
  );

  const toggleEmojiPicker = (index: any) => {
    const newShowEmojiPicker = [...showEmojiPicker];
    newShowEmojiPicker[index] = !newShowEmojiPicker[index];
    setShowEmojiPicker(newShowEmojiPicker);
  };
  const handleEmojiClick = (emoji: any, index: any) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = inputValues[index] + emoji;
    setInputValues(newInputValues);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: '20px', overflow: 'visible' }}
    >
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell
              align='left'
              sx={{
                padding: '5px 10px',
                background: 'darkorange',
                borderRight: '1px solid',
                borderBottom: '1px solid',
                width: '24px',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              #
            </TableCell>
            <TableCell
              align='left'
              sx={{
                padding: '5px 10px',
                fontSize: '16px',
                background: 'navajowhite',
                borderRight: '1px solid',
                borderBottom: '1px solid',
              }}
            >
              Роли
            </TableCell>
            <TableCell
              align='left'
              sx={{
                padding: '5px 10px',
                fontSize: '16px',
                background: 'navajowhite',
                borderRight: '1px solid',
                borderBottom: '1px solid',
              }}
            >
              Действия
            </TableCell>
            <TableCell
              align='center'
              sx={{
                padding: '5px 5px',
                fontSize: '16px',
                background: '#1565c0',
                borderRight: '1px solid',
                borderBottom: '1px solid',
                width: '10px',
              }}
            >
              В
            </TableCell>
            <TableCell
              align='center'
              sx={{
                padding: '5px 5px',
                fontSize: '16px',
                background: '#000',
                borderRight: '1px solid black',
                borderBottom: '1px solid black',
                width: '20px',
                color: '#fff',
              }}
            >
              X
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listPlayers.map((player: PlayerType, index: any) => (
            <TableRow
              key={player.numberPlayer}
              sx={{
                padding: '0 10px',
              }}
              className={player.id}
            >
              <TableCell
                component='th'
                scope='row'
                sx={{
                  padding: '5px 10px',
                  borderRight: '1px solid',
                  // color:
                  //   player.id === 'don' ? '#fff !important' : '#fff !important',
                  color: player.active
                    ? player.id === 'don'
                      ? 'white !important'
                      : player.id === 'com'
                      ? 'black !important'
                      : ''
                    : 'white !important',
                  width: '24px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  background: player.active
                    ? player.id === 'com'
                      ? ''
                      : ''
                    : 'black !important',
                }}
              >
                {player.numberPlayer}
              </TableCell>
              <TableCell
                component='th'
                scope='row'
                sx={{
                  padding: '10px 10px',
                  fontSize: '16px',
                  width: '60px',
                  borderRight: '1px solid',
                  // color: player.id === 'don' ? '#fff !important' : '',
                  background: player.active ? '' : 'black !important',
                  color: player.active
                    ? player.id === 'don'
                      ? '#fff !important'
                      : ''
                    : 'white !important',
                }}
              >
                {player.name}
              </TableCell>
              <TableCell
                component='th'
                scope='row'
                sx={{
                  fontSize: '16px',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  color: player.active
                    ? player.id === 'don'
                      ? '#fff !important'
                      : ''
                    : 'black !important',
                  background: player.active
                    ? player.id === 'com'
                      ? ''
                      : ''
                    : 'black !important',
                  height: player.active ? '' : '43px',
                }}
              >
                {player.active && (
                  <input
                    style={{
                      width: '90%',
                      border: '0',
                      padding: '0',
                      color: player.id === 'don' ? 'white' : 'black',
                      height: '50px',
                      background: 'transparent',
                      paddingLeft: '10px',
                      fontSize: '30px',
                      outline: 'none',
                    }}
                    maxLength={10}
                    value={inputValues[index]}
                    onChange={e => {
                      const newInputValues = [...inputValues];
                      newInputValues[index] = e.target.value;
                      setInputValues(newInputValues);
                    }}
                  />
                )}
                {player.active && (
                  <button
                    onClick={() => toggleEmojiPicker(index)}
                    style={{
                      fontSize: '20px',
                      padding: '2px',
                      marginRight: '8px',
                    }}
                  >
                    🤦‍♀️
                  </button>
                )}
                {player.active && (
                  <Box
                    sx={{
                      position: 'absolute',
                      zIndex: 200,
                      borderRadius: '10px',
                      right: '-34px',
                      top: '8px',
                      fontSize: '20px',
                      color: 'red',
                    }}
                  >
                    {showEmojiPicker[index] && (
                      <EmojiPicker
                        onSelectEmoji={(emoji: any) => {
                          console.log(emoji);
                          handleEmojiClick(emoji, index);
                        }}
                        countListPlayers={listPlayers.length}
                      />
                    )}
                  </Box>
                )}
              </TableCell>
              <TableCell
                component='th'
                scope='row'
                sx={{
                  padding: '0 5px',
                  width: '24px',
                  fontSize: '20px',
                  borderLeft: '1px solid',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  background: player.active ? '' : 'black !important',
                  color: player.active
                    ? player.id === 'don'
                      ? '#fff !important'
                      : ''
                    : 'black !important',
                }}
              >
                {player.active && (
                  <input
                    maxLength={2}
                    style={{
                      width: '100%',
                      border: '0',
                      padding: '0',
                      paddingLeft: '0',
                      color: player.id === 'don' ? 'white' : 'black',
                      height: '50px',
                      background: 'transparent',
                      fontSize: '20px',
                      textAlign: 'center',
                      outline: 'none',
                    }}
                  />
                )}
              </TableCell>
              <TableCell
                component='th'
                scope='row'
                sx={{
                  padding: '0 5px',
                  width: '24px',
                  fontSize: '20px',
                  borderLeft: '1px solid',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  background: player.active
                    ? player.id === 'com'
                      ? ''
                      : ''
                    : 'black !important',
                }}
              >
                <Button
                  sx={{
                    width: '24px',
                    padding: 0,
                    background: player.active ? 'green' : 'red',
                    minWidth: 'unset',
                    color: '#000',
                  }}
                  variant='contained'
                  onClick={() => changeStatusUser(index)}
                >
                  {player.active ? 'У' : 'В'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type CreateRolesTypes = {
  countPlayers: '' | '10' | '12';
  setResetGame: any;
  setCountPlayers: any;
  setNextStep: any;
  activeList: any;
  setActiveList: any;
  setStartGame: any;
  startGame: any;
};

const CreateRoles = ({
  countPlayers,
  setResetGame,
  setCountPlayers,
  setNextStep,
  activeList,
  setActiveList,
  setStartGame,
  startGame,
}: CreateRolesTypes) => {
  const listRoles: any =
    storage.get('listRoles') || (countPlayers === '10' ? roles10 : roles12);

  const [roles, setRoles] = useState<PlayerType[]>(
    storage.get('listRoles') || listRoles
  );
  const [listPlayers, setListPlayers] = useState<PlayerType[]>(
    storage.get('listPlayers') || []
  );

  const [isSelect, setIsSelect] = useState<number | null>(
    storage.get('isSelect') || null
  );

  const [isSave, setIsSave] = useState<boolean>(storage.get('isSave') || false);
  const [isChangedStatus, setIsChangedStatus] = useState(false);
  const [showPopup, setShow] = useState<boolean>(false);

  useEffect(() => {
    storage.set('listPlayers', listPlayers);
  }, [listPlayers]);

  useEffect(() => {
    storage.set('listRoles', roles);
  }, [roles]);

  useEffect(() => {
    isChangedStatus === true &&
      setListPlayers(storage.get('listPlayers') || []);
    setIsChangedStatus(false);
  }, [isChangedStatus]);

  useEffect(() => {
    storage.set('startGame', startGame);
  }, [startGame]);

  const changeStatusUser = (index: any) => {
    setListPlayers((prevListPlayers: any) => {
      const newListPlayers = [...prevListPlayers];
      newListPlayers[index] = {
        ...newListPlayers[index],
        active: !newListPlayers[index].active,
      };

      setIsChangedStatus(true);

      storage.set('listPlayers', newListPlayers);

      return newListPlayers;
    });
  };

  const handleAddPlayer = () => {
    const index = isSelect as number;
    const role = listRoles[index];

    const updatedRoles = roles.map(player => {
      return role.id === player.id ? { ...player, active: true } : player;
    });

    setRoles(updatedRoles);

    const player = {
      id: role.id,
      name: role.name,
      active: true,
      numberPlayer: listPlayers.length + 1,
    };

    setListPlayers([...(listPlayers as any), player]);

    setIsSave(false);
  };

  const renderListRoles = () => {
    return (
      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '200px',
          marginBottom: '20px',
        }}
      >
        {roles.map((role, i) => {
          return (
            <Button
              key={i}
              disabled={role.active}
              onClick={() => {
                setIsSelect(i);
                setIsSave(true);
              }}
              variant='contained'
              sx={{
                width: '29%',
                height: '40px',
                background:
                  role.active || isSelect === i ? '#818181 !important' : '',
                border: role.active ? '1px solid #929292' : '',
                color: role.active ? '#9a9a9a' : '',
              }}
              className={role.id}
            >
              {role.name}
            </Button>
          );
        })}
      </Container>
    );
  };

  const resetGame = () => {
    setRoles([]);
    setListPlayers([]);
    setActiveList(false);
    setIsSelect(null);
    setIsSave(false);
    setCountPlayers('');
    setNextStep(false);
    storage.remove('activeList');
    storage.remove('countPlayers');
    storage.remove('isSave');
    storage.remove('isSelect');
    storage.remove('listPlayers');
    storage.remove('listRoles');
    storage.remove('playersTabel');
    storage.remove('nextStep');
    setResetGame(true);
    storage.remove('startGame');
    setStartGame(false);
  };

  return (
    <>
      {activeList && listPlayers.length !== +countPlayers && renderListRoles()}
      {listPlayers.length !== +countPlayers && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
            margin: '0 auto',
            border: '2px solid black',
            padding: '7px',
            borderRadius: '10px',
          }}
        >
          <Button
            onClick={() => setActiveList(true)}
            disabled={activeList}
            variant='contained'
            sx={{
              width: '110px',
            }}
          >
            Добавить
          </Button>
          {activeList && (
            <Button
              onClick={() => {
                setIsSave(false);
                setActiveList(false);
                setIsSelect(null);
              }}
              variant='contained'
              sx={{
                background: 'red',
                color: 'white',
              }}
            >
              X
            </Button>
          )}
          <Button
            disabled={!isSave}
            onClick={handleAddPlayer}
            variant='contained'
            sx={{
              width: '110px',
            }}
          >
            Сохранить
          </Button>
        </Box>
      )}
      {countPlayers && (
        <Container>
          <Players
            listPlayers={listPlayers}
            changeStatusUser={changeStatusUser}
          />
        </Container>
      )}

      {countPlayers && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '15px 0',
          }}
        >
          {!startGame && (
            <Button
              variant='contained'
              sx={{
                width: '100%',
                margin: '0 16px',
                height: '50px',
              }}
              disabled={listPlayers.length !== +countPlayers}
              onClick={() => {
                setStartGame(true);
              }}
            >
              Начать игру
            </Button>
          )}

          <Button
            disabled={startGame && listPlayers.length !== +countPlayers}
            variant='contained'
            sx={{
              width: '100%',
              margin: '0 16px',
              height: '50px',
            }}
            onClick={() => {
              setShow(true);
            }}
          >
            Сбросить
          </Button>
        </Box>
      )}
      {showPopup && <Popup resetGame={resetGame} setShow={setShow} />}
    </>
  );
};

const Home = () => {
  const [countPlayers, setCountPlayers] = useState<'' | '10' | '12'>(
    storage.get('countPlayers') || ''
  );
  const [nextStep, setNextStep] = useState<boolean>(
    storage.get('nextStep') || false
  );
  const [activeList, setActiveList] = useState(
    storage.get('activeList') || false
  );

  const [restGame, setResetGame] = useState<boolean>(false);
  const [startGame, setStartGame] = useState<boolean>(
    storage.get('startGame') || false
  );

  useEffect(() => {
    storage.set('countPlayers', countPlayers);
    storage.set('nextStep', nextStep);
  }, [countPlayers]);

  useEffect(() => {
    storage.set('activeList', activeList);
  }, [activeList]);

  useEffect(() => {
    storage.set('nextStep', nextStep);
  }, [nextStep]);

  const handleChange = (value: any) => {
    setCountPlayers(value.target.value);
  };

  return (
    <>
      {!nextStep && (
        <Container
          sx={{
            padding: '0 !important',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              margin: '0 auto',
              padding: '10px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '200px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                border: '2px solid black',
                p: '10px',
                textAlign: 'center',
                color: '#fff',
              }}
            >
              <FormControl>
                <FormLabel
                  sx={{
                    color: '#000 !important',
                  }}
                  id='demo-controlled-radio-buttons-group'
                >
                  Игроки
                </FormLabel>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  value={countPlayers}
                  onChange={handleChange}
                  defaultValue={null}
                  sx={{
                    padding: '0 10px',
                    borderRadius: '10px',
                  }}
                >
                  <FormControlLabel
                    sx={{
                      color: '#000',
                    }}
                    value='10'
                    control={<Radio />}
                    label='10'
                  />
                  <FormControlLabel
                    sx={{
                      color: '#000',
                    }}
                    value='12'
                    control={<Radio />}
                    label='12'
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Button
              disabled={!countPlayers}
              onClick={() => {
                // setActiveList(true);
                setNextStep(true);
              }}
              variant='contained'
              size='medium'
              style={{
                outline: 'none',
              }}
            >
              Дальше
            </Button>
          </Box>
        </Container>
      )}
      {startGame && <MyTimer />}

      {nextStep && (
        <CreateRoles
          countPlayers={countPlayers}
          setResetGame={setResetGame}
          setCountPlayers={setCountPlayers}
          setNextStep={setNextStep}
          activeList={activeList}
          setActiveList={setActiveList}
          setStartGame={setStartGame}
          startGame={startGame}
        />
      )}

      {/* <button
        onClick={() => {
          storage.remove('activeList');
          storage.remove('countPlayers');
          storage.remove('isSave');
          storage.remove('isSelect');
          storage.remove('listPlayers');
          storage.remove('listRoles');
          storage.remove('playersTabel');
          storage.remove('nextStep');
          storage.remove('startGame');
          setStartGame(false);
          setActiveList(false);
          setCountPlayers('');
          setNextStep(false);
        }}
      >
        x
      </button> */}
    </>
  );
};

export default Home;
