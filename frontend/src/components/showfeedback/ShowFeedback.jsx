import React , {useEffect} from 'react'
import {Button, Box, Paper,Container, Typography}  from '@mui/material';
import {useUser} from '../../context/user-context';
import {useNavigate} from 'react-router-dom';

export default function ShowFeedback() {
  const {feedbacks} = useUser();
  
  const navigate = useNavigate();
  return (
    <Container component={Paper} sx = {{my: 10 , p: 4}}>
                <Typography  variant="h5" sx = {{my: 2 , fontWeight : 800 ,fontSize : '30px', textDecoration : 'underline'}}>
                    FEEDBACKS
                </Typography>
                <Box sx = {{display : 'grid', gridTemplateColumns : 'repeat(3,1fr)' }}>
                  {
                    feedbacks.length === 0 ? <>
                      <Typography variant = 'h3' sx = {{textAlign : 'center'}}>No feedbacks..... </Typography>
                    </>
                    :
                    feedbacks.map((feedback) => {
                      return (
                        <Box as = 'div' sx = {{border : '2px solid black ' , margin: 3, textAlign : 'center'}}>
                          <Typography variant = "h6" sx = {{fontStyle : 'italic' , color : '#607d8b', fontWeight : 800, textTransform : 'capitalize'}} >
                            {feedback.comment}
                          </Typography>
                          <Typography>
                            -{feedback.name}
                          </Typography>
                          <Typography variant= 'subtitle' >
                             -- {feedback.email}
                          </Typography>
                        </Box>
                      )
                    })
                  }
                </Box>
                <div style = {{ display :'flex', justifyContent : 'flex-end', alignItems : 'center'}}>
                  <Button variant = 'contained'
                    onClick = {() => navigate(-1)}>
                    Go Back 
                  </Button>
                  </div>
            </Container>
  )
}
