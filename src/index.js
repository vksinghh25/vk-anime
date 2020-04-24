import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Anime from './Anime';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({
  // uri: 'https://32ypr38l61.sse.codesandbox.io/'
  uri: 'https://graphql.anilist.co/'
})

const client = new ApolloClient({
  cache,
  link
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}><Anime /></ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
