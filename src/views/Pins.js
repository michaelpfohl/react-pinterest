import React, { Component } from 'react';
import authData from '../helpers/data/authData';
import pinsData from '../helpers/data/pinsData';

import UserPins from '../components/UserPins';
import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';

// export default function Pins() {
//   state = {
//     pins: [],
//   };

//   componentDid

//   getUserPins = () => {
//     const user = authData.getUid();
//     pinsData.getAllPins().then((response) => {
//       const userPins = Object.values(response).filter((pin) => pin.userId === user);
//       this.setState({
//         pins: userPins,
//       });
//     });
//   }

//   return (
//     <div>
//       <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
//         <PinForm onUpdate={this.getPins} />
//       </AppModal>
//       <UserPins pins={pins}/>
//     </div>
//   );
// }

class Pins extends Component {
  state = {
    pins: [],
  }

  componentDidMount() {
    this.getUserPins();
  }

  getUserPins = () => {
    const user = authData.getUid();
    pinsData.getAllPins().then((response) => {
      const userPins = Object.values(response).filter((pin) => pin.userId === user);
      this.setState({
        pins: userPins,
      });
    });
  }

  render() {
    const { pins } = this.state;
    return (
      <div>
        <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
          <PinForm onUpdate={this.getUserPins} />
        </AppModal>
        <UserPins pins={pins}/>
    </div>
    );
  }
}

export default Pins;
