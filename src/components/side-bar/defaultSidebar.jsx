import React, { useContext } from "react";
import { Button, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";
import AppContext from 'context/app-context';

import "./side-bar.scss";
export function defaultSidebar() {
    const context = useContext(AppContext);
    const handleChange = date => {
        context.filterDate = date;
    };
    return (
        <Menu fluid vertical>
            <Menu.Item>
                <Link to="/create-group">
                    <Button color="green" size="big">Create New Group</Button>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Calendar className="calendar" value={context.filterDate} onChange={handleChange} />
            </Menu.Item>
        </Menu>
    );
}
