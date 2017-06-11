import React from 'react'

class AsyncComponent extends React.Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    component: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      component: null
    })
    props.load().then((component) => {
      this.setState({
        // handle both es imports and cjs
        component: component.default ? component.default : component
      })
    })
  }

  render() {
    return this.state.component ? this.props.children(this.state.component) : null
  }
}

export default AsyncComponent
