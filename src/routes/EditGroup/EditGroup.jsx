import React, { useState, useEffect } from 'react';
import api from "api.js";
import { Form, Header, Container, Divider, Label, Grid, Segment, Icon, Button, Image, Modal } from 'semantic-ui-react';

import './EditGroup.scss'
function EditGroup({ match }) {
    const group_id = match.params.id;
    const [groupData, setGroupData] = useState();

    useEffect(() => {
        fetchGroupData();
    }, [])

    async function fetchGroupData() {
        const { data } = await api.getGroupDetails();
        setGroupData(data);
    }

    return (
        <Container className="group-edit-container">
            <Header as='h2'>Manage Group</Header>
        </Container>
    );

}

export default EditGroup;