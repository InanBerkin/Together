import React, { useContext } from "react";
import { AppContext } from 'context/Context.jsx';
import { Link } from "react-router-dom";
import { Input, Menu, Image, Icon } from 'semantic-ui-react'
import Skeleton from 'react-loading-skeleton';
import api from 'api.js';

import ReactSVG from 'react-svg'
import logo from 'assets/TitleLogo.svg'

import "./top-bar.scss";

function TopBar() {
    const { state } = useContext(AppContext);


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
                        <Image src={api.getImage(state.userData.image_path)} avatar spaced size="mini" />
                        <div>
                            <div className="user-name">
                                {state.userData.first_name ? state.userData.first_name + " " + state.userData.last_name : <Skeleton width={150} />}
                            </div>
                        </div>
                    </div>
                </Link>
            </Menu.Item>
        </Menu>
    );
}

export default TopBar; 