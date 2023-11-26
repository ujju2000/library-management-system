import React , {useEffect} from 'react'
import {Paper,Container, Typography}  from '@mui/material';
import { BackendApi } from '../../client/backend-api';
import {useUser} from '../../context/user-context';

export default function ShowFeedback() {
  const {feedbacks} = useUser();
  useEffect(() => {
    console.log(feedbacks);
  }, [])
  return (
    <Container component={Paper} sx = {{my: 10 , p: 4}}>
                <Typography  variant="h5" sx = {{my: 2}}>
                    FEEDBACKS
                </Typography>
                
            </Container>
  )
}
