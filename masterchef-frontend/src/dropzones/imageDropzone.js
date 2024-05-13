import Dropzone from "react-dropzone";
import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { IoMdDownload } from "react-icons/io";

const ImageDropZone = ({ onImageDrop, initialImage }) => {
    const [isNotNull, setIsNotNull] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imagePreview, setImagePreview] = useState(
        <div className="dropzone-container">
            <IoMdDownload size={100} />
            <span className="small w-75 text-center">Click to select a photo or drop one here.</span>
        </div>
    );

    useEffect(() => {
        if(initialImage) {
            setImagePreview(
                <div className="dropzone-container">
                    <img src={initialImage} alt="" width={"100%"} height={"100%"}/>
                </div>
            );
            setIsNotNull(true);
        }
    }, [initialImage]);

    const handleImageDrop = (acceptedFiles) => {
        if(acceptedFiles.length > 1) {
            toast.error("Only select 1 image", {
                autoClose: 3000,
                position: "top-right"
            });
            return;
        }

        if(!acceptedFiles[0].type.startsWith('image/')) {
            toast.error("Invalid file", {
                autoClose: 3000,
                position: "top-right"
            });
            return;
        }

        onImageDrop(acceptedFiles[0]);
        setImagePreview(
            <div className="dropzone-container">
                <img src={URL.createObjectURL(acceptedFiles[0])} alt="" className="initial-image"/>
            </div>   
        );
        setIsNotNull(true);
    };

    return (
        <div className="dropzone-container">

            <Dropzone
                onDrop={acceptedFiles => handleImageDrop(acceptedFiles)}>

                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div 
                        {...getRootProps({})}
                        className={`${(isDragActive)? "active" : ""}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <input {...getInputProps({})} />
                        {(isDragActive && isNotNull) && (
                            <div className="drag-active">
                                <RiImageAddFill size={100} />
                                <p>Change Image</p>
                            </div>
                        )}

                        {(isHovered && !isNotNull) && (
                            <div className="hover-active">
                                <FaRegEdit size={50}/>
                                <p>Choose an image</p>
                            </div>
                        )}

                        {imagePreview}
                    </div>   
                )}
            </Dropzone>

        </div>

    );
}

export default ImageDropZone;