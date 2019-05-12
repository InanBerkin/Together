import React from "react";
import { Button, Menu } from 'semantic-ui-react';
import "./side-bar.scss";
function profileSidebar(history) {
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
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('token');
        history.push("/login");
    }
    return (<Menu fluid vertical className="your-account">
        <Menu.Item><h3>Manage account</h3></Menu.Item>
        <Menu.Item>
            <Menu.Item icon='user' name='Profile' active={activeItem === 'Profile'} onClick={handleItemClick} />
            <Menu.Item icon='edit' name='Edit-Profile' active={activeItem === 'Edit Profile'} onClick={handleItemClick} />
            <Menu.Item icon='users' name='Friends' active={activeItem === 'Friends'} onClick={handleItemClick} />
            <Menu.Item name='Friend Requests' active={activeItem === 'Friend Requests'} onClick={handleItemClick} />
            <Menu.Item>
                <Button color="red" onClick={handleLogout}>Logout</Button>
            </Menu.Item>
        </Menu.Item>
    </Menu>);
}

export default profileSidebar;