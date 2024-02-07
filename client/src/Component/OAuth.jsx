import React from 'react';
import { Button } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Removed SignInMethod
import { app } from '../Firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/User/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST', // Corrected to 'POST'
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                }),
            });

            const data = await res.json(); // Corrected to call json() method
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            // Consider providing user feedback here
        }
    };

    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <FcGoogle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    );
}

export default OAuth;
