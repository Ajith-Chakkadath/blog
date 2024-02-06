import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import {signInStart, signInSuccess,signInFailure} from '../Redux/User/userSlice'





function SignIn() {
const [formData , setFormData] = useState({})
const navigate = useNavigate()
const dispatch = useDispatch()
const {loading ,error:errorMessage} = useSelector(state => state.user)


  const handleChange = (e) =>{
    setFormData({...formData , [e.target.id]:e.target.value.trim()})
  }
  console.log(formData)

const handleSubmit =  async(e) => {
  e.preventDefault()
  if( !formData.email || !formData.password){
    return dispatch(signInFailure('Please fill all field'))
  }
  try {
    dispatch(signInStart())
    const res = await fetch('/api/auth/signin',{
      method:'POST',
      headers :{
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success == false){
      dispatch(signInFailure(data.message))
    }
   

    if(res.ok){
      dispatch(signInSuccess(data))
      navigate('/')
    }

  } catch (error) {
    dispatch(signInFailure(error.message))
  }

}

  return (
 <div className='min-h-screen mt-20' >
<div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
  {/* right */}
    <div className="flex-1">
    <Link to='/'className=' font-bold dark:text-white text-4xl'>
<span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'> Ajith Chakkadath</span>
    </Link>

    <p className='text-sm mt-5'>
      Demo Project 
    </p>
    </div>
    {/* left */}
    <div className="flex-1">
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="">
          <Label value='Your Email ' />
          <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
        </div>
        <div className="">
          <Label value='Your Password' />
          <TextInput type='password' placeholder='*********' id='password' onChange={handleChange} />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit' disabled ={loading}>
        {
          loading ?( <><Spinner size='sm' /> <span className='pl-3'>loading ... </span> </>) : 'Sign In'
        }
        </Button>
      </form>
      <div className="flex gap-2 text-sm mt-5">
        <span>Don't have an account?</span>
        <Link to='/sign-up' className='text-blue-500'>Sign up</Link>
      </div>
      {
        errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )
      }
    </div>
</div>
 </div>
  )
}

export default SignIn