// import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
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

type PlayerType = {
  id: 'maf' | 'don' | 'res' | 'com' | 'doc' | 'bit';
  name: 'Мафия' | 'Дон' | 'Комисар' | 'Житель' | 'Доктор' | 'Шлюха';
  active: boolean;
  numberPlayer?: number;
};

const roles10: PlayerType[] = [
  { id: 'maf', name: 'Мафия', active: false },
  { id: 'maf', name: 'Мафия', active: false },
  { id: 'don', name: 'Дон', active: false },
  { id: 'com', name: 'Комисар', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
];

const roles12: PlayerType[] = [
  { id: 'maf', name: 'Мафия', active: false },
  { id: 'maf', name: 'Мафия', active: false },
  { id: 'don', name: 'Дон', active: false },
  { id: 'com', name: 'Комисар', active: false },
  { id: 'maf', name: 'Мафия', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'res', name: 'Житель', active: false },
  { id: 'doc', name: 'Доктор', active: false },
  { id: 'bit', name: 'Шлюха', active: false },
];

const shuffle = (array: PlayerType[]) => {
  return array.sort(() => Math.random() - 0.5);
};

type PlayerTypes = {
  listPlayers: PlayerType[];
};

const Players = ({ listPlayers }: PlayerTypes) => {
  // const playersTabel = [...listPlayers];

  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
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
                background: 'red',
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
          {listPlayers.map((player: PlayerType) => (
            <TableRow
              key={player.numberPlayer}
              sx={{
                padding: '0 10px',
                // background: player.id === 'com' ? 'black !important' : '',
              }}
              className={player.id}
            >
              <TableCell
                component='th'
                scope='row'
                sx={{
                  padding: '5px 10px',
                  borderRight: '1px solid',
                  color: player.id === 'don' ? '#fff !important' : '',
                  width: '24px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
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
                  color: player.id === 'don' ? '#fff !important' : '',
                }}
              >
                {player.name}
              </TableCell>
              <TableCell
                component='th'
                scope='row'
                sx={{
                  padding: '10px 10px',
                  fontSize: '16px',
                  color: player.id === 'don' ? '#fff !important' : '',
                }}
              ></TableCell>
              <TableCell
                component='th'
                scope='row'
                sx={{
                  padding: '0 5px',
                  width: '24px',
                  fontSize: '20px',
                  color: player.id === 'don' ? '#fff !important' : '',
                  borderLeft: '1px solid',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              ></TableCell>
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
                >
                  {player.active ? 'У' : '+'}
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
};

const CreateRoles = ({ countPlayers }: CreateRolesTypes) => {
  const listRoles: typeof roles10 = countPlayers === '10' ? roles10 : roles12;

  const [listPlayers, setListPlayers] = useState<PlayerType[]>([]);
  const [activeList, setActiveList] = useState(false);
  const [isSelect, setIsSelect] = useState<number | null>(null);
  const [isSave, setIsSave] = useState<boolean>(false);

  const shuffeldListPlayers = useMemo(() => shuffle(listRoles), []);

  const handleAddPlayer = () => {
    const index = isSelect as number;
    const role = listRoles[index];
    listRoles[index] = { ...listRoles[index], active: true };

    setListPlayers([
      ...(listPlayers as any),
      {
        id: role.id,
        name: role.name,
        active: true,
        numberPlayer: listPlayers.length + 1,
      },
    ]);
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
        {shuffeldListPlayers.map((role, i) => {
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

  return (
    <>
      {activeList && renderListRoles()}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '90%',
          margin: '0 auto',
          border: '1px solid',
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
          Add Role
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
          Save
        </Button>
      </Box>
      <Container>
        <Players listPlayers={listPlayers} />
      </Container>
    </>
  );
};

const Home = () => {
  const [countPlayers, setCountPlayers] = useState<'' | '10' | '12'>('');
  const [nextStep, setNextStep] = useState<boolean>(false);

  const handleChange = (value: any) => {
    setCountPlayers(value.target.value);
  };

  return (
    <>
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
              border: 1,
              p: '10px',
              textAlign: 'center',
            }}
          >
            <FormControl>
              <FormLabel id='demo-controlled-radio-buttons-group'>
                Кiлькiсть
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
                  ackground: '#ffffff96',
                }}
              >
                <FormControlLabel value='10' control={<Radio />} label='10' />
                <FormControlLabel value='12' control={<Radio />} label='12' />
              </RadioGroup>
            </FormControl>
          </Box>

          <Button
            disabled={!countPlayers}
            onClick={() => setNextStep(true)}
            variant='contained'
            size='medium'
            style={{
              outline: 'none',
            }}
          >
            Далi
          </Button>
        </Box>
      </Container>

      {nextStep && <CreateRoles countPlayers={countPlayers} />}
    </>
  );
};

export default Home;
