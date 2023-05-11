import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect} from "react";
import {performRequest} from "../../../api/rest-call";
import FormControl from "@material-ui/core/FormControl";
import {GenericFieldContainer} from "../../../components/generics/form/containers/GenericFieldContainer";
import {Grid, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import {ENDPOINTS} from "../../../api/constants";
import Typography from "@material-ui/core/Typography";
import {userFormFields} from "./user-form-fields";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {Redirect} from "react-router-dom";
import {COOKIES} from "../../../constants";
import Cookies from "universal-cookie";

const modalStyle = makeStyles((theme) => ({
    center: {
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        width: '60%', // Fix IE 11 issue.
        marginLeft: '20%', // Fix IE 11 issue.
    },
    title: {
        marginTop: theme.spacing(5),
    }
}));

const cookies = new Cookies();

function UserPage(props) {
    const modalClasses = modalStyle();

    const {mode, userId} = props;
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Server error!");
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("Success!");
    const [content, setContent] = React.useState(null);
    const [initialValue, setInitialValue] = React.useState(null);
    const [emptyFields, setEmptyFields] = React.useState([]);
    const [invalidFields, setInvalidFields] = React.useState([]);

    const handleContentChange = (id, value) => {
        setContent({...value});
    };

    function getItem() {
        let request = new Request(`${ENDPOINTS.USERS}/${userId}`, {
            method: 'GET',
        });
        performRequest(request, handleSuccessLoad, handleError)
    }

    const handleSuccessLoad = (json, status) => {
        if (status === 200) {
            setInitialValue(json);
            setContent(json);
        } else {
            handleError(json, status);
        }
    }

    const handleSuccess = (json, status) => {
        if (status === 200) {
            setInitialValue(json);
            cookies.set(COOKIES.PAGE_SIZE, json.pagePreference);
            setContent(json);
            setSuccessMessage("Successfully updated profile.")
            setIsSuccess(true);
        } else {
            handleError(json, status);
        }
    }


    const handleError = (error, status) => {
        setErrorMessage(error["message"]);
        setHasError(true);
        console.log(status)
        console.log(error)
    }

    const handleValidityChange = (fieldId, value) => {
        if (value === true && invalidFields.includes(fieldId)) {
            setInvalidFields(invalidFields.filter(id => fieldId !== id))
        }
        if (value === false && !invalidFields.includes(fieldId)) {
            setInvalidFields([...invalidFields, fieldId])
        }
    };

    const handleEmptinessChange = (fieldId, value) => {
        if (value === false && emptyFields.includes(fieldId)) {
            setEmptyFields(emptyFields.filter(id => fieldId !== id))
        }
        if (value === true && !emptyFields.includes(fieldId)) {
            setEmptyFields([...emptyFields, fieldId])
        }
    };

    const handleCreate = () => {
        console.log(content);
        let request = new Request(`${ENDPOINTS.USERS}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({...content})
        });
        performRequest(request, handleSuccess, handleError)
    }


    const crudName = "user";

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getItem(), []);

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

    return (
        <Paper>
                <FormControl className={modalClasses.center} noValidate fullWidth>
                    <Typography component="h1" variant="h5" className={modalClasses.title}>
                        User profile
                    </Typography>
                    {
                        initialValue != null &&
                        <GenericFieldContainer id={crudName}
                                               initialValue={initialValue}
                                               mode={mode}
                                               fields={userFormFields}
                                               onChange={handleContentChange}
                                               onEmptinessChange={handleEmptinessChange}
                                               onValidityChange={handleValidityChange}
                        />

                    }
                    {/*<RiseLoader color={'#3f51b5'} loading={true} size={75}/>*/}


                    {
                        (mode === "update" || mode === "create") && (
                                <Grid item container xs={6} justifyContent={"center"}>
                                    <Button
                                            className={modalClasses.title}
                                        onClick={handleCreate} color="primary">
                                        Save
                                    </Button>
                                </Grid>
                        )
                    }
                </FormControl>
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
    )
}

const UserPagePropTypes = {
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    userId: PropTypes.string,
};
UserPage.propTypes = UserPagePropTypes;

export {UserPage, UserPagePropTypes}