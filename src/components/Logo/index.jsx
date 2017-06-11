import React from 'react'
import logo from './logo.svg'
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`)

class Logo extends React.Component {
  constructor(props) {
    super(props)

    this.domRefs = {
      logo: undefined,
    }
  }

  componentDidMount() {
    this.logoSnap = Snap(this.domRefs.logo)

    Snap.load(logo, (data) => {
      this.domRefs.logo.append(data.node)
    })
  }

  render() {
    return(
      <svg id="logo" className="logo" ref={dom => this.domRefs.logo = dom}></svg>
    )
  }
}

export default Logo
