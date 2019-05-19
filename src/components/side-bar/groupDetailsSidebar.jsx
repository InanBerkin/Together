import React from "react";
import { Button, Menu, Image, Placeholder } from 'semantic-ui-react';
import ListUsersModal from "components/list-users-modal/list-users-modal";
import { Link } from 'react-router-dom';
import api from 'api.js';
import "./side-bar.scss";
function groupDetailsSidebar({ members, admins, allMembers, group_name, isAdmin, group_id }) {

    function getAdmins() {
        if (!admins) {
            return (
                <Placeholder >
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder>
            );
        }
        return (
            admins.map((organizer) => {
                const image_path = api.getImage(organizer.image_path);
                return (
                    <Link to={'/profile/' + organizer.account_id}>
                        <div key={organizer.account_id}>
                            <Image src={image_path} avatar spaced />
                            <span>{organizer.name}</span>
                        </div>
                    </Link>
                );
            })
        );
    }
    function getMembers() {
        if (!members) {
            return (
                <Placeholder >
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder>);
        }
        return members.map((member) => <Image key={member.account_id} src={member.image_path} avatar size="mini" spaced />);
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