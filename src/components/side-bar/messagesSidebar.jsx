import React, { useState } from "react";
import { Button, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import "./side-bar.scss";
function MessagesSidebar({ selectedMenuItem, setSelectedMenuItem }) {

    function handleItemClick(e, { name }) {
        setSelectedMenuItem(name);
    }


    return (<Menu fluid pointing secondary vertical className="your-account">
        <Menu.Item><h3>Contacts</h3></Menu.Item>
        <Menu.Item>

        </Menu.Item>
    </Menu>);
}

export default MessagesSidebar;