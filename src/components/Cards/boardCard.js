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
            <CardTitle tag="h5">{board.name}</CardTitle>
            <CardText>
                {board.description}
            </CardText>
            <Button className="btn-info">
              <Link to={`/boards/${board.firebaseKey}`}>View Pins</Link>
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BoardCard;
