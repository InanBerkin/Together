import React from "react";
import { Button, Menu, Icon, Grid, Image } from 'semantic-ui-react';
import ListUsersModal from "components/list-users-modal/list-users-modal";
import faker from 'faker';
import "./side-bar.scss";

function eventDetailsSidebar(attending, organizers) {
    function getOrganizer() {
        console.log(organizers);
        if (!organizers) {
            return (<div>Loading...</div>);
        }
        return (
            <div>
                {/* <Image src={faker.image.avatar()} avatar spaced /> */}
                <span>{organizers[0].name}</span>
            </div>);
    }

    function getAttendees() {
        let attendeeData = [];
        for (let i = 0; i < 3; i++) {
            attendeeData.push(faker.image.avatar());
        }
        return attendeeData.map((avatar_link, i) => <Image key={i} src={avatar_link} avatar size="mini" spaced />);
    }
    return (<Menu fluid vertical>
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
            <h3>Organizer</h3>
            {getOrganizer()}
        </Menu.Item>
        <Menu.Item className="text-left">
            <h3>Attendees</h3>
            {getAttendees()}
            <div className="see-all-link">
                <ListUsersModal trigger="See all attendees" list_id={1} />
            </div>
        </Menu.Item>
    </Menu>);
}

export default eventDetailsSidebar;