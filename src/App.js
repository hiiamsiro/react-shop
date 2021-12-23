import Header from 'Components/Header';
import ProductSkeletonList from 'Features/Product/components/ProductSkeletonList.jsx';
import ProductFeature from 'Features/Product/index.jsx';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import productApi from './api/productApi.js';
import './App.css';
import NotFound from './Components/NotFound';
import AlbumFeature from './Features/Album';
import TodoFeatures from './Features/Todo';

function App() {

  return (
    <div className="App">
      <Header />
      {/* <p><NavLink to="/todos" activeClassName="active">Todos</NavLink></p>
      <p><NavLink to="/albums" activeClassName="active">Albums</NavLink></p> */}

      <Switch>
        <Redirect from="/home" to="/"></Redirect>
        <Redirect from="/post-list/:postID" to="/post/:postID"></Redirect>

        <Route path="/" component={TodoFeatures} exact/>
        <Route path="/todos" component={TodoFeatures}/>
        <Route path="/albums" component={AlbumFeature}/>
        <Route path="/products" component={ProductFeature}/>


        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
