import React from 'react'
import { Button } from '@mui/material';
import {Avatar} from '@mui/material';


export default function LoginButton(){

return(
<Button 
variant="outlined"
startIcon={<Avatar src={require('../../assets/op_logo.png')} variant="square"/>}
onClick={window.location.href="localhost:8000/send_token_request"}
>
Login With Omniport
</Button>
);
}