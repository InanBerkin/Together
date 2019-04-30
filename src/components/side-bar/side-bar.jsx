import React, { useState, useLayoutEffect, useContext } from "react";
import { AppContext } from 'AppContext.js'
import { Button, Menu, Icon, Grid, Image } from 'semantic-ui-react'
import Calendar from 'react-calendar';
import { Link, withRouter } from "react-router-dom";
import ListUsersModal from "components/list-users-modal/list-users-modal";

import faker from 'faker';

import "./side-bar.scss";

function SideBar({ location, history }) {
    const [context, setContext] = useContext(AppContext);
    const [sidebarMode, setSidebarMode] = useState(0);
    let path_id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    useLayoutEffect(() => {
        if (location.pathname.indexOf('event-details') > -1) {
            setSidebarMode(1);
        }
        else if (location.pathname.indexOf('group-details') > -1) {
            setSidebarMode(2);
        }
        else if (location.pathname.indexOf('profile') > -1) {
            setSidebarMode(3);
        }
        else {
            setSidebarMode(0);
        }
    });

    function eventDetailsSidebar() {
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
                    <h3>Organizer</h3>
                    {getOrganizer()}
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h3>Attendees</h3>
                    {getAttendees()}
                    <div className="see-all-link">
                        <ListUsersModal trigger="See all attendees" list_id={path_id} />
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    function groupDetailsSidebar() {
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
        return (
            <Menu fluid vertical>
                <Menu.Item>
                    <Button color="green">Request to join</Button>
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h3>Group Admin</h3>
                    {getOrganizer()}
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h3>Attendees</h3>
                    {getAttendees()}
                    <div className="see-all-link">
                        <ListUsersModal trigger="See all memberss" list_id={path_id} />
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    function profileSidebar() {
        let activeItem = "";

        function handleItemClick(e, { name }) {
            activeItem = name;
            if (name === 'Profile') {
                history.push("/profile");
                return;
            }
            history.push("/profile/" + name);
        }

        function handleLogout() {
            setContext({ loggedIn: false });
            localStorage.removeItem('loggedIn');
            history.push("/login");
        }

        return (
            <Menu fluid vertical className="your-account">
                <Menu.Item><h3>Manage account</h3></Menu.Item>
                <Menu.Item>
                    <Menu.Item
                        icon='user'
                        name='Profile'
                        active={activeItem === 'Profile'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        icon='edit'
                        name='Edit-Profile'
                        active={activeItem === 'Edit Profile'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        icon='users'
                        name='Friends'
                        active={activeItem === 'Friends'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name='Friend Requests'
                        active={activeItem === 'Friend Requests'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item>
                        <Button color="red" onClick={handleLogout}>Logout</Button>
                    </Menu.Item>
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

        case 2:
            return groupDetailsSidebar();

        case 3:
            return profileSidebar();

        default:
            return defaultSidebar();
    }
}

export default withRouter(SideBar);