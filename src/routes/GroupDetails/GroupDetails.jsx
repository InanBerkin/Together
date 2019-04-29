import React, { useState, useEffect } from 'react'
import { Container, Image, Popup, Button, Divider, Comment, Form } from 'semantic-ui-react';

import faker from 'faker';

import "./GroupDetails.scss";

function GroupDetails({ match }) {

    const [groupData, setGroupData] = useState({});

    useEffect(() => {
        let newGroupData = {
            group_name: faker.company.companyName(),
        };
        setGroupData(newGroupData);
    }, []);


    return (
        <Container>
            <div className="group side-crop" />
            <div className="group-info">
                <div className="host-name info-block">
                </div>
                <div className="event-name info-block">
                    <div>
                        {match.params.id}
                    </div>
                    <Popup
                        trigger={<Button icon="ellipsis horizontal"></Button>}
                        content='Ban Group'
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
                    <Form reply>
                        <Form.TextArea />
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </div>
        </Container>
    );
}

export default GroupDetails;

