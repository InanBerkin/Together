import React, { useState, useCallback } from 'react';
import { Form, Header, Container, Divider, Label, Segment, Icon, Button } from 'semantic-ui-react';
import { useForm } from "hooks/useForm";
import { useImageCrop } from "hooks/useImageCrop";
import { useDropzone } from 'react-dropzone'
import TimePicker from 'rc-time-picker'
import GoogleMapReact from 'google-map-react';
import api from "api.js";

import Calendar from 'react-calendar';
import 'react-image-crop/lib/ReactCrop.scss';

import "./CreateEventForm.scss";

function CreateEventForm({ location }) {
    const [selectedCity, setSelectedCity] = useState('Ankara')
    const [coordinates, setCoordinates] = useState({});
    const [addressText, setAddressText] = useState('');
    const [googleApi, setGoogleApi] = useState({});
    const [errorText, setErrorText] = useState('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState();

    const defaultCenter = { lat: 39.923, lng: 32.856 };

    const crop_data = {
        height: 500,
        width: 800
    };


    const onComplete = async (img) => {
        try {
            const { data } = await api.uploadImage(img);
            setUploadedImageUrl(data.img);
        } catch (error) {
            console.error(error);
        }
    }

    const { values, handleChange, handleSubmit, errors } = useForm(validate, submitGroupForm);
    const { cropModal, croppedImageFile, croppedImageUrl, setModalOpen, setUploadedImage } = useImageCrop(crop_data, onComplete);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles[0].size > 104857600) {
            setErrorText('Image size exceeded');
            return;
        }
        setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
        setModalOpen(true)
    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/jpeg, image/png',
    });

    async function submitGroupForm() {
        try {
            const payload = {
                ...values,
                city: selectedCity,
                image: uploadedImageUrl,
                locationlat: coordinates.lat,
                locationlng: coordinates.lng,
                groupid: location.state.group_id,
                organizers: [1]
            }
            const res = await api.createEvent(payload);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    //Validation Rules
    function validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Group name is required';
        }
        if (!values.description) {
            errors.description = 'Description is required';
        }
        if (!values.starttime || !values.endtime) {
            errors.time = 'Start time and finish time is required';
        }
        if (values.starttime > values.endtime) {
            errors.time = 'Start time must be earlier';
        }
        if (!addressText) {
            errors.address = 'Address is required';
        }
        return errors;
    };

    const handleApiLoaded = (map, maps) => {
        const geocoder = new maps.Geocoder();
        const infowindow = new maps.InfoWindow();
        const marker = new maps.Marker({
            position: defaultCenter,
            map: map
        });
        setGoogleApi({ map, maps, geocoder, infowindow, marker });
    }

    const handleMapClick = (position) => {
        setCoordinates({ lat: position.lat, lng: position.lng });
        googleApi.geocoder.geocode({ 'location': position }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    googleApi.map.setZoom(11);
                    googleApi.marker.setMap(null);
                    let marker = new googleApi.maps.Marker({
                        position: position,
                        map: googleApi.map
                    });
                    console.log(results[0].formatted_address);
                    setGoogleApi({ ...googleApi, marker });
                    setAddressText(results[0].formatted_address);
                    googleApi.infowindow.setContent(results[0].formatted_address);
                    googleApi.infowindow.open(googleApi.map, marker);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }



    return (
        <Container className="create-group-form">
            <Header as='h1'>Create an event for {location.state.group_name}</Header>
            <Form size="huge" >
                <Form.Field error={errors.name && errors.name.length !== 0}>
                    <Header as='h3'>Step 1</Header>
                    <Form.Input name="name" value={values.name || ''} label="What will be your event's name?" placeholder='Event name' onChange={handleChange} />
                    {errors.name && (<Label basic color='red' pointing>{errors.name}</Label>)}
                </Form.Field>
                <Divider />
                <Form.Field error={errors.address && errors.address.length !== 0}>
                    <Header as='h3'>Step 2</Header>
                    <Header as='h3'>Where will be your event be located?</Header>
                    <div className="google-maps">
                        <GoogleMapReact id="map"
                            bootstrapURLKeys={{ key: '***REMOVED***' }}
                            defaultCenter={defaultCenter}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                            onClick={(event) => handleMapClick({ lat: event.lat, lng: event.lng })}
                            defaultZoom={11} >
                            {/* <Marker
                                lat={coordinates.lat || defaultCenter.lat}
                                lng={coordinates.lng || defaultCenter.lng} /> */}
                        </GoogleMapReact>
                        <div className="address">
                            <Header as='h2'>
                                <Icon name='map pin' />
                                <Header.Content>Address</Header.Content>
                            </Header>
                            <div className="address-text">{addressText || <i>Select a place on the map</i>}</div>
                            {errors.address && (<Label basic color='red' pointing>{errors.address}</Label>)}
                        </div>
                    </div>
                </Form.Field>
                <Divider />
                <Form.Field error={errors.time && errors.time.length !== 0}>
                    <Header as='h3' >Step 3</Header>
                    <div className='calendars'>
                        <div className="calendar-area">
                            <Header as='h3' textAlign='center'>When will it start?</Header>
                            <Calendar name="starttime" value={values.starttime} onChange={(data) => handleChange(data, 'starttime')} minDate={new Date()} />
                        </div>
                        <div className="calendar-area">
                            <Header as='h3' textAlign='center'>When will it finish?</Header>
                            <Calendar name="endtime" value={values.endtime} onChange={(data) => handleChange(data, 'endtime')} minDate={new Date()} />
                        </div>
                    </div>
                    <TimePicker
                        showSecond={false}
                        className="xxx"
                        use12Hours
                    />
                    <div align='center'>{errors.time && (<Label basic color='red' pointing>{errors.time}</Label>)}</div>
                </Form.Field>
                <Divider />
                <Header as='h3'>Step 4</Header>
                <Form.Field error={errors.description && errors.description.length !== 0}>
                    <Form.TextArea name="description" value={values.description || ''} label='Event Description' placeholder='Describe your group briefly' onChange={handleChange} />
                    {errors.description && (<Label basic color='red' pointing>{errors.description}</Label>)}
                </Form.Field>
                <Divider />
                <Header as='h3'>Step 5</Header>
                <Header as='h3'>Upload an event image</Header>
                <Segment placeholder>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {acceptedFiles[0] ?
                            <div align='center'>
                                <p>{errorText}</p>
                                {croppedImageUrl && (
                                    <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                                )}
                                <Button primary>Change Image</Button>
                            </div> : (
                                <div>
                                    <Header textAlign='center' as='h3'>Drag & Drop</Header>
                                    <Divider horizontal>Or</Divider>
                                    <Button primary>Select Image</Button>
                                </div>
                            )}
                    </div>
                    {cropModal()}
                </Segment>
                <Form.Field>
                    <Header as='h3'>Quota (Optional)</Header>
                    <Form.Input name="quota" type="number" value={values.quota || 0} placeholder='0' onChange={handleChange} />
                </Form.Field>
                <Form.Button size="big" color="green" onClick={handleSubmit}>Create Group</Form.Button>
            </Form>
        </Container>
    );
}

export default CreateEventForm;

