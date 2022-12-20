import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';


import styles from './App.module.css';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Container/BurgerBuilder/BurgenBuilder';
import Checkout from './Container/Checkout/Checkout';


class App extends Component {

  render() {
    return (
      <div className={styles.App}>
        <Layout>
          <Routes>
          <Route path="/" element={<BurgerBuilder />}/>
          <Route path="/checkout" element={<Checkout />}/>
          </Routes>
        </Layout>
      </div>
    );
  }
}

export default App;
