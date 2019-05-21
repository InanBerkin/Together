import React, { useState, useEffect, useContext } from 'react'
import { Card, Icon, Image, Button, Placeholder } from 'semantic-ui-react'
import GroupCard from "components/group-card/group-card";
import {
    Link,
    Redirect
} from "react-router-dom";
import { AppContext } from "context/Context.jsx";
import api from 'api.js';

import './OtherUserProfile.scss'

const OtherUserProfile = ({ userId }) => {
    const { state, dispatch } = useContext(AppContext);


    const [groups, setGroups] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState({
        friend: false
    });
    const [isFriend, setisFriend] = useState(false);

    async function checkFriend() {
        const { data } = await api.checkFriend(userId);
        setisFriend(data.is_friend);
    }

    const checkRedirect = () => {
        if (userId) {
            if (state.userData.account_id == userId) {
                return <Redirect to={{
                    pathname: "/profile",
                }}></Redirect>
            }
        }
    }

    useEffect(() => {
        checkRedirect();
    }, [userId])

    useEffect(() => {
        checkFriend();
        getUserInfo();
        getUserAdminGroups();
    }, [])

    const getUserInfo = async () => {
        if (!userId) {
            return;
        }
        try {
            const { data } = await api.getProfileData(userId);
            setUserInfo(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getUserAdminGroups = async () => {
        try {
            const { data } = await api.getUserAdminGroups(userId);
            let groupList = data.map(function (groupItem, index) {
                return <GroupCard key={index} group={groupItem} image_path={api.getImage(groupItem.image_path)} />;
            });
            setGroups(groupList);
        } catch (error) {
            console.error();
        }
    }


    const AddFriendButton = () => {
        return (
            <Button color='green' onClick={sendFriendRequest}>
                <Icon name='heart' />
                Add friend
            </Button>
        );
    }

    const RemoveFriendButton = () => {
        return (
            <Button color='red' onClick={removeFriend}>
                {/* <Icon name='' /> */}
                Add friend
            </Button>
        );
    }

    const removeFriend = async () => {
        setLoading({ ...loading, friend: true });
        const { data } = await api.removeFriend({ friend_id: userId });
        setLoading({ ...loading, friend: false });
    }

    const sendFriendRequest = async () => {
        setLoading({ ...loading, friend: true });
        const { data } = await api.sendFriendRequest({ friend_id: userId });
        setLoading({ ...loading, friend: false });
    }


    const SendMessageButton = () => {
        return (
            <Link to={{
                pathname: '/messages',
                state: {
                    send_message_id: userId
                }
            }}>
                <Button color='yellow'>
                    <Icon name='mail' />
                    Send Message
                </Button>
            </Link>
        );
    }


    return (
        <div>
            <div>
                <Card className="profile-card other-user">
                    <div className="picture-area">
                        <div className="profile-picture">
                            <Image src={api.getImage(userInfo.image_path) || <Placeholder><Placeholder.Image /></Placeholder>} size='small' circular />
                        </div>
                        <div>
                            <div className="profile-name">
                                {userInfo.first_name ? userInfo.first_name + " " + userInfo.last_name : <Placeholder><Placeholder.Line></Placeholder.Line></Placeholder>}
                            </div>
                            <div>
                                <Icon name="point" />
                                Location
                            </div>
                            <div className="button-area">
                                {!isFriend ? <AddFriendButton /> : <RemoveFriendButton />}
                                <SendMessageButton />
                            </div>
                        </div>
                    </div>
                    <h3>Bio</h3>
                    <div>
                        {userInfo.bio_text}
                    </div>
                    <h1>
                        Organizator of {groups.length} group
                            </h1>
                    {groups}
                </Card>
            </div>
        </div>
    );
}

export default OtherUserProfile;