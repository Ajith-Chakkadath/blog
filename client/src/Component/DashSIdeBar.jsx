import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar} from 'flowbite-react';
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa"; // Corrected and imported icons

function DashSIdeBar() {
    const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); 
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
    setTab(tabFromUrl); 
    }
    console.log(tabFromUrl);
  }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item  active={tab === 'profile'} icon={FaUserAlt} label={'User'} labelColor='dark' as='div'>
            Profile
          </Sidebar.Item>
        </Link>
        
          <Sidebar.Item icon={FaSignOutAlt} className='cursor-pointer'>
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSIdeBar;
