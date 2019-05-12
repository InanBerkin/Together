import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { Container, Form, Popup, Button, Divider, Comment, Grid } from 'semantic-ui-react';

import faker from 'faker';
import EventDetailsSidebar from "components/side-bar/eventDetailsSidebar";

import "./EventDetails.scss";

function EventDetails({ match }) {
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        let newEventData = {
            event_name: faker.commerce.productName(),
            group_name: faker.company.companyName(),
        };
        setEventData(newEventData);
    }, []);

    function fetchComments() {
        return (
            <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        );
    }

    return (
        <div>
            <Grid>
                <Grid.Column stretched width='3'>
                    <EventDetailsSidebar />
                </Grid.Column>
                <Grid.Column stretched width='13'>
                    <Container>
                        <div className="side-crop" />
                        <div className="event-info">
                            <div className="host-name info-block">
                                Hosted by <a href={"/group-details/" + eventData.group_name}>{eventData.group_name}</a>
                            </div>
                            <div className="event-name info-block">
                                <div>
                                    {eventData.event_name}
                                </div>
                                <Popup
                                    trigger={<Button icon="ellipsis horizontal"></Button>}
                                    content='Ban Event'
                                    on='click'
                                    position='bottom center'
                                    hideOnScroll
                                />
                            </div>
                            <div>
                                <h3>Description</h3>
                                <p>
                                    {faker.lorem.paragraph(4)}
                                </p>
                            </div>
                            <Divider />
                            <h2>Comments</h2>
                            <Comment.Group>
                                {fetchComments()}
                                <Form reply>
                                    <Form.TextArea />
                                    <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                                </Form>
                            </Comment.Group>
                        </div>
                    </Container>
                </Grid.Column>
            </Grid>
        </div>
    );
}


export default withRouter(EventDetails);