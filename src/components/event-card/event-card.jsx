import React from "react";
import { withRouter } from "react-router-dom";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'

import "./event-card.scss";
//
function EventCard({ event, history }) {

    function goToEventDetails() {
        let eventDetailsUrl = "/event-details/" + event.name;
        history.push(eventDetailsUrl);
    }

    return (
        <Card className="event-card" onClick={goToEventDetails}>
            <Card.Content>
                <Card.Description>
                    <Grid>
                        <Grid.Column width="5" className="event-image">
                            <Image size="small" src={event.image}></Image>
                        </Grid.Column>
                        <Grid.Column width="10" verticalAlign="middle">
                            <h2>{event.name}</h2>
                        </Grid.Column>
                    </Grid>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className="event-details">
                    <span>
                        <Icon name='user' />
                        {event.attending} attending
                    </span>
                    <span>
                        <Icon name='clock' />
                        19.00
                    </span>
                </div>
            </Card.Content>
        </Card >
    );

}
export default withRouter(EventCard);
