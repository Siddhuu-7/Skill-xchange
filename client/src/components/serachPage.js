import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowLeft, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from'./searchbar'
import PostsCard from './PostsCrad';
import nodataFound from '../assests/nosearchFound.png'



const SearchPage = () => {
  const [searchedData, setSearchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [PostData, setPostData] = useState([]);
  const navigate = useNavigate();
  const my_id = localStorage.getItem('Id');

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

  const handleFetchAllData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-all-data/` + localStorage.getItem('Id'));
      const filteredData = response.data.filter((post) => post.skills && post.skills.length > 0 && post.userName);
      setPostData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllData();
  }, []);

  const dataToDisplay = searchedData.length > 0 ? searchedData : PostData;
  const shuffledData = [...dataToDisplay].sort(() => 0.5 - Math.random());
  const dataToRender = shuffledData.slice(0, 9);

  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-3">
                <div className="d-flex align-items-center">
                  <ArrowLeft
                    size={24}
                    onClick={() => navigate(-1)}
                    className="me-3"
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="flex-grow-1">
                    <SearchBar handelSearch={handelSearch} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="mb-4">
          <h4 className="mb-1">Results</h4>
          <p className="text-muted">Found {dataToRender.length} matches</p>
        </div>
        
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="col">
                <SkeletonCard />
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
                  margin: '0 auto',
                  opacity: 0.7
                }}
              />
              <h4 className="mt-4">No results found</h4>
              <p className="text-muted">Try adjusting your search terms</p>
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
};

export default SearchPage;
const SkeletonCard = () => (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <div className="bg-light w-100" style={{ height: "120px" }}></div>
        <div className="bg-light w-75 mt-3" style={{ height: "24px" }}></div>
        <div className="bg-light w-50 mt-2" style={{ height: "18px" }}></div>
        <div className="d-flex mt-3 gap-2">
          <div className="bg-light rounded-pill" style={{ height: "26px", width: "70px" }}></div>
          <div className="bg-light rounded-pill" style={{ height: "26px", width: "90px" }}></div>
        </div>
      </div>
    </div>
  );