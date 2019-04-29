import React, { useState, useEffect } from "react";
import EventCard from "components/event-card/event-card";
import { Container, Grid, Button, Dropdown } from 'semantic-ui-react'
import debounce from 'lodash/debounce';
import faker from 'faker';

import "./Welcome.scss";


function Welcome() {
    const [showEvents, setShowEvents] = useState(true);
    const [searchText, setSearchText] = useState('');
    const options = [
        { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
        { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
        { key: 'Danish', text: 'Danish', value: 'Danish' },
        { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
    ]

    function changeViewContent() {
        setShowEvents(true);
    }

    useEffect(() => {
        debounce(() => console.log(searchText), 400);
    }, [searchText])

    // function generateFakeEvent() {
    //     let eventData = [];
    //     for (let i = 0; i < 4; i++) {
    //         eventData.push({ name: faker.name.firstName(), attending: faker.random.number(100), image: faker.image.image() });
    //     }
    //     let eventList = eventData.map(function (eventItem, index) {
    //         return <EventCard key={index} event={eventItem} />;
    //     });
    //     return eventList;
    // }

    // function generateFakeGroup() {
    //     let groupData = [];
    //     for (let i = 0; i < 4; i++) {
    //         groupData.push({ name: faker.name.firstName(), attending: faker.random.number(100) });
    //     }
    //     let groupList = groupData.map(function (eventItem, index) {
    //         return <EventCard key={index} event={eventItem} />;
    //     });
    //     return groupList;
    // }

    function handleChange(event) {
        debounce(function (event) {
            console.log(event.target);
        }, 100);
    }


    return (
        <div>
            <Grid>
                <Grid.Column stretched width='13'>
                    <Container id="cards">
                        <div className="location-filter">
                            Events in <Dropdown
                                placeholder='Select Country'
                                fluid
                                search
                                selection
                                options={options}
                                onSearchChange={handleChange}
                            />
                        </div>
                        {/* {showEvents ? generateFakeEvent() : generateFakeGroup()} */}
                    </Container>
                </Grid.Column>
                <Grid.Column width='3'>
                    <Button.Group>
                        <Button color="orange" onClick={changeViewContent}>Event</Button>
                        <Button.Or />
                        <Button color="red">Group</Button>
                    </Button.Group>
                </Grid.Column>
            </Grid>
        </div>
    );

}

export default Welcome;