import React, {useState, useEffect, useCallback} from "react";
import {useDropzone} from 'react-dropzone'
import './App.css';
import axios from "axios";

const UserProfile = () => {

    const [userProfiles, setUserProfiles] = useState([]);

    const fetchUserProfile = () => {
        axios.get("http://localhost:8081/api/v1/user-profile").then(res => {
            console.log(res);
            setUserProfiles(res.data);
        });
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return userProfiles.map((userProfile, index) => {
        return (
            <div key={index}>
                {/*TODO: profile image*/}
                <br/>
                <br/>
                <h1>{userProfile.userName}</h1>
                <p>{userProfile.userProfileId}</p>
                <MyDropzone userProfileId={userProfile.userProfileId}/>
                <br/>
            </div>
        )
    });
}

function MyDropzone({userProfileId}) {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        console.log(file);

        const formData = new FormData();
        formData.append("file", file);

        axios.post(`http://localhost:8081/api/v1/user-profile/${userProfileId}/image/upload`,
            formData,
            {
                headers: {"Content-Type": "multipart/form-data"}
            }).then(() => {
            console.log("file uploaded successfully")
        }).catch(err => {
            console.error(err)
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Drag 'n' drop some profile image, or click to select profile image</p>
            }
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <UserProfile/>
        </div>
    );
}

export default App;