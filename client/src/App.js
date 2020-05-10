import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import NotesPage from './screens/notes/NotesPage';
import HomePage from './screens/home/HomePage';
import TodosPage from './screens/todos/TodosPage';
import './App.css';

// Redux conf
const store = createStore(reducer);

// Apollo conf
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});
const client = new ApolloClient({
  cache,
  link,
});

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/todos">
            <TodosPage />
          </Route>
          <Route path="/notes">
            <NotesPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  </Provider>
);

export default App;
