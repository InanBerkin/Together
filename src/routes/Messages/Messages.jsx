import React, { useState } from 'react'
import { Card, Icon, Image, Grid, Header, Divider, Label, Input } from 'semantic-ui-react'
import MessagesSidebar from "components/side-bar/messagesSidebar";
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

const Messages = () => {
    const [incomingMessages, setIncomingMessages] = useState([]);
    const [outgoingMessages, setOutgoingMessages] = useState([]);

    return (
        <Grid>
            <Grid.Column stretched width='3'>
                <MessagesSidebar />
            </Grid.Column>
            <Grid.Column stretched width='13'>
                <Card className="profile-card messages-container">
                    <Header as='h2'>
                        <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> Patrick
                    </Header>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Label>19 May 2019</Label>
                        </Header>
                    </Divider>
                    <SpeechBubbleArea incoming text='Test message' />
                    <SpeechBubbleArea text='Test message Test message Test message Test message Test message Test message Test message Test message' />
                    <SpeechBubbleArea text='Test message' />
                    <Input size='large' icon={<Icon name='send'  circular link />} className='send-message-input' placeholder='Type a message'></Input>
                </Card>
            </Grid.Column>
        </Grid>
    );

}

export default Messages;