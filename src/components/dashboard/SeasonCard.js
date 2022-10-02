import React from 'react'
import { Card,CardContent,CardMedia,CardActionArea } from '@mui/material'
import DesignServicesIcon from '@mui/icons-material/DesignServices';

export default function SeasonCard(props){
    return(
     <Card>
        <CardActionArea>
            <CardMedia
            component="img"
            height="100" 
            width="100"
            img={props.season_type=='designer'? ""}
            />
        </CardActionArea>
     </Card>
    )
}