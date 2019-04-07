import React, { Component } from "react";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import event_image from 'assets/event-image.jpg'

import "./event-card.scss";
//
class EventCard extends Component {
    render() {
        return (
            <Card className="event-card">
                <Card.Content>
                    <Card.Description>
                        <Grid>
                            <Grid.Column width="5" className="event-image">
                                <Image size="small" src={event_image}></Image>
                            </Grid.Column>
                            <Grid.Column width="10" verticalAlign="middle">
                                <h2>{this.props.event.name}</h2>
                            </Grid.Column>
                        </Grid>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className="event-details">
                        <a>
                            <Icon name='user' />
                            {this.props.event.attending} attending
                        </a>
                        <a>
                            <Icon name='clock' />
                            19.00
                        </a>
                    </div>
                </Card.Content>
            </Card >
        );
    }
}
export default EventCard;
