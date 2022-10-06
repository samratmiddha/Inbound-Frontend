import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../features/seasonModalSlice";


export default function AddSeasonModal(){
    const open = useSelector((state)=>state.seasonModal.open);
    const dispatch = useDispatch();

    const handleClose = ()=>{
        dispatch(setOpen(false))
    }
return (
    <div>
    <Modal
    open={open}
    onClose={handleClose}>
    </Modal>
    <Box>
 <Typography>Hello</Typography>
    </Box>
    </div>
 );
}