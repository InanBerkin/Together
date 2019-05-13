import React from "react";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import "./event-card.scss";
//
function EventCard({ event, image_path }) {
    return (
        <Card className="event-card" as={Link} to={"/event-details/" + event.event_id}>
            <Card.Content>
                <Card.Description>
                    <Grid>
                        <Grid.Column width="5" className="event-image">
                            <Image size="small" src={image_path}></Image>
                        </Grid.Column>
                        <Grid.Column width="10" verticalAlign="middle">
                            <h2>{event.event_name}</h2>
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
                        {event.time}
                    </span>
                </div>
            </Card.Content>
        </Card >
    );
}
export default EventCard;
