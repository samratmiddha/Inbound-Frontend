import React, { useEffect } from 'react'
import CheckLogin from '../CheckLogin.js'



export default function Dashboard(){
    useEffect(()=>{CheckLogin()},[]);
    return("Welcome User")
}