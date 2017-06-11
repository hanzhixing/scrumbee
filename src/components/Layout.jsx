import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Logo from './Logo'
import AsyncHome from './Home/async'
import AsyncAbout from './About/async'
import './Layout.css'

class Layout extends Component {
  // constructor(props) {
  //   super(props)
  // }

  // componentDidMount() {
  // }

  render() {
    return (
      <Router>
        <div className="Layout">
            <header className="header-container"><Logo /></header>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
              </ul>
            </nav>

            <div className="main-container">
              <Route exact path="/" component={AsyncHome}/>
              <Route path="/about" component={AsyncAbout}/>
            </div>
        </div>
      </Router>
    )
  }
}

export default Layout
