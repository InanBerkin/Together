import React, { useState, useCallback, useEffect } from 'react';
import { Form, Header, Container, Divider, Label, Dropdown, Segment, Icon, Button, Image, Modal } from 'semantic-ui-react';
import debounce from 'lodash/debounce';
import { useForm } from "hooks/useForm";
import { useDropzone } from 'react-dropzone'
import GoogleMapReact from 'google-map-react';
import api from "api.js";

import Skeleton from 'react-loading-skeleton';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import "./CreateEventForm.scss";

// function CategoryLabel(){

// }

function CreateGroupForm() {
    const [categories, setCategories] = useState(new Map());
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCity, setSelectedCity] = useState('SF');
    const [imageFile, setImageFile] = useState(null);

    const [uploadedImage, setUploadedImage] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [crop, setCrop] = useState({
        aspect: 16 / 9,
        height: 250,
        x: 0,
        y: 0
    });
    const { values, handleChange, handleSubmit, errors, isSubmitting } = useForm(validate, submitGroupForm);

    useEffect(() => {

    }, [])

    /**
     * @param {File} image - Image File Object
     * @param {Object} crop - crop Object
     * @param {String} fileName - Name of the returned file in Promise
     */
    function getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                blob.lastModifed = new Date();
                URL.revokeObjectURL(croppedImageUrl);
                setImageFile(blob)
                setCroppedImageUrl(URL.createObjectURL(blob));
                console.log(URL.createObjectURL(blob));
                resolve(croppedImageUrl);
            }, "image/jpeg");
        });
    }

    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            await getCroppedImg(
                imageRef,
                crop,
                "newFile.jpeg"
            );
            setErrorText('');
        }
    }

    const onImageLoaded = (image, crop) => {
        setImageRef(image);
    };

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles[0].size > 104857600) {
            setErrorText('Image size exceeded');
            return;
        }
        setImageFile(acceptedFiles[0]);
        setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
        setModalOpen(true);
    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/jpeg, image/png',
    });

    async function submitGroupForm() {
        try {
            const { data } = await api.uploadImage(imageFile);
            const payload = { 
                ...values, 
                city: selectedCity, 
                image: data.img, 
                starttime: new Date("May 11 2019 12:30"), 
                endtime: new Date("May 16 2019 12:30"), 
                locationlat: 39.9231824,
                locationlng: 32.8562239,
                groupid: 8,
                organizers: [7]
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
        return errors;
    };

    const cropModal = () => {
        if (!uploadedImage) {
            return;
        }
        const handleClose = () => {
            setModalOpen(false);
        }
        return (
            <Modal align='center' size='large' open={modalOpen}>
                <Modal.Header>Crop Image</Modal.Header>
                <Modal.Content image>
                    <Modal.Description align='center'>
                        <ReactCrop
                            src={uploadedImage}
                            crop={crop}
                            onChange={setCrop}
                            onComplete={makeClientCrop}
                            onImageLoaded={onImageLoaded}
                            minHeight={250}
                        />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    return (
        <Container className="create-group-form">
            <Header as='h1'>Create an event</Header>
            <Form size="huge" >
                <Form.Field error={errors.name && errors.name.length !== 0}>
                    <Header as='h3'>Step 1</Header>
                    <Form.Input name="name" value={values.name || ''} label="What will be your event's name?" placeholder='Event name' onChange={handleChange} />
                    {errors.name && (<Label basic color='red' pointing>{errors.name}</Label>)}
                </Form.Field>
                <Divider />
                <Form.Field>
                    <Header as='h3'>Step 2</Header>
                    <Header as='h3'>Where will be your event be located?</Header>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyAEEYO5lpb9dQahzGZsg0Ye6oDLpKrh5-g' }}
                        defaultCenter={{lat: 39.9231824,lng: 32.8562239}}
                        yesIWantToUseGoogleMapApiInternals
                        defaultZoom={11}/>
                    </div>
                </Form.Field>
                <Divider />
                <Form.Field error={errors.description && errors.description.length !== 0}>
                    <Header as='h3'>Step 4</Header>
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
                <Header as='h3'>Step 6 (Optional)</Header>
                <Header as='h3'>Quota</Header>
                <Form.Input name="quota" type="number" value={values.quota || 0} placeholder='0' onChange={handleChange}/>
                </Form.Field>
                <Form.Button size="big" color="green" onClick={handleSubmit}>Create Group</Form.Button>
            </Form>
        </Container>
    );
}

export default CreateGroupForm;

