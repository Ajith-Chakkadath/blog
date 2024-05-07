import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar} from 'flowbite-react';
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa"; // Corrected and imported icons
import { signOutSucess } from '../Redux/User/userSlice';
import { useDispatch } from 'react-redux';

function DashSIdeBar() {
    const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); 
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
    setTab(tabFromUrl); 
    }
    console.log(tabFromUrl);
  }, [location.search]);

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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item  active={tab === 'profile'} icon={FaUserAlt} label={'User'} labelColor='dark' as='div'>
            Profile
          </Sidebar.Item>
        </Link>
        
          <Sidebar.Item icon={FaSignOutAlt} className='cursor-pointer ' onClick={handleSignOut} >
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSIdeBar;
