import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashProfile from '../Component/DashProfile';
import DashSIdeBar from '../Component/DashSIdeBar';

function Dashboard() {
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
    <div className='min-h-screen flex flex-col md:flex-row'>
<div className=" md:w-56">
{/* sideBar */}
<DashSIdeBar />
</div>

{/* profile */}
{ tab == 'profile' && <DashProfile />}

      
      
      
  </div> // Display the current tab
  );
}

export default Dashboard;
