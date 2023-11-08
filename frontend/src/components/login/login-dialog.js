import { useState, forwardRef } from "react"
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography
} from "@mui/material"

import { registerRendererType } from "highcharts";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const LoginDialog = ({ open, handleClose, handleSubmit, setOpenRegisterDialog }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
   
    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(username, password)
    }


    const handleEnterKeyDown = (event) => {
        if (event.key === "Enter") {
            onSubmit(event)
        }
    }
    function handleClick(){
        setOpenRegisterDialog(true);
        handleClose();
    }
    return (
        <>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            onKeyDown={handleEnterKeyDown}
        >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" type="submit" onClick={onSubmit}>
                    Submit
                </Button>
            </DialogActions>
            <Typography  onClick = {handleClick} variant = 'body' sx = {{textAlign :  'center' , textDecoration : 'underline' , cursor : 'pointer' , my : 2}}>
            Don't have an account ? Register here 
          </Typography>
        </Dialog>

       
        </>
    )
}
