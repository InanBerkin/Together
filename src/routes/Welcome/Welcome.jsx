import React, { Component } from "react";
import EventCard from "components/event-card/event-card";
import TopBar from "components/top-bar/top-bar";
import SideBar from "components/side-bar/side-bar";
import { Container, Grid, Button } from 'semantic-ui-react'

import faker from 'faker';

import "./Welcome.scss";


class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEvents: true,
        }
        this.changeViewContent = this.changeViewContent.bind(this);
    }

    changeViewContent() {
        this.setState({ showEvents: !this.state.showEvents });
    }

    generateFakeEvent() {
        let eventData = [];
        for (let i = 0; i < 4; i++) {
            eventData.push({ name: faker.name.firstName(), attending: faker.random.number(100) });
        }
        let eventList = eventData.map(function (eventItem, index) {
            return <EventCard key={index} event={eventItem} />;
        });
        return eventList;
    }

    generateFakeGroup() {
        let groupData = [];
        for (let i = 0; i < 4; i++) {
            groupData.push({ name: faker.name.firstName(), attending: faker.random.number(100) });
        }
        let groupList = groupData.map(function (eventItem, index) {
            return <EventCard key={index} event={eventItem} />;
        });
        return groupList;
    }

    render() {
        return (
            <div>
                <TopBar></TopBar>
                <Grid>
                    <Grid.Column stretched width='3'>
                        <SideBar />
                    </Grid.Column>
                    <Grid.Column stretched width='10'>
                        <Container className="container">
                            {this.state.showEvents ? this.generateFakeEvent() : this.generateFakeGroup()}
                        </Container>
                    </Grid.Column>
                    <Grid.Column width='3'>
                        <Button.Group>
                            <Button color="orange" onClick={this.changeViewContent}>Event</Button>
                            <Button.Or />
                            <Button color="red">Group</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}

export default Welcome;