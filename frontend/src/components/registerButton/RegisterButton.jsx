
import React , {useState} from 'react'
import {Typography , DialogActions , Button , DialogContent , Dialog , DialogTitle , TextField}  from '@mui/material';


export default function RegisterButton({open , handleClose , handleSubmit}) {
   const [name , setName] = useState("");
   const [username , setUsername] = useState("");
   const [password , setPassword] = useState("");
   
   const handleRegisterSubmit = () => {
        handleSubmit(name , username , password);
   }

  return (
    <Dialog open = {open} >
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField 
            margin = 'dense'
            id = 'name'
            label = 'Name'
            fullWidth
            variant= 'standard'
            // value = {newUser.name}
            onChange = {(e) => setName(e.target.value)}
          />
          <TextField 
              margin = 'dense'
              id = 'username'
              label = 'Username'
              fullWidth
            //   value = {newUser.username}
              onChange = {(e) => setUsername(e.target.value)}
              variant = 'standard'

          />
          <TextField 
            margin = 'dense'
            id = 'password'
            label = 'Password'
            fullWidth
            type = 'password'
            variant= 'standard'
            // value = {newUser.password}
            onChange = {(e) => setPassword(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button variant = 'text' onClick = {handleClose}>Cancel</Button>
          <Button variant = 'container' onClick = {handleRegisterSubmit}>Submit</Button>
        </DialogActions>

       
    </Dialog>
  )
}
