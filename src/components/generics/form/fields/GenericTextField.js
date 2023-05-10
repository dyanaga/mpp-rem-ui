import TextField from "@material-ui/core/TextField";
import * as PropTypes from "prop-types";
import React, {useEffect} from "react";
import {v4 as uuid} from 'uuid';


function GenericTextField(props) {

    const {isValid, onValidityChange, onEmptinessChange, onChange, isDisabled} = props;
    const {id, label, type, required = false, errorMessage, mode = "view", multiline} = props;
    const initialValue = props.initialValue == null ? '' : props.initialValue
    const propagateValidity = onValidityChange != null;
    const propagateEmptiness = onEmptinessChange != null;
    const propagateChange = onChange != null;
    const validate = isValid != null;
    const disabled = (isDisabled == null ? false : isDisabled(mode)) || mode === "view";
    const uniqueId = `${id}-${uuid()}`
    const [value, setValue] = React.useState(initialValue);
    const [valid, setValid] = React.useState(true);
    const [empty, setEmpty] = React.useState(false);

    function setNewValid(newValid) {
        setValid(newValid);
        if (propagateValidity) {
            onValidityChange(id, newValid);
        }
    }

    function setNewEmptiness(newEmptiness) {
        setEmpty(newEmptiness);
        if (propagateEmptiness) {
            onEmptinessChange(id, newEmptiness);
        }
    }

    function validateTextField(value) {
        const newValidationResult = isValid(value);
        if (!newValidationResult && valid) {
            setNewValid(false);
            return false;
        }
        if (newValidationResult && !valid) {
            setNewValid(true);
            return true;
        }
        return valid;
    }

    function emptinessChange(value) {
        if (empty && value.length !== 0) {
            setNewEmptiness(false);
            return false;
        }
        if (!empty && value.length === 0) {
            setNewEmptiness(true);
            return true;
        }
        return empty;
    }

    const handleValueChange = (event) => {
        const newValue = type === "number" ? parseFloat(event.target.value) : event.target.value;
        let propagateNewChange = true;
        if (validate) {
            propagateNewChange = validateTextField(newValue);
        }
        if (required) {
            const isEmpty = emptinessChange(newValue);
            propagateNewChange = propagateNewChange && !isEmpty;
        }
        setValue(newValue);
        if (propagateNewChange && propagateChange) {
            onChange(id, newValue === '' ? null : newValue);
        }
    };

    useEffect(() => {
        if (validate && mode !== "create") {
            validateTextField(initialValue)
        }
        if (required) {
            emptinessChange(initialValue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <TextField
        margin="dense"
        id={uniqueId}
        label={label}
        type={type}
        disabled={disabled || mode === "view"}
        required={required}
        value={value}
        error={!valid}
        helperText={!valid ? errorMessage : ""}
        onChange={handleValueChange}
        multiline={multiline}
        fullWidth
    />;
}

const GenericTextFieldPropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password']).isRequired,
    required: PropTypes.bool,
    errorMessage: PropTypes.string,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    multiline: PropTypes.bool,

    isDisabled: PropTypes.func,
    isValid: PropTypes.func,
    onValidityChange: PropTypes.func,
    onEmptinessChange: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};
GenericTextField.propTypes = GenericTextFieldPropTypes;

export {GenericTextField, GenericTextFieldPropTypes}