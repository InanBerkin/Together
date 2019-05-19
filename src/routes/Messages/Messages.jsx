import React, { useState, useEffect } from 'react'
import { Card, Icon, Image, Grid, Header, Divider, Label, Form, Placeholder } from 'semantic-ui-react'
import MessagesSidebar from "components/side-bar/messagesSidebar";
import api from 'api.js';
import styled from 'styled-components'
import './Messages.scss';


const SpeechBubble = styled.div`
    width: 300px;
    padding: 1.2rem;
    position: relative;
    background: ${props => props.color};
    color: #fff;
    border-radius: .4em;
    text-align: start;
    overflow: auto;
    display: block;
`


const SpeechBubbleArea = ({ incoming, text }) => {
    return (
        <Grid>
            <Grid.Column floated={incoming ? 'left' : 'right'} width={5}>
                <SpeechBubble color={incoming ? '#09c5d6' : 'orange'}>
                    {text}
                </SpeechBubble>
            </Grid.Column>
        </Grid>
    );
}

const Messages = ({ location }) => {
    const [otherUserInfo, setOtherUserInfo] = useState({});
    const [otherUserId, setOtherUserId] = useState();
    const [incomingMessages, setIncomingMessages] = useState([]);
    const [outgoingMessages, setOutgoingMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState('');

    useEffect(() => {
        if (location.state)
            setOtherUserId(location.state.send_message_id);
        else {

        }
    }, [])

    useEffect(() => {
        getOtherUserInfo(otherUserId);
        getMessages();
    }, [otherUserId])

    const getOtherUserInfo = async () => {
        if (otherUserId) {
            const { data } = await api.getProfileData(otherUserId);
            setOtherUserInfo(data);
            console.log(data);
        }
    }

    const getMessages = async () => {
        if (otherUserId) {
            try {
                const { data } = await api.getMessagesBetween(otherUserId, 0, 10);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const sendMessage = async (message) => {
        try {
            const { data } = await api.sendMessage({ message, receiver: otherUserId });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleKeyDown = () => {
        sendMessage(typedMessage);
    }

    return (
        <Grid>
            <Grid.Column stretched width='3'>
                <MessagesSidebar />
            </Grid.Column>
            <Grid.Column stretched width='13'>
                <Card className="profile-card messages-container">
                    <Header as='h2'>
                        <Image circular src={api.getImage(otherUserInfo.image_path) || ''} /> {otherUserInfo.first_name ? otherUserInfo.first_name + " " + otherUserInfo.last_name : <Placeholder><Placeholder.Line /></Placeholder>}
                    </Header>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Label>19 May 2019</Label>
                        </Header>
                    </Divider>
                    <SpeechBubbleArea incoming text='Test message' />
                    <SpeechBubbleArea text='Test message Test message Test message Test message Test message Test message Test message Test message' />
                    <SpeechBubbleArea text='Test message' />
                    <Form onSubmit={handleKeyDown}>
                        <Form.Input value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} size='large' icon={<Icon name='send' circular link />} className='send-message-input' placeholder='Type a message' />
                    </Form>
                </Card>
            </Grid.Column>
        </Grid>
    );

}

export default Messages;