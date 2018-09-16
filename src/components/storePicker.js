import React from 'react'
import PropTypes from 'prop-types'

import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  myInput = React.createRef()

  static propTypes = {
    history: PropTypes.object
  }

  goToStore = e => {
    e.preventDefault()
    const storeName = this.myInput.current.value
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          required
          placeholder="Store name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit store</button>
      </form>
    )
  }
}

export default StorePicker