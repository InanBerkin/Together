import React, { useState, useContext } from "react";
import { AppContext } from "context/Context.jsx";
import { Button, Menu, Icon, Grid, Image, Placeholder, Header } from 'semantic-ui-react';
import ListUsersModal from "components/list-users-modal/list-users-modal";
import {
    Link
} from "react-router-dom";
import api from 'api.js';
import "./side-bar.scss";

function eventDetailsSidebar({ attendees, event_data }) {
    const { state } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)

    const attendEvent = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.attendEvent(event_data.event_id);
        } catch (error) {

        }
        finally {
            setIsLoading(false);
        }
    }

    function getOrganizer() {
        if (!event_data.organizers) {
            return (
                <Placeholder >
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder>
            );
        }
        return (
            event_data.organizers.map((organizer) => {
                const image_path = api.getImage(organizer.image_path);
                return (
                    <Link key={organizer.account_id} to={'/profile/' + organizer.account_id}>
                        <div>
                            <Image src={image_path} avatar spaced />
                            <span>{organizer.name}</span>
                        </div>
                    </Link>
                );
            })
        );
    }

    function getAttendees() {
        if (!event_data.attendees) {
            return (<div>Loading...</div>);
        }
        return (event_data.attendees.map((attendee, i) =>
            <Image key={i} src={api.getImage(attendee.image_path)} avatar size="mini" spaced />
        ));
    }

    const isAttending = () => {
        if (event_data.attendees) {
            for (let i = 0; i < event_data.attendees.length; i++) {
                if (event_data.attendees[i].account_id === state.userData.account_id) {
                    return true;
                }
            }
            return false;
        }
    }

    return (<Menu fluid vertical>
        <Menu.Item>
            {isAttending ?
                <Header as="h3" color="green">You are going to this event</Header>
                :
                <div>
                    <h3>Are you going?</h3>
                    <Button loading={isLoading} color="green" onClick={attendEvent}>Attend</Button>
                </div>}
        </Menu.Item>
        <Menu.Item className="event-details">
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Icon name="time"></Icon>
                    </Grid.Column>
                    <Grid.Column textAlign='left' width={12}>
                        {event_data.time ? event_data.time : ''}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Icon name="user"></Icon>
                    </Grid.Column>
                    <Grid.Column textAlign='left' width={12}>
                        {event_data.attending || ''} attending
                            </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <Icon name="point"></Icon>
                    </Grid.Column>
                    <Grid.Column textAlign='left' width={12}>
                        {event_data.city}
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
                <ListUsersModal trigger="See all attendees" name={event_data.event_name} allMembers={attendees} />
            </div>
        </Menu.Item>
    </Menu>);
}

export default eventDetailsSidebar;