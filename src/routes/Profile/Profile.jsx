import React, { useState, useEffect, useContext, useRef } from "react";
import { Card, Icon, Image, Grid, Placeholder } from 'semantic-ui-react'
import ProfileSidebar from "components/side-bar/profileSidebar";
import GroupCard from "components/group-card/group-card";
import { useImageCrop } from "hooks/useImageCrop";
import { AppContext } from "context/Context.jsx";
import EditProfile from "./EditProfile/EditProfile";
import OtherUserProfile from "./OtherUserProfile/OtherUserProfile";
import api from 'api.js';

import "./Profile.scss";


function Profile({ match }) {

    if (match.params.id) {
        return (
            <Grid>
                <Grid.Column stretched width='1'>

                </Grid.Column>
                <Grid.Column stretched width='14'>
                    <OtherUserProfile userId={match.params.id} />
                </Grid.Column>
                <Grid.Column stretched width='1'>

                </Grid.Column>
            </Grid>
        );
    }

    const { state, dispatch } = useContext(AppContext);
    const [groups, setGroups] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Profile');
    const [profilePicture, setProfilePicture] = useState();

    let fileInput = useRef(null)

    const crop_data = {
        height: 300,
        width: 300
    };

    const onComplete = async (img) => {
        try {
            const { data } = await api.uploadImage(img);
            const res = await api.uploadProfilePicture(data.img);
            let profileData = await api.getProfileData();
            dispatch({ type: 'SET_USER_DATA', data: profileData.data });
        } catch (error) {
            console.error(error);
        }
    }

    const { cropModal, croppedImageUrl, setModalOpen, setUploadedImage } = useImageCrop(crop_data, onComplete);

    const getUserAdminGroups = async () => {
        try {
            const { data } = await api.getUserAdminGroups();
            let groupList = data.map(function (groupItem, index) {
                return <GroupCard key={index} group={groupItem} image_path={api.getImage(groupItem.image_path)} />;
            });
            setGroups(groupList);
        } catch (error) {
            console.error();
        }
    }

    useEffect(() => {
        getUserAdminGroups();
        setProfilePicture(api.getImage(state.userData.image_path));
    }, [])

    const handleUploadClick = () => {
        fileInput.current.click();
    }

    const uploadImage = (event) => {
        setUploadedImage(URL.createObjectURL(fileInput.current.files[0]));
        setModalOpen(true);
    }

    const MyProfile = () => {
        return (
            <div>
                {cropModal()}
                <div>
                    <Card className="profile-card">
                        <div className="picture-area">
                            <div className="profile-picture" >
                                <Image src={croppedImageUrl || profilePicture} size='small' circular />
                                <Icon size="huge" onClick={handleUploadClick} color="yellow" name="upload"></Icon>
                                <input type="file" onChange={uploadImage} ref={fileInput} style={{ display: 'none' }}></input>
                            </div>
                            <div>
                                <div className="profile-name">{state.userData ? state.userData.first_name + " " + state.userData.last_name : <Placeholder><Placeholder.Line /><Placeholder.Line /></Placeholder>}</div>
                                <div><Icon name="point"></Icon>Location</div>
                            </div>
                        </div>
                        <h3>Bio</h3>
                        <div>
                            {state.userData.bio_text}
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

    const WithSidebar = ({ ProfileComp }) => {
        return (
            <Grid>
                <Grid.Column stretched width='3'>
                    <ProfileSidebar selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
                </Grid.Column>
                <Grid.Column stretched width='13'>
                    <ProfileComp userData={state.userData} />
                </Grid.Column>
            </Grid>
        );
    }


    switch (selectedMenuItem) {
        case 'Profile':
            return <WithSidebar ProfileComp={MyProfile} />;
        case 'Edit-Profile':
            return <WithSidebar ProfileComp={EditProfile} />;
        default:
            break;
    }


}

export default Profile;