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

function UserPage(props) {
    const modalClasses = modalStyle();

    const {mode, userId} = props;
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
        performRequest(request, handleSuccess, handleError)
    }

    const handleSuccess = (json, status) => {
        if (status === 200) {
            setInitialValue(json);
            setContent(json);
        } else {
            handleError(json, status);
        }
    }

    const handleError = (error, status) => {
        alert(`Error while populating users with id ${userId}!`);
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

    }

    const handleCancel = () => {

    }

    const crudName = "user";

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getItem(), []);

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
                            <Grid container className={modalClasses.buttons}>
                                <Grid item container xs={6} justify={"center"}>
                                    <Button onClick={handleCreate} color="secondary">
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item container xs={6} justify={"center"}>
                                    <Button
                                        onClick={handleCancel} color="primary">
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                    }
                </FormControl>
        </Paper>
    )
}

const UserPagePropTypes = {
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    userId: PropTypes.string,
};
UserPage.propTypes = UserPagePropTypes;

export {UserPage, UserPagePropTypes}