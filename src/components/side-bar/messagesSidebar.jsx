import React, { useState, useEffect } from "react";
import { Button, Menu, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import api from 'api.js';

import "./side-bar.scss";
function MessagesSidebar({ setOtherUserId, previews }) {

    function handleItemClick(id) {
        setOtherUserId(id);
    }

    const displayPreviews = () => {
        if (previews.length !== 0) {
            return previews.map((preview, index) => {
                return <PreviewCard id={preview.account_id} key={index} image_path={preview.image_path} name={preview.name} />
            });
        }
        else {
            return (
                <Menu.Item>
                    <Header as='h4'>
                        You do not have any contacts
                    </Header>
                </Menu.Item>
            )
        }
    }

    const PreviewCard = ({ id, image_path, name, last_msg }) => {
        return (
            <Menu.Item onClick={() => handleItemClick(id)}>
                <Header as='h4'>
                    <Image avatar src={api.getImage(image_path)} />
                    <Header.Content>
                        {name}
                    </Header.Content>
                </Header>
            </Menu.Item>
        );
    }

    return (<Menu fluid pointing secondary vertical className="your-account">
        <Menu.Item><h3>Contacts</h3></Menu.Item>
        {displayPreviews()}
    </Menu>);
}

export default MessagesSidebar;