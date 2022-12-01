import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DetailVideogame from './components/DetailVideogame';
import CreateVideogame from './components/CreateVideogame'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/videogames/:id' component={DetailVideogame}></Route>
          <Route path='/videogames' component={Home}></Route>
          <Route path='/create' component={CreateVideogame}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;