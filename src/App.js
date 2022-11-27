import React, { Component } from 'react';


import styles from './App.module.css';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Container/BurgerBuilder/BurgenBuilder';


class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
