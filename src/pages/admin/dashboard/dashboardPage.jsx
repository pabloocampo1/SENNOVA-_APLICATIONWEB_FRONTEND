import React, { useEffect } from 'react';
import api from '../../../service/axiosService';
import { useAuth } from '../../../context/AuthContext';

const DashboardPage = () => {
    const {authObject} = useAuth();

    useEffect(() => {

       const getDatA = async () => {
         try {
            const response = await api.get("/product/getAll")
            console.log(response);
            
        } catch (error) {
            console.error(error);
            
        }
       }

       getDatA()

    },[])
    return (
        <div>
            hola: {authObject.name}
        </div>
    );
};

export default DashboardPage;