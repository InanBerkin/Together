import React from "react";
import { Button, Modal, Image, Header, Item } from 'semantic-ui-react'


function ListUsersModal({ trigger, name, allMembers }) {
    function getUsers() {
        return allMembers.map((member, key) => userItem(member.member_name, member.member_id));
    }

    return (
        <Modal trigger={<Button>{trigger}</Button>}>
            <Modal.Header>Attending to {name}</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Item.Group>
                        {allMembers.length !== 0 ? getUsers() : <Header as="h2">There is no one attending to this event yet</Header>}
                    </Item.Group>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
}

function userItem(name, key) {
    return (
        <Item key={key}>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <Item.Content verticalAlign='middle'>
                <Item.Header>{name}</Item.Header>
                <Button primary floated='right'>
                    Add friend
                </Button>
            </Item.Content>
        </Item>
    );
}

export default ListUsersModal;