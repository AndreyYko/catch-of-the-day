import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'

import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'

import fishModel from '../models/fish.model'
import base, { firebaseApp } from '../base'

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.objectOf(fishModel).isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
  }

  state = {
    uid: null,
    owner: null
  }

  isLoaded = false

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler(user)
      }
      this.isLoaded = true
    })
  }

  authHandler = async (data) => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this })
    // 2. Claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: data.user.uid
      })
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: data.uid || data.user.uid,
      owner: store.owner || (data.uid || data.user.uid)
    })
  }

  authenticate = service => {
    const authProvider = new firebase.auth[`${service}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch(err => {
        console.log('Something went wrong :( ', err)
      })
  }

  logOut = async () => {
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    if (!this.isLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }

    const logout = <button onClick={this.logOut}>Log Out!</button>

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner :(</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        <br/>
        <br/>
        {Object.keys(this.props.fishes)
          .filter(key => this.props.fishes[key] !== null)
          .map(key => (
            <EditFishForm
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
            />
          ))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory