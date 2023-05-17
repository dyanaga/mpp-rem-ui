import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {GenericFieldContainer, GenericFieldContainerFieldsPropTypes,} from "./form/containers/GenericFieldContainer";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const modalStyle = makeStyles((theme) => ({
    center: {
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        width: '100%', // Fix IE 11 issue.
    }
}));

function GenericModal(props) {
    const modalClasses = modalStyle();

    const {open, mode, onCancel, onSave, crudName, initialValue, fields} = props;
    const [content, setContent] = React.useState({...initialValue});
    const [emptyFields, setEmptyFields] = React.useState([]);
    const [invalidFields, setInvalidFields] = React.useState([]);

    let invalidFieldsAux = []
    let emptyFieldsAux = []

    const handleContentChange = (id, value) => {
        setContent({...value});
    };
    const handleEmptinessChange = (fieldId, value) => {
        if (value === false && emptyFields.includes(fieldId)) {
            emptyFieldsAux = emptyFieldsAux.filter(id => fieldId !== id)
            setEmptyFields(emptyFieldsAux)
        }
        if (value === true && !emptyFields.includes(fieldId)) {
            emptyFieldsAux = [...emptyFieldsAux, fieldId]
            setEmptyFields(emptyFieldsAux)
        }
    };
    const handleValidityChange = (fieldId, value) => {
        if (value === true && invalidFields.includes(fieldId)) {
            invalidFieldsAux = invalidFieldsAux.filter(id => fieldId !== id)
            setInvalidFields(invalidFieldsAux)
        }
        if (value === false && !invalidFields.includes(fieldId)) {
            invalidFieldsAux = [...invalidFieldsAux, fieldId]
            setInvalidFields(invalidFieldsAux)
        }
    };

    return (
        <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {
                    mode === 'create' ? `Create ${crudName}` :
                        mode === "update" ? `Edit ${crudName}` :
                            mode === 'view' ? `View ${crudName}` :
                                "Unknown operation"
                }
            </DialogTitle>
            <DialogContent className={modalClasses.center}>
                <DialogContentText>
                    {
                        mode === 'create' ? `Complete all the required fields in order to create a ${crudName}.` :
                            mode === "update" ? `Modify any field then press save in order to edit the ${crudName}.` :
                                mode === 'view' ? `You are viewing the ${crudName}. Cannot be modified from here.` :
                                    "Unknown operation, please contact your administrator."
                    }

                </DialogContentText>

                <GenericFieldContainer id={crudName}
                                       initialValue={initialValue}
                                       mode={mode}
                                       fields={fields}
                                       onChange={handleContentChange}
                                       onEmptinessChange={handleEmptinessChange}
                                       onValidityChange={handleValidityChange}
                />

                {/*<GenericForm {...props}*/}
                {/*             buttonsDisabled*/}
                {/*             onCreateDisable={handleCreateDisable}*/}
                {/*             onContentUpdate={handleContentUpdate}/>*/}
            </DialogContent>
            {
                (mode === "update" || mode === "create") &&
                <DialogActions>
                    <Button onClick={onCancel} color="secondary">
                        Cancel
                    </Button>
                    <div style={{flex: '1 0 0'}}/>
                    <Button
                        disabled={emptyFields.length !== 0 || invalidFields.length !== 0}
                        onClick={event =>
                            onSave(content)} color="primary">
                        Save
                    </Button>
                </DialogActions>
            }
        </Dialog>
    );
}

const GenericModalPropTypes = {
    open: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    crudName: PropTypes.string.isRequired,
    initialValue: PropTypes.object,
    fields: GenericFieldContainerFieldsPropTypes,

    onCancel: PropTypes.func,
    onSave: PropTypes.func,
};
GenericModal.propTypes = GenericModalPropTypes;

export {GenericModal, GenericModalPropTypes}