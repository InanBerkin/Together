import React, { useState } from "react";
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import profile_pic from 'assets/placeholder_profile.jpeg'

import ProfileSidebar from "components/side-bar/profileSidebar";

import "./Profile.scss";


function Profile() {
    const organizatorCount = useState(1)[0];
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
                                Organizator of {organizatorCount} group
                </h1>
                        </Card>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default Profile;