import React from "react";
import { Button, Menu, Image } from 'semantic-ui-react';
import ListUsersModal from "components/list-users-modal/list-users-modal";
import { Link } from 'react-router-dom';
import faker from 'faker';
import "./side-bar.scss";
function groupDetailsSidebar({ members, admins, allMembers, group_name, isAdmin, group_id }) {

    function getAdmins() {
        if (!admins) {
            return (<div>Loading...</div>);
        }
        return (
            admins.map((organizer) => {
                return (
                    <div key={organizer.account_id}>
                        <Image src={faker.image.avatar()} avatar spaced />
                        <span>{organizer.name}</span>
                    </div>
                );
            })
        );
    }
    function getMembers() {
        let attendeeData = [];
        for (let i = 0; i < 3; i++) {
            attendeeData.push(faker.image.avatar());
        }
        return attendeeData.map((avatar_link, i) => <Image key={i} src={avatar_link} avatar size="mini" spaced />);
    }


    const groupAdminMenu = () => {
        return (
            <Menu fluid vertical>
                <Menu.Item>
                    <Button color="green" as={Link}
                        to={{
                            pathname: '/create-event',
                            state: {
                                group_id,
                                group_name
                            }
                        }}>Create Event</Button>
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h3>Group Admin</h3>
                    {getAdmins()}
                </Menu.Item>
                <Menu.Item className="text-left">
                    <h3>Attendees</h3>
                    {getMembers()}
                    <div className="see-all-link">
                        <ListUsersModal trigger="See all members" name={group_name} allMembers={allMembers} />
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    return (
        // <Menu fluid vertical>
        //     <Menu.Item>
        //         <Button color="green">Request to join</Button>
        //     </Menu.Item>
        //     <Menu.Item className="text-left">
        //         <h3>Group Admin</h3>
        //         {getAdmins()}
        //     </Menu.Item>
        //     <Menu.Item className="text-left">
        //         <h3>Attendees</h3>
        //         {getMembers()}
        //         <div className="see-all-link">
        //             <ListUsersModal trigger="See all members" name={group_name} allMembers={allMembers} />
        //         </div>
        //     </Menu.Item>
        // </Menu>
        groupAdminMenu()
    );
}

export default groupDetailsSidebar;