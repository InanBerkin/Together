import React, { Component } from "react";
import { Input, Menu, Image } from 'semantic-ui-react'
import ReactSVG from 'react-svg'
import logo from 'assets/TitleLogo.svg'
import profile_pic from 'assets/placeholder_profile.jpeg'

import "./top-bar.scss";

class TopBar extends Component {
    render() {
        return (
            <Menu borderless>
                <Menu.Item position="left">
                    <ReactSVG src={logo} svgClassName="logo" />
                </Menu.Item>
                <Menu.Item className='search-bar'>
                    <Input iconPosition="left" icon='search' placeholder='What would you like to do?' action='Search' />
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={profile_pic} avatar spaced size="mini" />
                    <b>Jane Doe</b>
                </Menu.Item>
            </Menu>
        );
    }
}

export default TopBar; 