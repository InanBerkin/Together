import React from "react";
import { Link } from "react-router-dom";
import { Input, Menu, Image, Icon } from 'semantic-ui-react'

import ReactSVG from 'react-svg'
import logo from 'assets/TitleLogo.svg'
import profile_pic from 'assets/placeholder_profile.jpeg'

import "./top-bar.scss";

function TopBar() {
    return (
        <Menu borderless>
            <Menu.Item position="left">
                <Link to="/">
                    <ReactSVG src={logo} svgClassName="logo" />
                </Link>
            </Menu.Item>
            <Menu.Item className='search-bar'>
                <Input iconPosition="left" icon='search' placeholder='What would you like to do?' action='Search' />
            </Menu.Item>
            <Menu.Item position="right">
                <Link to="/profile">
                    <div className="user-info">
                        <Image src={profile_pic} avatar spaced size="mini" />
                        <div>
                            <div className="user-name">Jane Doe</div>
                            <Icon name="mail outline"></Icon>
                            <Icon name="setting"></Icon>
                        </div>
                    </div>
                </Link>
            </Menu.Item>
        </Menu>
    );
}

export default TopBar; 