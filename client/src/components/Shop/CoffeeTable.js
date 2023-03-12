import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';


const CoffeeTable = (props) => {
    const details = props.coffeeDetails;

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
                    {details.tastingNotes}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Body (1-5)
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.body}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Brightness (1-5)
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.brightness}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Farm
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.farm}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Variety
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.variety}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Altitude
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.altitude}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Process
                </TableCell>
                <TableCell component="th" scope="row">
                    {details.process}
                </TableCell>
            </TableRow>
        </TableBody>
        </Table>
    </TableContainer>
    </>
    )
}

export default CoffeeTable