import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import ContainerAddPassword from './ContainerAddPassword'
import {useNavigate} from "react-router-dom";
import axiosApi from "../utils/axiosApi.js"

const AddPasswords = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const response = await axiosApi.get("/users/check-auth", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Not Authenticated")
        }
      } catch (error) {
        // navigate("/login");
        setIsAuthenticated(false);
      } finally{
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <ContainerAddPassword />
    </div>
  )
}

export default AddPasswords;
