import React from 'react'
import PropTypes from 'prop-types'
// components
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

import base from '../base'

import fishes from '../sample-fishes'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    // this.loadSampleFishes()
    const { params } = this.props.match
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    // Sync state with firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    // for updating component state
    // 1. Take a copy of the existing state - performance, security
    const fishes = { ...this.state.fishes }
    // 2. Add our new fish to that copies state field with unic key
    fishes[`fish${Date.now()}`] = fish
    // 3. Set the new object to state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  deleteFish = key => {
    const fishes = { ...this.state.fishes }
    // We cant use delete if we bind state with Google firebase, need to set item value to null
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes })
  }

  addOrder = key => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  deleteOrder = key => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine="Fresh seafood market"/>
          <ul className="fishes">
            { Object.keys(this.state.fishes)
              .filter(key => this.state.fishes[key] !== null)
              .map(key => (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addOrder={this.addOrder}
                />
              ))
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteOrder={this.deleteOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}
// to take and send all fields of states to another component -> that`s js => { ...this.state }
export default App