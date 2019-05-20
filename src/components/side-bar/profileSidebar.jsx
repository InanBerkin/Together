import React, { useState } from "react";
import { Button, Menu, Divider, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./side-bar.scss";
function profileSidebar({ selectedMenuItem, setSelectedMenuItem }) {

    function handleItemClick(e, { name }) {
        setSelectedMenuItem(name);
    }
    function handleLogout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('token');
    }

    const AdminLoginPopup = () => {
        return (
            <Modal trigger={<Button>Show Modal</Button>}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {/* <Header>Default Profile Image</Header> */}
                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }

    return (<Menu fluid pointing secondary vertical className="your-account">
        <Menu.Item><h3>Manage account</h3></Menu.Item>
        <Menu.Item>
            <Menu.Item icon='user' name='Profile' active={selectedMenuItem === 'Profile'} onClick={handleItemClick} />
            <Menu.Item icon='edit' name='Edit-Profile' active={selectedMenuItem === 'Edit-Profile'} onClick={handleItemClick} />
            <Menu.Item icon='users' name='Friends' active={selectedMenuItem === 'Friends'} onClick={handleItemClick} />
            <Menu.Item>
                <Button as={Link} to='/login' color="red" onClick={handleLogout}>Logout</Button>
            </Menu.Item>
            <Divider />
            <Menu.Item><h3>Admin Account</h3></Menu.Item>
            <Menu.Item>
                {AdminLoginPopup()}
            </Menu.Item>
        </Menu.Item>
    </Menu>);



}

export default profileSidebar;