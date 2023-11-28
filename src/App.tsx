import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import RoleSelection from './components/RoleSelection';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/role-selection' component={RoleSelection} />
        <Route path='/game' component={Game} />
        {/* Добавьте другие маршруты по мере необходимости */}
      </Switch>
    </Router>
  );
}

export default App;
