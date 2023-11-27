
import React from 'react'
import {TableContainer , TableRow, TableCell, Table, Paper } from '@mui/material';
import {useUser} from '../../context/user-context';

import classes from './styles.module.css';

export default function AllStudents() {
    const {students , borrowBooks} = useUser();
    
   
    function calculateBooks(id) {
        const userBorrowedBooks = borrowBooks.map((book) => book.borrowedBy);
        const res = userBorrowedBooks.map(arr => arr.filter(studentId => studentId === id))           
        let sum =0;
        for(let i =0;i < res.length;i++) {
            sum += res[i].length;
        }
        return sum;
    }
  return (
    <TableContainer component = {Paper} sx= {{mt : 4 , mx : 'auto' , width : '70%'}}>
        <Table stickyHeader>
            <TableRow >
                <TableCell className = {classes.tableTitle}>Name</TableCell>
                <TableCell className = {classes.tableTitle}>Username</TableCell>
                <TableCell className = {classes.tableTitle}>No. of books issued</TableCell>
            </TableRow>
            
            {
                students.filter(student => student.role !== 'admin').map((student) =>  {
                    return (
                    <TableRow >
                    <TableCell className = {classes.tableCell}>{student.name}</TableCell>
                    <TableCell className = {classes.tableCell}>{student.username}</TableCell>
                    <TableCell className = {classes.tableCell}>{calculateBooks(student._id)}</TableCell>
                </TableRow>
                )
            })
            }
        </Table>
    </TableContainer>
  )
}
