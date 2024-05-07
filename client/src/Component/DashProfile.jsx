import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useRef, useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFailure,
  updateSucess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSucess,signOutSucess
} from "../Redux/User/userSlice.js";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { async } from "@firebase/util";

function DashProfile() {
  const { currentUser , error } = useSelector((state) => state.user) || {};

  // Corrected useState hooks
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const filePicker = useRef();
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateError , setUpdateError] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal , setShowModal] = useState(false)
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not able to upload the image");
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileURL(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleSubmit = async (e) => {
      
    e.preventDefault();
    setUpdateError(null)
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length == 0) {
        setUpdateError('No change is made')
      return;
    }

    if (imageFileUploading) {
        setUpdateError('Please wait to upload')
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateError(data.message)
      } else {
        dispatch(updateSucess(data));
        setUpdateUserSuccess("User Profile updated Sucessfully");
      }
    } catch (error) {}
  };

  const handleDeleteUser = async() =>{
    setShowModal(false)
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE'
      })

      const data = await res.json()
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }
      else{
        dispatch(deleteUserSucess(data))
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async()=>{
    try {
      const res = await fetch(`api/user/signout`, {
        method : "POST",
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }
      else{
        dispatch(signOutSucess())
      }
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePicker}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePicker.current.click();
          }}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                },
                path: {
                  stroke: `rgba(62,152,199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileURL || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-gray-200 
                    ${
                      imageFileUploadingProgress &&
                      imageFileUploadingProgress < 100 &&
                      "opacity-60"
                    }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className="cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateSucess}
        </Alert>
      )}
      {updateError && (
        <Alert color="failure" className="mt-5">
          {updateError}
        </Alert>
      )}
        {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal show={showModal} onClose={ () => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
        <div className="text-center">
        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
        <h3 className="mb-5 text-lg text-grey-500 ">Are you sure you want to delete your account</h3>
        <div className="flex justify-center gap-4">
          <Button color='failure' onClick={handleDeleteUser}> Yes i am Sure</Button>
          <Button color="gray" onClick={() => setShowModal(false)}> No , Cancel</Button>
        </div>
        </div>
      
        </Modal.Body>
      </Modal>
      
    </div>
  );
}

export default DashProfile;
