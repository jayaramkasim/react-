import React, { useEffect, useState } from "react";
import readXlsxFile from 'read-excel-file';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function File() {
    const [state, setState] = useState('')
    const [excelData, setexcelData] = useState('')
    const [excelHeaders, setexcelHeaders] = useState('')
    useEffect(() => {
        const input = document.getElementById('input')
        input.addEventListener('change', () => {
            readXlsxFile(input.files[0]).then((rows) => {
                console.log('File==>', rows);
                setexcelHeaders([...rows[0]])
                rows.splice(0, 1)
                setexcelData(rows);
            })
        })
    }, [state]);
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);

    return (
        <div className="">
            <h1>File component</h1>
            <input onChange={(e) => setState(e.target.files)} type="file" id="input" />
           {excelHeaders&& <TableContainer component={Paper}>
                <Table className={''} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {excelHeaders?.map(x => <StyledTableCell align="right">{x}</StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {excelData?.map((x, i) => <StyledTableRow key={i}>
                            {x?.map(y => <StyledTableCell align="right">{y}</StyledTableCell>)}
                            {console.log(x)}
                        </StyledTableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    );
}

export default File;
