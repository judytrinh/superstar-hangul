import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';

/**
 * Select the song to play.
 */
export default class LevelSelectScreen extends Component {
  state = { name: 'level select screen' };

  render() {
    const { name } = this.state;
    return (
        <div id="level-select-screen">
        <h5>Choose a song.</h5>
            <br />
        <CardDeck>
            <Card>
                <CardImg top width="100%" src="src/images/hugMe.jpg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>V, J-hope - 안아줘 (Hug me)</CardTitle>
                  <Button outline color="info">Easy</Button>
                </CardBody>
            </Card>
            
            <Card>
                <CardImg top width="100%" src="src/images/laVieEnRose.jpg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>IZ*ONE - La Vie en Rose</CardTitle>
                  <Button outline color="info">Medium</Button>
                </CardBody>
              </Card>
            <Card>
                <CardImg top width="100%" src="src/images/babyDontStop.jpg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>NCT U - Baby Don't Stop</CardTitle>
                  <Button outline color="info">Hard</Button>
                </CardBody>
              </Card>
            
            </CardDeck>
        
        </div>
        
    );
  }
}
