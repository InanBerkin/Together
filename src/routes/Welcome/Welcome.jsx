import React, { useState } from "react";
import EventCard from "components/event-card/event-card";
import { Container, Grid, Button } from 'semantic-ui-react'

import faker from 'faker';

import "./Welcome.scss";


function Welcome() {

    const [showEvents, setShowEvents] = useState(true);

    function changeViewContent() {
        setShowEvents(true);
    }

    function generateFakeEvent() {
        let eventData = [];
        for (let i = 0; i < 4; i++) {
            eventData.push({ name: faker.name.firstName(), attending: faker.random.number(100), image: faker.image.image() });
        }
        let eventList = eventData.map(function (eventItem, index) {
            return <EventCard key={index} event={eventItem} />;
        });
        return eventList;
    }

    function generateFakeGroup() {
        let groupData = [];
        for (let i = 0; i < 4; i++) {
            groupData.push({ name: faker.name.firstName(), attending: faker.random.number(100) });
        }
        let groupList = groupData.map(function (eventItem, index) {
            return <EventCard key={index} event={eventItem} />;
        });
        return groupList;
    }

    return (
        <div>
            <Grid>
                <Grid.Column stretched width='13'>
                    <Container className="container">
                        {showEvents ? generateFakeEvent() : generateFakeGroup()}
                    </Container>
                </Grid.Column>
                <Grid.Column width='3'>
                    <Button.Group>
                        <Button color="orange" onClick={changeViewContent}>Event</Button>
                        <Button.Or />
                        <Button color="red">Group</Button>
                    </Button.Group>
                </Grid.Column>
            </Grid>
        </div>
    );

}

export default Welcome;