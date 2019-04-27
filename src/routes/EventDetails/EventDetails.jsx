import React, { useState, useEffect } from 'react'
import { Container, Image, Popup, Button, Divider, Comment, Form } from 'semantic-ui-react';

import faker from 'faker';

import "./EventDetails.scss";

function EventDetails({ match }) {
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        let newEventData = {
            eventName: faker.commerce.productName()
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
        <Container>
            <div className="side-crop" />
            <div className="event-info">
                <div className="host-name info-block">
                    Hosted by <a href="#">{match.params.id}</a>
                </div>
                <div className="event-name info-block">
                    <div>
                        {eventData.eventName}
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
    );
}


export default EventDetails;