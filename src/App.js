import styles from './App.module.css';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import MainPage from './components/MainPage';
import StateContextProvider from './context/StateContext';

const client = new ApolloClient({
  uri: 'https://react-graphql210516.herokuapp.com/graphql',
  headers: {
    authorization: localStorage.getItem('token')
      ? `JWT ${localStorage.getItem('token')}`
      : '',
  },
  cache: new InMemoryCache(), //apolloclientではクエリ結果をキャッシュに保存してくれる機能があるのでこのコードで保存してあげる
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StateContextProvider>
        <div className={styles.app}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route exact path="/employees" component={MainPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </StateContextProvider>
    </ApolloProvider>
  );
}

export default App;
