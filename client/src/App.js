import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import Home from './pages/home/Home';
import GameForm from './components/gameForm/GameForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/header';
import Profile from './pages/Profile';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>

      <Router>
        <Header />
        <div>
          {/* <div className="flex-column justify-center align-center min-100-vh bg-primary"> */}
          <Switch>
            {/* <Route
              path="/"
              component={Home}
            /> */}
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/signup"
              component={Signup}
            />
            <Route
              path="/profile"
              component={Profile}
            />
            <Route
              path="/gameform"
              component={GameForm}
            />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
