import React from 'react'
import PropTypes from 'prop-types'

import { formatPrice } from '../helpers'
import fishModel from '../models/fish.model'

class Fish extends React.Component {
  static propTypes = {
    details: fishModel,
    addOrder: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired
  }

  addOrder = () => {
    this.props.addOrder(this.props.index)
  }
  render() {
    const { image, name, price, desc, status } = this.props.details
    const isAvailable = status === 'available'
    return (
      <li className="menu-fish">
        <img src={image} alt={image}/>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.addOrder}>{isAvailable ? 'Add To Card' : 'Sold out'}</button>
      </li>
    )
  }
}

export default Fish