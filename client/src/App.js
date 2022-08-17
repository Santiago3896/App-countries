import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from './components/Home';
import Detail from './components/Detail';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/Detail/:id" component={Detail}/>
      <Route exact path="/Activitys" component={CreateActivity}/>
    </Switch>
    </div>
    </BrowserRouter>// TODA MI APP VA A TENER ACCESO A LAS RUTAS
  );
}

export default App;
