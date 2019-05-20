import React, { useState, useEffect } from 'react'
import { Card, Icon, Image, Grid, Header, Divider, Label, Form, Placeholder } from 'semantic-ui-react'
import MessagesSidebar from "components/side-bar/messagesSidebar";
import useInterval from "hooks/useInterval";
import api from 'api.js';
import styled from 'styled-components'
import moment from 'moment';
import './Messages.scss';


const SpeechBubble = styled.div`
    max-width: 300px;
    padding: 1.2rem;
    position: relative;
    background: ${props => props.color};
    color: #fff;
    border-radius: .4em;
    text-align: start;
    overflow: auto;
    display: block;
`


const SpeechBubbleArea = ({ incoming, text, time }) => {
    return (
        <Grid>
            <Grid.Column floated={incoming ? 'left' : 'right'} width={5}>
                <SpeechBubble color={incoming ? '#09c5d6' : 'orange'}>
                    {text}
                </SpeechBubble>
                <i>{moment(time).format('DD MMM HH:mm')}</i>
            </Grid.Column>
        </Grid>
    );
}

const Messages = ({ location }) => {
    const [otherUserInfo, setOtherUserInfo] = useState({});
    const [otherUserId, setOtherUserId] = useState();
    const [messages, setMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState('');
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        getMessagePreviews();
    }, [])

    useEffect(() => {
        getOtherUserInfo(otherUserId);
        getMessages();
    }, [otherUserId])


    const getMessagePreviews = async () => {
        const { data } = await api.getMessagePreviews();
        console.log(data);
        if (location.state)
            setOtherUserId(location.state.send_message_id);
        else if (data.length === 0) {
            setOtherUserId(null);
        }
        else
            setOtherUserId(data[0].sender_id);
        setPreviews([...data]);
    }

    const getOtherUserInfo = async () => {
        try {
            if (otherUserId) {
                const { data } = await api.getProfileData(otherUserId);
                setOtherUserInfo(data);
            }
        } catch (error) {

        }
    }

    const getMessages = async () => {
        if (otherUserId) {
            try {
                const { data } = await api.getMessagesBetween(otherUserId, 0, 60);
                setMessages([...data])
            } catch (error) {
                console.error(error);
            }
        }
    }

    const sendMessage = async (message) => {
        if (message.trim().length === 0) {
            return;
        }
        try {
            const { data } = await api.sendMessage({ message, receiver: otherUserId });
            setTypedMessage('');
            await getMessages();
        } catch (error) {
            console.error(error);
        }
    }

    const displayMessages = () => {
        if (messages.length !== 0) {
            return messages.map((message, i) => {
                return <SpeechBubbleArea key={i} incoming={message.is_self === 0} text={message.message_text} time={message.time} />
            });
        }
    }


    const handleKeyDown = () => {
        sendMessage(typedMessage);
    }

    return (
        <Grid>
            <Grid.Column stretched width='3'>
                <MessagesSidebar setOtherUserId={setOtherUserId} previews={previews} />
            </Grid.Column>
            <Grid.Column stretched width='13'>
                <Card className="profile-card messages-container">
                    <Header as='h2'>
                        <Image circular src={otherUserInfo.image_path ? api.getImage(otherUserInfo.image_path) : <Placeholder><Placeholder.Image /></Placeholder>} /> {otherUserInfo.first_name ? otherUserInfo.first_name + " " + otherUserInfo.last_name : <Placeholder><Placeholder.Line /></Placeholder>}
                    </Header>
                    <div className="message-window">
                        {displayMessages()}
                    </div>
                    <Form onSubmit={handleKeyDown}>
                        <Form.Input value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} size='large' icon={<Icon name='send' circular link />} className='send-message-input' placeholder='Type a message' />
                    </Form>
                </Card>
            </Grid.Column>
        </Grid>
    );

}

export default Messages;