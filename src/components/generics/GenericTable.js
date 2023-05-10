import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import {v4 as uuidv4} from 'uuid';
import {Grid} from "@material-ui/core";

const paginationStyle = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const genericTableStyle = makeStyles({
    table: {
        minWidth: 500,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});


function GenericTableSortedHeaders(props) {
    const {headCells, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow key={uuidv4()}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            headCell.sortable ?
                                //if it is sortable we should put a sortable label
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                                :
                                //if it is not we should just put a label
                                headCell.label
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

GenericTableSortedHeaders.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
};

function TablePaginationActions(props) {
    const classes = paginationStyle();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function GenericTable(props) {
    const {filters, buttons, headers, rows, rowProvider, rowsPerPage, onChangePage, onChangeRowsPerPage, onChangeSort, page, count, order, orderBy} = props;
    const classes = genericTableStyle();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);


    return (

        <TableContainer component={Paper}>

            <Grid container>
                <Grid item xs={9}>
                    {filters}
                </Grid>
                <Grid item xs={3}>
                    {buttons}
                </Grid>
            </Grid>
            <Table className={classes.table} aria-label="custom pagination table">

                <GenericTableSortedHeaders
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={onChangeSort}
                    rowCount={rows.length}
                    headCells={headers}
                />

                <TableBody>
                    {rows.map(row => rowProvider(row, uuidv4()))}
                    {emptyRows > 0 && (
                        <TableRow key={uuidv4()} style={{height: 62 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow key={uuidv4()}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            colSpan={4}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}

                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
