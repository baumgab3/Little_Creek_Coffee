import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const CoffeeTable = (props) => {
    
    const productDetails = props.productDetails;

    return (
        <TableContainer>
        <Table aria-label="coffee detials table">
        <TableBody>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}} component="th" scope="row">
                    Tasting Notes
                </TableCell>
                <TableCell component="th" scope="row">
                    test
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Body (1-5)
                </TableCell>
                <TableCell component="th" scope="row">
                    test
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Brightness (1-5)
                </TableCell>
                <TableCell component="th" scope="row">
                    test
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Farm
                </TableCell>
                <TableCell component="th" scope="row">
                    test
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Variety
                </TableCell>
                <TableCell component="th" scope="row">
                    test
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Altitude
                </TableCell>
                <TableCell component="th" scope="row">
                    test
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{fontWeight: "bold"}}  component="th" scope="row">
                    Process
                </TableCell>
                <TableCell component="th" scope="row">
                    test
                </TableCell>
            </TableRow>
        </TableBody>
        </Table>
    </TableContainer>
    )
}

export default CoffeeTable