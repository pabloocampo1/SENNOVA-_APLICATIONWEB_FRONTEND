import React, { useEffect, useState } from 'react';
import api from '../../../service/axiosService';
import { useAuth } from '../../../context/AuthContext';

const DashboardPage = () => {
    const {authObject} = useAuth();
    const [data, setData] = useState([]);


    const [data1, setData1] = useState([]);


    const tare = async () => {
        try {
            const res = await api.get("/product/getAll");
            setData1(res.data.content)
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {

       const getDatA = async () => {
         try {
            const response = await api.get("/users/getAll")
            console.log(response);
            setData(response.data)
            console.log("data: " + response.data);
            
            
        } catch (error) {
            console.error(error);
        }
       }

       getDatA()

    },[])
    return (
        <div>
            hola: {authObject.name}
            {data.map((data) => {
                return (
                    data.name
                )
            })}

            <button onClick={() => tare()}>traer otra</button>
            {data1.map((data) => {
                return (
                    data.matrix
                )
            })}
        </div>
    );
};

export default DashboardPage;