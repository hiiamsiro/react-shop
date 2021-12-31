import Header from 'Components/Header';
import ProductFeature from 'Features/Product/index.jsx';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import NotFound from './Components/NotFound';
import CartFeature from './Features/Cart';

function App() {

  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/"></Redirect>

        <Route path="/" component={ProductFeature} exact/>
        <Route path="/products" component={ProductFeature}/>
        <Route path="/cart" component={CartFeature}/>


        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
