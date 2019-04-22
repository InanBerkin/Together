import React, { useState } from 'react'
import { Form, Header, Container, Divider, Label, Search, Card } from 'semantic-ui-react'

import "./CreateGroupForm.scss";

// function CategoryLabel(){

// }

function CreateGroupForm() {
    const [categories, setCategories] = useState(new Map());

    function displaySelectedCategories() {
        return [...categories].map((category, index) => {
            return <Label content={category[0]} color={category[1]} removeIcon='delete' key={index}
                onRemove={(event, data) => deleteCategory((data))} />;
        });
    }

    function selectCategory(data) {
        let newState = new Map(categories);
        newState.set(data.content, data.color);
        setCategories(newState);
    }

    function getAllCategories() {
        const allCategories = [{ content: 'Arts', color: 'pink' }, { content: 'Social', color: 'blue' }];
        return allCategories.map((category, index) => {
            return <Label color={category.color} content={category.content} key={index}
                onClick={(event, data) => selectCategory(data)} />;
        });
    }

    function deleteCategory(data) {
        let newState = new Map(categories);
        newState.delete(data.content);
        setCategories(newState);
    }

    return (
        <Container className="create-group-form">
            <Header as='h1'>Create a group</Header>
            <Form size="huge" >
                <Header as='h3'>Step 1</Header>
                <Form.Input label="What will be your group's name?" placeholder='Group name' />
                <Divider />
                <Header as='h3'>Step 2</Header>
                {categories.length}
                <Header as='h3'>What will your group be about?</Header>
                <div className="category-box">
                    {displaySelectedCategories()}
                </div>
                <Label.Group size='medium'>
                    {getAllCategories()}
                </Label.Group>
                <Divider />
                <Header as='h3'>Step 3</Header>
                <Header as='h3'>Where will be your group be located?</Header>
                <Search></Search>
                <Divider />
                <Header as='h3'>Step 4</Header>
                <Form.TextArea label='Group Description' placeholder='Describe your group briefly' />
                <Form.Button primary>Create Group</Form.Button>
            </Form>
        </Container>
    );
}

export default CreateGroupForm;
