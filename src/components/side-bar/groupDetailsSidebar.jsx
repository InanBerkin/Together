import React from "react";
import { Button, Menu, Image } from 'semantic-ui-react';
import ListUsersModal from "components/list-users-modal/list-users-modal";
import faker from 'faker';
import "./side-bar.scss";
function groupDetailsSidebar(path_id) {
    function getOrganizer() {
        return (<div>
            <Image src={faker.image.avatar()} avatar spaced />
            <span>{faker.name.firstName() + " " + faker.name.lastName()}</span>
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
    </Menu>);
}

export default groupDetailsSidebar;