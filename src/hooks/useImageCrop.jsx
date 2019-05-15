import React, { useState, useEffect } from "react";
import { Modal, Button, Icon } from 'semantic-ui-react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

const useImageCrop = (crop_data) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [croppedImageFile, setCroppedImageFile] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const [crop, setCrop] = useState(crop_data);

    /**
     * @param {File} image - Image File Object
     * @param {Object} crop - crop Object
     * @param {String} fileName - Name of the returned file in Promise
     */
    function getCroppedImg(image, crop, fileName) {
        let fileUrl = '';
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
                URL.revokeObjectURL(fileUrl);
                fileUrl = window.URL.createObjectURL(blob);
                resolve({ fileUrl, blob });
            }, "image/jpeg");
        });
    }

    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            const { fileUrl, blob } = await getCroppedImg(
                imageRef,
                crop,
                "newFile.jpeg"
            );
            setCroppedImageUrl(fileUrl);
            setCroppedImageFile(blob);
        }
    }

    const onImageLoaded = (image) => {
        console.log('load');
        if (!imageRef)
            setImageRef(image);
    };

    const changeCrop = (crop) => {
        console.log(crop);
        setCrop(crop);
    }

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
                            onChange={changeCrop}
                        // onComplete={makeClientCrop}
                        // onImageLoaded={onImageLoaded}
                        />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={handleClose} inverted>
                        <Icon name='close' /> No
                    </Button>
                    <Button color='green' onClick={handleClose} inverted>
                        <Icon name='checkmark' /> OK
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    return { cropModal, croppedImageFile, croppedImageUrl, setModalOpen, setUploadedImage }
}

export { useImageCrop };
