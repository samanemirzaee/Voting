import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AddCondidate from './Condidate/addCondidate'
import React from "react";
import Home from './Home'


const Pages = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/');
    },[])
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/AddCondidate' element={<AddCondidate />} />
            </Routes>
        </>
    )
}

export default Pages