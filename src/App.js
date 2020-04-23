import React, { Component } from 'react';

import Blog from './containers/Blog/Blog';
//In order to implement routing the React startard is to install:
// -- react-router-dom : this pacakge allows you to manipulate the dom with react-router logic
// -- this builds on top of the older react-router package
//This is not created by facebook but is seen as the startard
import { BrowserRouter }from 'react-router-dom';

class App extends Component {
  //basename is the base root understood by the react router. This is crucial when deploying on sub directories.
  render() {
    //You need to wrap those components which need to understand routing. This typically means the highest parent components
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
