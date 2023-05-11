import * as React from 'react';
import {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';

import {Snackbar, TableCell} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {listingsByOffers, listingsPerNeighbourhood} from "../../api/statistics";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {MyPieChart} from "../../components/MyPieChart";
import {dateToDayMonthYearString, getYears} from "../../utils/DateUtils";
import {makeStyles} from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex', flexWrap: 'wrap', marginLeft: theme.spacing(6), marginTop: theme.spacing(3), marginBottom: theme.spacing(3),
    }, select: {
        marginLeft: theme.spacing(1), marginRight: theme.spacing(1), minWidth: 200,
    }, textField: {
        marginLeft: theme.spacing(1), marginRight: theme.spacing(1),
    }, loadButton: {
        marginLeft: theme.spacing(2),
    },
}));

const untilDate = new Date();
untilDate.setDate(untilDate.getDate() + 1);
const fromDate = new Date();
fromDate.setMonth(fromDate.getMonth() - 1);

const lastYearDate = new Date();
lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);


function Statistics() {
    const classes = useStyles();
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Server error!");


    const [listingsByOffersResult, setListingsByOffersResult] = React.useState([]);
    const [listingsPerNeighbourhoodResult, setListingsPerNeighbourhoodResult] = React.useState([]);

    const handleLoadStatistics = (event) => {
        refreshStatistics();
    }

    const refreshStatistics = (from, until) => {
        listingsByOffers(handleListingsByOffers, handleError);
        listingsPerNeighbourhood(handleListingsPerNeighbourhood, handleError);
    }

    const handleCloseError = () => {
        setIsError(false);
    }

    const handleListingsByOffers = (body, status) => {
        setListingsByOffersResult(body);
    }

    const handleListingsPerNeighbourhood = (body, status) => {
        setListingsPerNeighbourhoodResult(body);
    }


    const handleError = (error, status) => {
        setIsError(true);
        setErrorMessage(error);
        console.log(error);
    }


    useEffect(() => {
        refreshStatistics();
    }, [])

    let fields = [{value: "count", name: "Count", key: "countBarField"}, {value: "address", name: "Address", key: "valueBarField"}];
    return <Paper>
        <Box m={1} fontSize="h5.fontSize">
            Statistics

            <Box mt={4} pt={1} pl={4} pb={2} border={1} borderRadius={15}>
                <Typography component="div" align="center">
                    <Box m={1} fontSize="h5.fontSize">
                        Listings per neighbourhood
                    </Box>
                </Typography>
                <MyPieChart id="listingsPerNeighbourhoodPie" title="" content={listingsPerNeighbourhoodResult.map((stat) => {
                    return {name: stat.neighbourhood, value: stat.count}
                })}/>
            </Box>

            <Box mt={4} pt={1} pl={4} pb={2} border={1} borderRadius={15}>

                <Typography component="div" align="center">
                    <Box m={1} fontSize="h5.fontSize">
                        Listings by number of offers, desc
                    </Box>
                </Typography>

                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Listing Name</TableCell>
                            {fields.map(field => {
                                return (<TableCell key={field.key}>
                                            {field.name}
                                        </TableCell>)
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listingsByOffersResult.map((row, index) => {
                            return (<TableRow key={row.name + index}>

                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        {fields.map((field, index2) => {
                                            return (<TableCell key={field.key}>
                                                        {row[field.value]}
                                                    </TableCell>)
                                        })}
                                    </TableRow>)
                        })}
                    </TableBody>
                </Table>


            </Box>

        </Box>


        <Snackbar open={isError} autoHideDuration={10000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    </Paper>
}

export {
    Statistics
}