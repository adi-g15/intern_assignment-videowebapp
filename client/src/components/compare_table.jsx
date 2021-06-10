import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core";

// styling taken from @material-ui example :D
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
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function CompareTable({stock_a, stock_b}) {
    const classes = useStyles();
    const keys = Object.keys(stock_a);  // INVARIANT: stock_a and stock_b have same keys (verified by proptypes)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Points</StyledTableCell>
    <StyledTableCell align="right">{stock_a.symbol}</StyledTableCell>
                        <StyledTableCell align="right">{stock_b.symbol}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        keys.map(key => (
                        <StyledTableRow key={key}>
                            <StyledTableCell component="th" scope="row">
                                {key}
                            </StyledTableCell>
                            <StyledTableCell align="right">{stock_a[key]}</StyledTableCell>
                            <StyledTableCell align="right">{stock_b[key]}</StyledTableCell>
                        </StyledTableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

CompareTable.propTypes = {
    stock_a: PropTypes.shape({
        symbol: PropTypes.string.required,
        open: PropTypes.number.required,
        high: PropTypes.number.required,
        low: PropTypes.number.required,
        price: PropTypes.number.required,
        volume: PropTypes.number.required,
        ltd: PropTypes.string.required,
        previous_close: PropTypes.number.required,
        change: PropTypes.number.required,
        change_percent: PropTypes.string.required
    }),
    stock_b: PropTypes.shape({
        symbol: PropTypes.string.required,
        open: PropTypes.number.required,
        high: PropTypes.number.required,
        low: PropTypes.number.required,
        price: PropTypes.number.required,
        volume: PropTypes.number.required,
        ltd: PropTypes.string.required,
        previous_close: PropTypes.number.required,
        change: PropTypes.number.required,
        change_percent: PropTypes.string.required
    })
};

export default CompareTable;
