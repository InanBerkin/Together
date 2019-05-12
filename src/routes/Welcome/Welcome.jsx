import React, { useState, useEffect, useContext } from "react";
import EventCard from "components/event-card/event-card";
import { Container, Grid, Button, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import debounce from 'lodash/debounce';
import moment from 'moment';
import "./Welcome.scss";
import api from "api.js";

import DefaultSidebar from "components/side-bar/defaultSidebar";

function Welcome() {
    const [events, setEvents] = useState([]);
    const [showEvents, setShowEvents] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [cities, setCities] = useState([]);
    const [filterDate, setFilterDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCities();
    }, [])

    useEffect(() => {
        getAllEvents();
    }, [filterDate])

    async function getAllEvents() {
        const dateTime = moment(filterDate).format("YYYY-MM-DD");
        const { data } = await api.getEvents(dateTime);
        let eventList = data.map(function (eventItem, index) {
            return <EventCard key={index} event={eventItem} />;
        });
        setEvents(eventList);
    }

    const getCities = debounce(async () => {
        try {
            const { data } = await api.getAllCities();
            setCities(data.map((item, index) => {
                const city = {};
                city.key = index;
                city.text = item.name;
                city.value = item.name;
                return city;
            }));
        } catch (error) {
            console.error(error)
        }
    }, 500);

    function handleChange(event) {
        event.persist();
    }

    return (
        <div>
            <Grid>
                <Grid.Column stretched width='3'>
                    <DefaultSidebar value={filterDate} setFilterDate={setFilterDate} />
                </Grid.Column>
                <Grid.Column stretched width='13'>
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
                                        onChange={(event) => handleChange(event)}
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
                </Grid.Column>
            </Grid>
        </div>
    );

}

export default Welcome;