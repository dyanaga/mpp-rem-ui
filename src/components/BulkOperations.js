import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ReactComponent as Ufo} from "../Ufo.svg"
import {Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {cleanup, batch, millions, pagePreference} from "../api/bulk";
import TextField from "@material-ui/core/TextField";

const styles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: localStorage.getItem("theme") === "dark" ? "burlywood" : "white",
    },
    space: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    button: {
        margin: theme.spacing(4),
        maxWidth: 600,
    },
    input: {
        marginTop: theme.spacing(4),
        maxWidth: 600,
    },
    inputButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
        maxWidth: 600,
    },

}));

export default function BulkOperations() {
    const classes = styles();

    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Server error!");
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("Success!");
    const [pagePreferenceValue, setPagePreferenceValue] = React.useState(20);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setHasError(false);
    };

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSuccess(false);
    };

    function cleanupSuccess(status) {
        setSuccessMessage("Data cleaned up successfully");
        setIsSuccess(true);
    }
    function cleanupFailure(json, status) {
        setErrorMessage("Failed to clean up.");
        setHasError(true);
    }

    const handleCleanup = () => {
        cleanup(cleanupSuccess, cleanupFailure)
    }


    function batchSuccess(status) {
        setSuccessMessage("Created 10k batch");
        setIsSuccess(true);
    }
    function batchFailure(json, status) {
        setErrorMessage("Failed to create 10k batch");
        setHasError(true);
    }

    const handleBatch = () => {
        batch(batchSuccess, batchFailure)
    }

    function millionsSuccess(status) {
        setSuccessMessage("Started to add millions of entries.");
        setIsSuccess(true);
    }
    function millionsFailure(status) {
        setErrorMessage("Failed to create millions.");
        setHasError(true);
    }

    const handleMillions = () => {
        millions(millionsSuccess, millionsFailure)
    }

    function preferenceSuccess(status) {
        setSuccessMessage("Preference updated for all users");
        setIsSuccess(true);
    }
    function preferenceFailure(json, status) {
        setErrorMessage("Failed to update preference");
        setHasError(true);
    }

    const handlePreference = () => {
        pagePreference(pagePreferenceValue, preferenceSuccess, preferenceFailure)
    }

    const handlePagePreferenceChange = (event) => {
        const value = event.target.value;
        if (value >= 1 && value <= 100) {
            setPagePreferenceValue(value);
        }
    };


    return (
        <Paper className={classes.paper}>
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    id={"batchButton"}
                    className={classes.button}
                    onClick={handleBatch}
            >
                Generate 10k
            </Button>

            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    id={"millionButton"}
                    className={classes.button}
                    onClick={handleMillions}
            >
                Generate 1 Million (Async)
            </Button>

            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    id={"cleanupButton"}
                    className={classes.button}
                    onClick={handleCleanup}
            >
                Cleanup
            </Button>

            <TextField
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
                    label="Page Preference"
                    value={pagePreferenceValue}
                    className={classes.input}
                    fullWidth
                    onChange={handlePagePreferenceChange}
            />
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    id={"preferenceButton"}
                    className={classes.inputButton}
                    onClick={handlePreference}
            >
                Set page preference
            </Button>


            {/*Error message*/}
            <Snackbar open={hasError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            {/*Success message*/}
            <Snackbar open={isSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>

        </Paper>
    );
}
