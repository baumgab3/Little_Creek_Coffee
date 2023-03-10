import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {  useParams } from 'react-router-dom';


const CoffeeTable = (props) => {
    const details = props.coffeeDetails;

    // useEffect(() => {
    //     const getCoffeeDetails = (id) => {
    //         console.log("fetching coffee details with id", id);
         
    //         fetch(url)
    //             .then(res => {
    //                 if (res.status >= 400) {
    //                     setIsLoaded(false);
    //                     throw new Error("Server Error!");
    //                 }
    //                 return res.json();
    //             })
    //             .then(details => {
    //                 setDetails(details);
    //                 setIsLoaded(true);

    //             }, err => {
    //                 console.log(err);
    //                 setErr(err);
    //                 setIsLoaded(false);
    //             })
    //     }

    //     getCoffeeDetails(props.productId);
    // }, [url])

    return (
        <>
        <TableContainer>
        <Table aria-label="coffee detials table">
        <TableBody>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}} component="th" scope="row">
                    Tasting Notes
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.TastingNotes}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Body (1-5)
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.Body}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Brightness (1-5)
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.Brightness}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Farm
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.Farm}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Variety
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.Variety}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Altitude
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.Altitude}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Process
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.Process}
                </TableCell>
            </TableRow>
        </TableBody>
        </Table>
    </TableContainer>
    </>
    )
}

export default CoffeeTable