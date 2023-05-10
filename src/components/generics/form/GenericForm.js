import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import {GenericFieldContainer, GenericFieldContainerFieldsPropTypes} from "./containers/GenericFieldContainer";
import * as PropTypes from "prop-types";
import {performRequest} from "../../../api/rest-call";

const modalStyle = makeStyles((theme) => ({
    center: {
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        width: '100%', // Fix IE 11 issue.
    }
}));

function GenericForm(props) {
    const modalClasses = modalStyle();

    const {mode, crudName, endpoint, itemId, fields} = props;
    const [content, setContent] = React.useState(null);
    const [initialValue, setInitialValue] = React.useState(null);
    const [emptyFields, setEmptyFields] = React.useState([]);
    const [invalidFields, setInvalidFields] = React.useState([]);

    const handleContentChange = (id, value) => {
        setContent({...value});
    };

    function getItem() {
        let request = new Request(`${endpoint}/${itemId}`, {
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
        alert(`Error while populating ${crudName} with id ${itemId}!`);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getItem(), []);

    return (
            <FormControl className={modalClasses.form} noValidate>
                {
                    mode === 'create' ? `Create ${crudName}` :
                        mode === "update" ? `Edit ${crudName}` :
                            mode === 'view' ? `View ${crudName}` :
                                "Unknown operation"
                }

                {
                    mode === 'create' ? `Complete all the required fields in order to create a ${crudName}.` :
                        mode === "update" ? `Modify any field then press save in order to edit the ${crudName}.` :
                            mode === 'view' ? `You are viewing the ${crudName}. Cannot be modified from here.` :
                                "Unknown operation, please contact your administrator."
                }

                {

                    initialValue != null &&
                    <GenericFieldContainer id={crudName}
                                           initialValue={initialValue}
                                           mode={mode}
                                           fields={fields}
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
    );
}

const GenericFormPropTypes = {
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    crudName: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    itemId: PropTypes.string,
    fields: GenericFieldContainerFieldsPropTypes,
};
GenericForm.propTypes = GenericFormPropTypes;

export {GenericForm, GenericFormPropTypes}