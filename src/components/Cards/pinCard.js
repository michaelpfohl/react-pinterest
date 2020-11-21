import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AppModal from '../AppModal';
import BoardDropdown from '../BoardDropdown';

class PinCard extends Component {
  render() {
    const { pin, removePin } = this.props;
    return (
      <div>
        <Card className='board-card'>
          <CardImg
            top
            width='100%'
            src={pin.imageUrl}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5" className="card-title">{pin.name}</CardTitle>
            <CardText className="card-description">
                {pin.description}
            </CardText>
            <Button className="card-button">
              <Link className="card-button-text" to={`/pins/${pin.firebaseKey}`}>View Pin</Link>
            </Button>
            <Button id={pin.firebaseKey} onClick={(e) => removePin(e)}>Delete</Button>
            <AppModal title={'Pin to Board'} buttonLabel={'Pin to Board'}>
              <BoardDropdown pin={pin.firebaseKey}/>
            </AppModal>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default PinCard;
