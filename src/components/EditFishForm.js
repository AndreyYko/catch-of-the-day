import React from 'react'
import PropTypes from 'prop-types'

import fishModel from '../models/fish.model'

class EditFishForm extends React.Component {
  static propTypes = {
    fish: fishModel,
    updateFish: PropTypes.func.isRequired
  }

  handleChange = e => {
    // Update that fish in states
    // 1. Make copy of that fish and overwrite changes filed
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.name === 'price' ? +e.currentTarget.value : e.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    return (
      <div className="fish-edit">
        <input type="text" name="name" value={this.props.fish.name} onChange={this.handleChange}/>
        <input type="text" name="price" value={this.props.fish.price} onChange={this.handleChange}/>
        <select name="status" value={this.props.fish.status} onChange={this.handleChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={this.props.fish.desc} onChange={this.handleChange}/>
        <input type="text" name="image" value={this.props.fish.image} onChange={this.handleChange}/>
        <button onClick={() => this.props.deleteFish(this.props.index)}>Delete Fish</button>
      </div>
    )
  }
}

export default EditFishForm