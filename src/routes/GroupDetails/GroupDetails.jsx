import React, { useState, useEffect } from 'react'
import { Container, Grid, Popup, Button, Divider, Comment, Form } from 'semantic-ui-react';
import GroupDetailsSidebar from "components/side-bar/groupDetailsSidebar";

import Skeleton from 'react-loading-skeleton';
import api from 'api.js';

import "./GroupDetails.scss";

function GroupDetails({ match }) {

    const [groupData, setGroupData] = useState({});
    const [imageStyle, setImageStyle] = useState({});
    const [allMembers, setAllMembers] = useState([]);

    useEffect(() => {
        fetchGroupData();
    }, []);

    const fetchGroupData = async () => {
        const { data } = await api.getGroupDetails(match.params.id);
        setGroupData(data);
        const image_path = api.getImage(data.image_path);
        const style = {
            backgroundImage: `url(${image_path})`
        }
        setImageStyle(style);
        const members = await api.getAllGroupMembers(match.params.id);
        console.log(members);
        setAllMembers(members.data)
    }

    return (
        <div>
            <Grid>
                <Grid.Column stretched width='3'>
                    <GroupDetailsSidebar members={groupData.members} admins={groupData.admins} allMembers={allMembers} group_name={groupData.group_name} group_id={groupData.group_id}/>
                </Grid.Column>
                <Grid.Column stretched width='13'>
                    <Container>
                        <div className="group side-crop" style={imageStyle} />
                        <div className="group-info">
                            <div className="host-name info-block">
                            </div>
                            <div className="event-name info-block">
                                <div>
                                    {groupData.group_name || <Skeleton width={300} />}
                                </div>
                                <Popup
                                    trigger={<Button icon="ellipsis horizontal"></Button>}
                                    content='Ban Group'
                                    on='click'
                                    position='bottom center'
                                    hideOnScroll
                                />
                            </div>
                            <div>
                                <h3>Description</h3>
                                <p>
                                    {groupData.description || <Skeleton count={2} width={300} />}
                                </p>
                            </div>
                            <Divider />
                            <h2>Comments</h2>
                            <Comment.Group>
                                <Form reply>
                                    <Form.TextArea />
                                    <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                                </Form>
                            </Comment.Group>
                        </div>
                    </Container>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default GroupDetails;

