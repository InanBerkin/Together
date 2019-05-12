import React, { useState, useCallback, useEffect } from 'react';
import { Form, Header, Container, Divider, Label, Dropdown, Segment, Icon, Button, Image, Modal } from 'semantic-ui-react';
import debounce from 'lodash/debounce';
import { useForm } from "hooks/useForm";
import { useDropzone } from 'react-dropzone'
import api from "api.js";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import "./CreateGroupForm.scss";

// function CategoryLabel(){

// }

function CreateGroupForm() {
    const [categories, setCategories] = useState(new Map());
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState('');
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
        getAllCities();
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
        if (acceptedFiles[0].size > 1048576) {
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

    const getAllCities = debounce(async () => {
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
        const allCategories = [{ content: 'Tech', color: 'yellow' }, { content: 'Career', color: 'blue' }];
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

    async function submitGroupForm() {
        try {
            const { data } = await api.uploadImage(imageFile);
            const payload = { ...values, categories: [...categories.keys()], image: data.img }
            const res = await api.createGroup(payload);
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
        if (categories.size <= 0) {
            errors.categories = 'Select at least one category';
        }
        if (!values.city) {
            errors.city = 'Location is required';
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
            <Header as='h1'>Create a group</Header>
            <Form size="huge" >
                <Form.Field error={errors.name && errors.name.length !== 0}>
                    <Header as='h3'>Step 1</Header>
                    <Form.Input name="name" value={values.name || ''} label="What will be your group's name?" placeholder='Group name' onChange={handleChange} />
                    {errors.name && (<Label basic color='red' pointing>{errors.name}</Label>)}
                </Form.Field>
                <Divider />
                <Form.Field error={errors.categories && errors.categories.length !== 0}>
                    <Header as='h3'>Step 2</Header>
                    <Header as='h3'>What will your group be about?</Header>
                    <div className="category-box input">
                        {displaySelectedCategories()}
                    </div>
                    {errors.categories && (<Label className='error' basic color='red' pointing>{errors.categories}</Label>)}
                    <Label.Group size='medium'>
                        {getAllCategories()}
                    </Label.Group>
                </Form.Field>
                <Divider />
                <Form.Field error={errors.city && errors.city.length !== 0}>
                    <Header as='h3'>Step 3</Header>
                    <Header as='h3'>Where will be your group be located?</Header>
                    <Dropdown name='city' search clearable selection value={values.city || ''} onChange={(e, data) => {
                        handleChange(data);
                    }} options={cities}></Dropdown>
                    {errors.city && (<Label basic color='red' pointing>{errors.city}</Label>)}
                </Form.Field>
                <Divider />
                <Form.Field error={errors.description && errors.description.length !== 0}>
                    <Header as='h3'>Step 4</Header>
                    <Form.TextArea name="description" value={values.description || ''} label='Group Description' placeholder='Describe your group briefly' onChange={handleChange} />
                    {errors.description && (<Label basic color='red' pointing>{errors.description}</Label>)}
                </Form.Field>
                <Divider />
                <Header as='h3'>Step 5</Header>
                <Header as='h3'>Upload a group image</Header>
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
                <Form.Button size="big" color="green" onClick={handleSubmit}>Create Group</Form.Button>
            </Form>
        </Container>
    );
}

export default CreateGroupForm;

