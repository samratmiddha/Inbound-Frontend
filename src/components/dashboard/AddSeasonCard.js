import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";
import AddSeasonModal from "./AddSeasonModal";


export default function AddSeasonCard(){
const dispatch=useDispatch();
    const handleOpen=()=>{
        dispatch(setOpen(true))
    }
    return(
        <Card onClick={handleOpen}>
            <AddSeasonModal />
            <CardActionArea>
                <CardMedia
                component="img"
                height="160"
                image={require('../../assets/ic_baseline-add.png')}>
                </CardMedia> 
                <CardContent>
                    <Typography variant="h4">Create New Season</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}