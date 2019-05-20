import React, { useState, useEffect } from "react";
import { Icon, Container, Item, Header, Button, Image, Divider } from "semantic-ui-react";
import { useForm } from "hooks/useForm";
import api from "api.js";

import './Friends.scss';

function Friends({ friends, requests }) {

    const displayFriends = () => {
        return friends.map((friend, index) => {
            return (
                <Item key={index} >
                    <Item.Image size='tiny' circular src={api.getImage(friend.friend_image)} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='a'>{friend.friend_name}</Item.Header>
                        <Item.Meta>Description</Item.Meta>
                        <Item.Description>
                            <Image src='/images/wireframe/short-paragraph.png' />
                        </Item.Description>
                        <Item.Extra>Additional Details</Item.Extra>
                    </Item.Content>
                </Item>
            );
        });
    }
    const displayRequests = () => {
        return requests.map((friend, index) => {
            console.log(friend);
            
            return (
                <Item key={index} >
                    <Item.Image size='tiny' circular src={api.getImage(friend.friend_image)} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='a'>{friend.friend_name}</Item.Header>
                        <Button color='red' floated='right' onClick={() => handleRequest(friend.action_id, -1)}>
                            Reject
                        </Button>
                        <Button color='green' floated='right' onClick={() => handleRequest(friend.action_id, 1)}>
                            Accept
                        </Button>
                    </Item.Content>
                </Item>
            );
        });
    }

    const handleRequest = async (friend_id, status) => {
        const { data } = await api.acceptFriendRequests({ friend_id, status });
    }

    return (
        <div>
            <Container className="edit-profile-container">
                <Item.Group className="items">
                    <Header as="h3">Requests</Header>
                    {displayRequests()}
                    <Divider />
                    <Header as="h3">Friends</Header>
                    {displayFriends()}
                </Item.Group>
            </Container>
        </div>
    );
}

export default Friends;