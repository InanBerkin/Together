import React, { useState } from "react";
import { Icon, Container, Input, Button } from "semantic-ui-react";

import './EditProfile.scss';

function EditProfile() {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <Container className="edit-profile-container">
                <h1><Icon name="edit" />Edit Profile</h1>
                <div className="inputs">
                    <div className="input-area">
                        Full Name
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Full Name' />
                    </div>
                    <div className="input-area">
                        Location
                    <Input placeholder='Location' />
                    </div>
                    <div className="input-area">
                        Password
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>
                </div>

                <Button className="save-button" color="green">
                    Save Changes
                </Button>
            </Container>
        </div>
    );
}

export default EditProfile;