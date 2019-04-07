import React, { Component } from "react";
import { Button, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";

import "./side-bar.scss";

class SideBar extends Component {
    render() {
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
}

export default SideBar;