import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/Header.component';
import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/ShopPage.component';
import './App.css';


function App() {
  return (
    <div>
      <Header /> 
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>  
    </div>
  );
}

export default App;
