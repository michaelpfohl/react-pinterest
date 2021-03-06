import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';

class BoardForm extends Component {
  state = {
    firebaseKey: this.props.board?.firebaseKey || '',
    name: this.props.board?.name || '',
    imageUrl: this.props.board?.imageUrl || '',
    description: this.props.board?.description || '',
    userId: this.props.board?.userId || '',
  };

  componentDidMount() {
    const userId = getUser.getUid();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.firebaseKey === '') {
      boardsData.createBoard(this.state).then(() => {
        this.props.onUpdate?.();
      });
    } else {
      boardsData.updateBoard(this.state).then(() => {
        this.props.onUpdate?.(this.state.firebaseKey);
      });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.handleSubmit} className="add-board-form">
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Board Name"
            className="form-control form-control-lg m-1"
            required
          />
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Board Description"
            className="form-control form-control-lg m-1"
            required
          />
          <input
            type="url"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
            placeholder="Enter an Image URL or Upload a File"
            className="form-control form-control-lg m-1"
            required
          />
          <input
            className="m-2"
            type="file"
            id="myFile"
            name="filename"
            accept="image/*"
            onChange={this.handleChange}
          />
          <button className="btn form-button form-button-text mt-1">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default BoardForm;
