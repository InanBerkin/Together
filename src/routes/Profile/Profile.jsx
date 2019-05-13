import React, { useState, useEffect } from "react";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import profile_pic from 'assets/placeholder_profile.jpeg'
import ProfileSidebar from "components/side-bar/profileSidebar";
import GroupCard from "components/group-card/group-card";

import api from 'api.js';

import "./Profile.scss";


function Profile() {
    const [groups, setGroups] = useState([]);

    const getUserAdminGroups = async () => {
        try {
            const { data } = await api.getUserAdminGroups();
            let groupList = data.map(function (groupItem, index) {
                return <GroupCard key={index} group={groupItem} image_path={api.getImage(groupItem.image_path)} />;
            });
            setGroups(groupList);
            console.log(data);
        } catch (error) {
            console.error();
        }
    }

    useEffect(() => {
        getUserAdminGroups();
    }, [])


    return (
        <div>
            <Grid>
                <Grid.Column stretched width='3'>
                    <ProfileSidebar />
                </Grid.Column>
                <Grid.Column stretched width='13'>
                    <div>
                        <Card className="profile-card">
                            <div className="picture-area">
                                <Image className="profile-picture" src={profile_pic} size='tiny' circular />
                                <div>
                                    <div className="profile-name">Jane Doe</div>
                                    <div><Icon name="point"></Icon>Location</div>
                                </div>
                            </div>
                            <h3>Bio</h3>
                            <div>
                                Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Ultricies tristique nulla aliquet enim tortor at auctor.
                            </div>
                            <h1>
                                Organizator of {groups.length} group
                            </h1>
                            {groups}
                        </Card>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default Profile;