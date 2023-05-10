import React from "react";
import {GenericTextField, GenericTextFieldPropTypes} from "./GenericTextField";
import * as PropTypes from "prop-types";
import {FormLabel} from "@material-ui/core";

function GenericPasswordField(props) {
    const {id, label, onChange, onValidityChange} = props;
    const confirmId = id + "Confirm";
    const confirmLabel = label + " confirm";
    const equalId = id + "Equal";
    const initialValue = props.initialValue == null ? '' : props.initialValue

    const [value, setValue] = React.useState(initialValue);
    const [confirmValue, setConfirmValue] = React.useState(initialValue);
    const [passwordsEqual, setPasswordsEqual] = React.useState(true);

    const propagateValidity = onValidityChange != null;
    const propagateChange = onChange != null;

    function handleEqualityChange(newEquality) {
        if (passwordsEqual !== newEquality) {
            setPasswordsEqual(newEquality);
            if (propagateValidity) {
                onValidityChange(equalId, newEquality);
            }
        }
    }

    const handleContentChange = (fieldId, newValue) => {
        let equalNewValue = passwordsEqual;
        if (fieldId === id) {
            setValue(newValue)
            equalNewValue = newValue === confirmValue;
        }
        if (fieldId === confirmId) {
            setConfirmValue(newValue);
            equalNewValue = newValue === value;
        }
        handleEqualityChange(equalNewValue);
        if (propagateChange) {
            onChange(fieldId, newValue);
        }
    }

    const mainProps = {...props, type: "password", onChange: handleContentChange};
    const confirmProps = {...props, id: confirmId, label: confirmLabel, type: "password", onChange: handleContentChange};

    return (
        <>
            <GenericTextField
                {...mainProps}
            />

            <GenericTextField
                {...confirmProps}
            />
            {
                !passwordsEqual &&
                <FormLabel error> Passwords not the same! </FormLabel>
            }
        </>
    )
}

GenericPasswordField.propTypes = {
    multiline: undefined,
    ...GenericTextFieldPropTypes,
    type: PropTypes.string,
};

export {GenericPasswordField}