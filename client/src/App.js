import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const App = () =>
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/notes">
        Notes page
      </Route>
      <Route path="/">
        Home page
      </Route>
    </Switch>
  </Router>;


export default App;
