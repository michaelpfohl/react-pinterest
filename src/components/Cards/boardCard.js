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
    const { board } = this.props;
    return (
      <div>
        <Card className='board-card'>
          <CardImg
            top
            width='100%'
            src={board.imageUrl}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">{board.name}</CardTitle>
            <CardText>
                {board.description}
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BoardCard;
