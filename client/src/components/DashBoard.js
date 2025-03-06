import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import PostsCard from './PostsCrad';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import nodataFound from '../assests/nosearchFound.png'
export default function DashBoard() {
  const [PostData, setPostData] = useState([]);
  const [searchedData, setSearchedData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const my_id = localStorage.getItem('Id');
  const navigate = useNavigate();

  const handleFetchAllData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-all-data/` + localStorage.getItem('Id'));
      const filteredData = response.data.filter((post) => post.skills && post.skills.length > 0 && post.userName); // Filter out posts without skills or bio
      setPostData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handelSearch = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/search-engine?query=${data}`);
      setSearchedData(response.data);
    } catch (error) {
      console.error('Error fetching search data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllData();
  }, []);

  const dataToDisplay = searchedData || PostData;

  const shuffledData = dataToDisplay.sort(() => 0.5 - Math.random());
  const dataToRender = shuffledData.slice(0, 9);

  return (
    <div>
      <div className="fixed-top" style={{ zIndex: 1030 }}>
        <Navbar handelSearch={handelSearch}/>
      </div>

      

      <div className="container" style={{ maxWidth: '1200px', marginTop: '160px', padding: '20px' }}>
 <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
   {isLoading ? (
     Array.from({ length: 6 }).map((_, index) => (
       <div key={index} className="col">
         <Skeleton height={200} />
         <Skeleton height={30} style={{ marginTop: '10px' }} />
         <Skeleton width="80%" height={20} style={{ marginTop: '10px' }} />
       </div>
     ))
   ) : dataToRender.length === 0 ? (
    <div className="col-12 text-center py-5">
    <img 
      src={nodataFound} 
      alt="No data found"
      style={{
        maxWidth: '300px',
        width: '100%',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
      }}
    />
   </div>
   ) : (
     dataToRender.map((data, index) =>
       data._id !== my_id && data.skills && data.skills.length > 0 ? (
         <div key={index} className="col">
           <PostsCard PostData={data} />
         </div>
       ) : null
     )
   )}
 </div>
</div>
    </div>
  );
}
