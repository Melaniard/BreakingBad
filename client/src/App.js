import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CharacterCreate from './components/CharacterCreate';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/character' component={CharacterCreate}/>
        <Route path='/details/:id' component={Details}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;