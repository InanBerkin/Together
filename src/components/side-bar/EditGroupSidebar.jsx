import React, { useState } from "react";
import { Button, Menu, Divider, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./side-bar.scss";

function EditGroupSidebar({ selectedMenuItem, setSelectedMenuItem }) {

    function handleItemClick(e, { name }) {
        setSelectedMenuItem(name);
    }

    return (<Menu fluid pointing secondary vertical className="your-account">
        <Menu.Item><h3>Manage group</h3></Menu.Item>
        <Menu.Item>
            <Menu.Item icon='user' name='Profile' active={selectedMenuItem === 'Profile'} onClick={handleItemClick} />
            <Menu.Item icon='edit' name='Edit-Profile' active={selectedMenuItem === 'Edit-Profile'} onClick={handleItemClick} />
            <Menu.Item icon='users' name='Friends' active={selectedMenuItem === 'Friends'} onClick={handleItemClick} />
            <Divider />
        </Menu.Item>
    </Menu>);



}

export default EditGroupSidebar;