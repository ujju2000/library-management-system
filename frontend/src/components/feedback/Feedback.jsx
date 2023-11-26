
import React, {useState} from 'react'
import {FormControl  , Button , Paper , Container , Typography , FormGroup , TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import classes from './style.module.css';
import {NotificationManager} from 'react-notifications';
import { BackendApi } from '../../client/backend-api';

export default function Feedback() {
    const [feedback , setFeedback] = useState({name : '', email : '', comment : ''});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFeedback(prev => ({...prev, [e.target.name] : e.target.value}));
    }
    const handleFeedback = (e) => {
        e.preventDefault();
        const {user, error } = BackendApi.user.setfeedback(feedback);
           if(error) {
            NotificationManager.error(error);
           }else {  
               NotificationManager.success('Feedback submitted successfully');
               navigate('/');
           }
        setFeedback({name : '', email : '', comment : ''});
    }
  return (
    <>
         <Container component={Paper} sx = {{my: 10 , p: 4}}>
                <Typography  variant="h5" sx = {{my: 2}}>
                    Feedback Form
                </Typography>
                <form noValidate autoComplete="off" >
                    <FormGroup>
                        <FormControl className = {classes.mb2}>
                            
                            <TextField
                                label="Name"
                                name="name"
                                value = {feedback.name}
                                type="text"
                                onChange = {handleChange}
                            />
                        </FormControl>
                       
                        <FormControl className = {classes.mb2}>
                            
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value = {feedback.email}
                                onChange = {handleChange}

                            />
                        </FormControl>
                        
                        <FormControl className = {classes.mb2}>

                            <TextField
                                label="Comment"
                                name="comment"
                                type="text"
                                value = {feedback.comment}
                                multiline 
                                onChange = {handleChange}
                                rows = {5}
                            />
                        </FormControl>
                    </FormGroup>
                    <div className = {classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick = {() => navigate(-1)}   
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" onClick = {handleFeedback}>
                           Submit
                        </Button>
                    </div>
                </form>
            </Container>
    </>
  )
}
