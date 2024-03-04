import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useRef, useState ,useEffect} from 'react';
import { FaUpload } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../Firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    // Corrected useState hooks
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const filePicker = useRef()
    const [imageFileUploadingProgress , setImageFileUploadingProgress] = useState(null)
    const [imageFileUploadError ,setImageFileUploadError] = useState(null)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileURL(URL.createObjectURL(file));
        }
    };


useEffect(() => {
  if(imageFile){
      uploadImage()
  }
}, [imageFile])

const uploadImage = async ()=>{
    setImageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,imageFile)
    uploadTask.on(
        'state_changed',
        (snapshot) =>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
            setImageFileUploadingProgress(progress.toFixed(0))
        }, 
        (error)=>{
            setImageFileUploadError('Could not able to upload the image')
            setImageFileUploadingProgress(null)
            setImageFile(null)
            setImageFileURL(null)

        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageFileURL(downloadURL)
            })
        }
       
    )   
}


    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePicker} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>{ filePicker.current.click()}}>
            {
                imageFileUploadingProgress && (
                    <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`}  strokeWidth={5} 
                    styles={{
                        root:{
                            width: '100%',
                            height:'100%',
                            position:'absolute',
                            top : '0',
                            left : '0'
                        },
                        path:{
                            stroke : `rgba(62,152,199, ${imageFileUploadingProgress/100})`
                        }
                    }}
                    />
                )
            }
                    <img src={imageFileURL || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-gray-200 
                    ${imageFileUploadingProgress && imageFileUploadingProgress<100 && 'opacity-60'}`}/>
                </div>
                { imageFileUploadError && (<Alert color='failure'>
                    {imageFileUploadError }
                    </Alert>) }
                
                <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username}/>
                <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email}/>
                <TextInput type='password' id='password' placeholder='Password'/>
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}

export default DashProfile;
