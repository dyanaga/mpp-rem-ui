import {Checkbox, FormControlLabel} from "@material-ui/core";
import * as PropTypes from "prop-types";
import React from "react";
import {v4 as uuid} from 'uuid';

function GenericCheckboxField(props) {
    const {onChange} = props;
    const {id, label, initialValue = false, mode = "view", isDisabled} = props;
    const propagateChange = onChange != null;
    const disabled = (isDisabled == null ? false : isDisabled(mode)) || mode === "view";

    const [value, setValue] = React.useState(initialValue);
    const uniqueId = `${id}-${uuid()}`


    const handleValueChange = (event) => {
        const newValue = event.target.checked;
        setValue(newValue);
        if (propagateChange) {
            onChange(id, newValue);
        }
    };

    return <FormControlLabel
        id={uniqueId}
        control={
            <Checkbox
                checked={value}
                onChange={handleValueChange}
                name={label}
                disabled={disabled || mode === "view"}/>
        }
        label={label}
    />;
}

const GenericCheckboxFieldPropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.bool,
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    onChange: PropTypes.func.isRequired,
    isDisabled: PropTypes.func,
};

GenericCheckboxField.propTypes = GenericCheckboxFieldPropTypes;

export {GenericCheckboxField, GenericCheckboxFieldPropTypes}