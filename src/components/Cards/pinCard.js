import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

class BoardCard extends Component {
  render() {
    const { pin } = this.props;
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
            <CardTitle tag="h5">{pin.name}</CardTitle>
            <CardText>
                {pin.description}
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BoardCard;
