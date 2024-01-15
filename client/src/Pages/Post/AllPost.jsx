import React, { useEffect, useState } from 'react';
import { allPost } from '../../Services/API/postAPI/postAllAPI';

function AllPost() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getInfo = await allPost();
        setResult([...result, getInfo]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {result.map((data, index) => (
        <div key={index}>
          <p>{data.title}</p>
          <p>{data.content}</p>
        </div>
      ))}
    </div>
  );
}

export default AllPost;
