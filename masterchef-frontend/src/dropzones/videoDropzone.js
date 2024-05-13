import Dropzone from "react-dropzone";
import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { IoMdDownload } from "react-icons/io";

const VideoDropZone = ({ onVideoDrop, initialVideo }) => {

    const [isNotNull, setIsNotNull] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [videoPreview, setVideoPreview] = useState(
        <div className="dropzone-container">
            <IoMdDownload size={100}/>
            <p>Click to select a video or drop here</p>
        </div>
        );

    useEffect(() => {
        if(initialVideo) {
            setVideoPreview(
                <div className="dropzone-container">
                    <video src={initialVideo} alt="" className="video-preview" controls/>
                </div>
            );
            setIsNotNull(true);
        }
    }, [initialVideo]);

    const handleVideoDrop = (acceptedFiles) => {
        if(acceptedFiles.length > 1) {
            toast.error("Only select 1 video", {
                autoClose: 3000,
                position: "top-right"
            });
        }

        if(!acceptedFiles[0].type.startsWith('video/')) {
            toast.error("Invalid file", {
                autoClose: 3000,
                position: "top-right"
            });
            return;
        }

        onVideoDrop(acceptedFiles[0]);
        setVideoPreview(
            <div className="dropzone-container">
                <video src={URL.createObjectURL(acceptedFiles[0])} alt="" className="video-preview" controls/>
            </div>
        );
        setIsNotNull(true);
    };

    return (
        <div className="dropzone-container">
            
            <Dropzone
                onDrop={acceptedFiles => handleVideoDrop(acceptedFiles)}>

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
                                <p>Change Video</p>
                            </div>
                        )}

                        {(isHovered && !isNotNull) && (
                            <div className="hover-active">
                                <FaRegEdit size={50}/>
                                <p>Choose a video</p>
                            </div>
                        )}

                        {videoPreview}

                    </div>   
                )}
            </Dropzone>

        </div>

    );
}

export default VideoDropZone;