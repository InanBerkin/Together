import React from "react";
import { Button, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";


import "./side-bar.scss";
function defaultSidebar({ value, setFilterDate }) {
    return (
        <Menu fluid vertical>
            <Menu.Item>
                <Link to="/create-group">
                    <Button color="green" size="big">Create New Group</Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Calendar className="calendar" value={value} onChange={setFilterDate} />
            </Menu.Item>
        </Menu>
    );
}

export default defaultSidebar;
