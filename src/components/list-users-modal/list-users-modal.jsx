import React from "react";
import { Button, Modal, Image, Header, Item } from 'semantic-ui-react'
import faker from 'faker';
function ListUsersModal({ trigger, list_id }) {

    function getUsers() {
        let usernames = [];
        for (let i = 0; i < 4; i++) {
            usernames.push(faker.name.firstName());
        }
        return usernames.map((name, key) => userItem(name, key));
    }

    return (
        <Modal trigger={<Button>{trigger}</Button>}>
            <Modal.Header>Attending to {list_id}</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Item.Group>
                        {getUsers()}
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