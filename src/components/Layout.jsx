import React, { Component } from 'react';
import logo from './logo.svg';
import './Layout.css';
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class App extends Component {
  constructor(props) {
    super(props);

    this.domRefs = {
      logo: undefined,
    };
  }
  componentDidMount() {
    console.log(this.domRefs.logo);
    this.logoSnap = Snap(this.domRefs.logo);

    Snap.load(logo, (data) => {
      console.log(data.node);
      this.domRefs.logo.append(data.node);
    });
  }

  render() {
    return (
      <div className="Layout">
        <header className="header-container">
          <svg id="logo" className="logo" ref={dom => this.domRefs.logo = dom}></svg>
        </header>
        <div className="main-container">
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
      </div>
    );
  }
}

export default App;
