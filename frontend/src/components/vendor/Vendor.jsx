
import React , {useState} from 'react'
import { publishersAndBooks } from '../../publisherAndBook';
import {FormControl , InputLabel , Select , MenuItem , Button , Paper , Container , Typography , FormGroup , TextField} from '@mui/material';
import classes  from './styles.module.css';
import {useNavigate} from 'react-router-dom';
import { BackendApi } from '../../client/backend-api';
import { NotificationManager } from 'react-notifications';

export default function Vendor() {
    const [publisherName , setPublisherName] = useState("");
    const [quantity , setQuantity] = useState(0);
    const [titleAndCategory, setTitleAndCategory] = useState('');
    const navigate = useNavigate();
    function handleChange(e) {
        setPublisherName(e.target.value);
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault();
       if(publisherName && quantity > 0 ) {
           const {user, error } = BackendApi.book.purchaseBooks(publisherName, quantity, titleAndCategory);
           if(error) {
            NotificationManager.error(error);
           }else {  
               NotificationManager.success('Placed Order to vendor');
               navigate('/');
           }
       }    
    }

  return (
    <>
         <Container component={Paper} sx = {{my: 10 , p: 4}}>
                <Typography  variant="h5" sx = {{my: 2}}>
                    Vendor's Book Purchase
                </Typography>
                <form noValidate autoComplete="off" >
                    <FormGroup>
                        <FormControl className = {classes.mb2}>
                            <InputLabel>Category of Book Publisher </InputLabel>
                            <Select name=""  required onChange = {handleChange} >
                                {
                                    publishersAndBooks.map((publisher) => (
                                        <MenuItem value={publisher?.publisher}>{publisher.publisher}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                       
                        <FormControl className = {classes.mb2}>
                            <InputLabel>Name of Book </InputLabel>
                            <Select name=""  required onChange ={(e) => setTitleAndCategory(e.target.value)}>
                                {publisherName ?
                                    publishersAndBooks.find(publish => publish.publisher === publisherName)
                                    .books.map(book => (
                                        <MenuItem sx = {{display : 'flex' , justifyContent : 'space-between'}} value={book?.title}>{book.title}  <span style = {{ textTransform : 'uppercase', color : 'grey'}}>{book.category}</span></MenuItem>
                                    ))
                                    :
                                    <MenuItem value= 'select publisher'>Select Publisher</MenuItem>
                                }
                            </Select>
                        </FormControl>
                        
                        <FormControl className = {classes.mb2} onChange = {e => setQuantity(e.target.value)}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                
                            />
                        </FormControl>
                    </FormGroup>
                    <div className= {classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick = {() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" onClick = {handlePlaceOrder}>
                           Place Order
                        </Button>
                    </div>
                </form>
            </Container>
    </>
  )
}
