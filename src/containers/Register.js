import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import {Grid, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {GenericFieldContainer} from "../components/generics/form/containers/GenericFieldContainer";
import {userRegisterFields} from "./user-register-fields";
import {Redirect} from "react-router-dom";
import {register, confirmRegister} from '../api/register'


const modalStyle = makeStyles((theme) => ({
    center: {
        flexDirection: 'column', alignItems: 'center', display: 'flex', width: '60%', // Fix IE 11 issue.
        marginLeft: '20%', // Fix IE 11 issue.
    }, title: {
        marginTop: theme.spacing(5),
    }
}));

function Register(props) {
    const modalClasses = modalStyle();

    const [back, setBack] = React.useState(false);
    const [userId, setUserId] = React.useState(null);
    const [content, setContent] = React.useState(null);
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [initialValue, setInitialValue] = React.useState({
        "userId": null, "name": null, "email": null, "phoneNumber": null, "type": "CLIENT"
    });
    const [emptyFields, setEmptyFields] = React.useState([]);
    const [invalidFields, setInvalidFields] = React.useState([]);

    const handleContentChange = (id, value) => {
        setContent({...value});
    };

    const handleSuccess = (json, status) => {
        if (status === 200) {
            setUserId(json["userId"]);
            setIsRegistered(true);
        }
        else {
            handleError(json, status);
        }
    }

    const handleSuccessConfirm = (json, status) => {
        if (status === 200) {
            setBack(true);
        }
        else {
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

    const handleBack = () => {
        setBack(true);
    }

    const handleRegister = () => {
        register(content, handleSuccess, handleError)
    }

    const confirmRegistration = () => {
        confirmRegister(userId, handleSuccessConfirm, handleError)
    }


    const crudName = "user";
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => getItem(), []);
    if (back) {
        return (<Redirect to={{pathname: '/login'}}/>)
    }
    return (<Paper>
        <FormControl className={modalClasses.center} noValidate fullWidth>
            {isRegistered === false ?
                    <>
                        <Typography component="h1" variant="h5" className={modalClasses.title}>
                            Create an account
                        </Typography>
                        <GenericFieldContainer id={crudName}
                                               initialValue={initialValue}
                                               mode={'create'}
                                               fields={userRegisterFields}
                                               onChange={handleContentChange}
                                               onEmptinessChange={handleEmptinessChange}
                                               onValidityChange={handleValidityChange}
                        />
                        {(<Grid container className={modalClasses.buttons}>
                            <Grid item container xs={6} justify={"center"}>
                                <Button onClick={handleBack} color="secondary">
                                    Back
                                </Button>
                            </Grid>
                            <Grid item container xs={6} justify={"center"}>
                                <Button
                                        onClick={handleRegister} color="primary">
                                    Register
                                </Button>
                            </Grid>
                        </Grid>)}
                    </>
                    : (
                            <>
                                <Typography component="h1" variant="h5" className={modalClasses.title}>
                                    Account created
                                </Typography>
                                <Typography component="h2" variant="h5" className={modalClasses.title}>
                                    Thanks for registering. Next step is activating the account. If the button below doesn't appear, your activation code is {userId}
                                </Typography>
                                <Button className={modalClasses.title} onClick={confirmRegistration}>
                                    Confirm registration
                                </Button>
                            </>
                    )

            }
            {/*<RiseLoader color={'#3f51b5'} loading={true} size={75}/>*/}


        </FormControl>
    </Paper>)
}

export {Register}