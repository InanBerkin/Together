import React, { useState, useEffect } from "react";
import EventCard from "components/event-card/event-card";
import { Container, Grid, Button, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import debounce from 'lodash/debounce';
import faker from 'faker';
import "./Welcome.scss";


function Welcome() {
    const [events, setEvents] = useState([]);
    const [showEvents, setShowEvents] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        generateFakeEvent();
    }, [])

    function generateFakeEvent() {
        let eventData = [];
        for (let i = 0; i < 4; i++) {
            eventData.push({ name: faker.name.firstName(), attending: faker.random.number(100), image: faker.image.image() });
        }
        let eventList = eventData.map(function (eventItem, index) {
            return <EventCard key={index} event={eventItem} />;
        });
        setEvents(eventList);
    }

    const getCities = debounce((event) => console.log(event.target.value), 500);

    function handleChange(event) {
        event.persist();
        getCities(event);
    }

    return (
        <div>
            <Grid>
                <Grid.Column stretched width='13'>
                    <Container id="cards">
                        <div className="location-filter">
                            Events in <Dropdown
                                placeholder='Search City'
                                fluid
                                search
                                selection
                                options={cities}
                                onSearchChange={(event) => handleChange(event)}
                            />
                        </div>
                        {events}
                    </Container>
                </Grid.Column>
                <Grid.Column width='3'>
                    <Button.Group>
                        <Button color="orange" onClick={() => setShowEvents(true)}>Event</Button>
                        <Button.Or />
                        <Button color="red" onClick={() => setShowEvents(false)}>Group</Button>
                    </Button.Group>
                </Grid.Column>
            </Grid>
        </div>
    );

}

export default Welcome;