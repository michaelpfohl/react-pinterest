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
            <CardTitle tag="h5" className="card-title">{board.name}</CardTitle>
            <CardText className="card-description">
                {board.description}
            </CardText>
            <Button className="card-button">
              <Link to={`/boards/${board.firebaseKey}`} className="card-button-text">View Pins</Link>
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BoardCard;
