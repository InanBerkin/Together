import React, { useState, useEffect } from "react";
import { Button, Menu, Icon, Grid, Image } from 'semantic-ui-react'
import Calendar from 'react-calendar';
import { Link, withRouter } from "react-router-dom";

import faker from 'faker';

import "./side-bar.scss";

function SideBar({ location }) {
    const [sidebarMode, setSidebarMode] = useState(0);


    useEffect(() => {
        if (location.pathname.indexOf('event-details') > -1) {
            setSidebarMode(1);
        }
        else {
            setSidebarMode(0);
        }
    });

    function getOrganizer() {
        return (
            <div>
                <Image src={faker.image.avatar()} avatar spaced />
                <span>{faker.name.firstName() + " " + faker.name.lastName()}</span>
            </div>
        );
    }

    function getAttendees() {
        let attendeeData = [];
        for (let i = 0; i < 3; i++) {
            attendeeData.push(faker.image.avatar());
        }
        return attendeeData.map((avatar_link, i) => <Image key={i} src={avatar_link} avatar size="mini" spaced />);
    }


    function eventDetailsSidebar() {
        return (
            <Menu fluid vertical>
                <Menu.Item>
                    <h3>Are you going?</h3>
                    <Button color="green">Attend</Button>
                </Menu.Item>
                <Menu.Item className="event-details">
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name="time"></Icon>
                            </Grid.Column>
                            <Grid.Column textAlign='left' width={12}>
                                {faker.date.future().toUTCString()}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name="user"></Icon>
                            </Grid.Column>
                            <Grid.Column textAlign='left' width={12}>
                                {faker.random.number(60)} attending
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={1}>
                                <Icon name="point"></Icon>
                            </Grid.Column>
                            <Grid.Column textAlign='left' width={12}>
                                {faker.address.streetAddress(true)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h2>Location</h2>
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h2>Organizer</h2>
                    {getOrganizer()}
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h3>Attendees</h3>
                    {getAttendees()}
                    <div className="see-all-link">
                        <a href="#">See all attendees</a>
                    </div>
                </Menu.Item>
            </Menu>
        );
    }


    function defaultSidebar() {
        return (
            <Menu fluid vertical>
                <Menu.Item name='inbox'>
                    <Button color="orange">Create New Event</Button>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/create-group">
                        <Button color="red">Create New Group</Button>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Calendar className="calendar" />
                </Menu.Item>
            </Menu>
        );
    }

    switch (sidebarMode) {
        case 1:
            return eventDetailsSidebar();

        default:
            return defaultSidebar();
    }
}

export default withRouter(SideBar);