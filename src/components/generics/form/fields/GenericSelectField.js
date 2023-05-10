import React, {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import * as PropTypes from "prop-types";
import {v4 as uuid} from 'uuid';
import {makeStyles} from "@material-ui/core/styles";

const fieldStyle = makeStyles((theme) => ({
    field: {
        marginTop: theme.spacing(1),
    }
}));

function GenericSelectField(props) {
    const fieldClasses = fieldStyle();

    const {id, label, required, initialValue, mode, values, isDisabled} = props;
    const {onChange, onEmptinessChange} = props;
    const uniqueId = uuid();
    const disabled = (isDisabled == null ? false : isDisabled(mode)) || mode === "view";

    let stateInitialValue;
    if (required) {
        if (initialValue == null) {
            if (values != null) {
                stateInitialValue = values[0].value;
            } else {
                stateInitialValue = '';
            }
        } else {
            stateInitialValue = initialValue;
        }
    } else {
        stateInitialValue = '';
    }
    const [selectedValue, setSelectedValue] = React.useState(stateInitialValue);

    const handleSelectValueChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        if (onChange != null) {
            if (value === '') {
                onChange(id, null);
            } else {
                onChange(id, value);
            }
        }
    };

    useEffect(() => {
        if (onChange != null) {
            if (stateInitialValue === '') {
                onChange(id, null);
                if(required && onEmptinessChange != null) {
                    onEmptinessChange(id, true);
                }
            } else {
                onChange(id, stateInitialValue);
            }
        }
        // eslint-disable-next-line
    }, []);

    return (
        <FormControl fullWidth={true} className={fieldClasses.field}>
            <InputLabel id={`${id}-${uniqueId}-label`}>{label}</InputLabel>
            <Select
                margin={"dense"}
                labelId={`${id}-${uniqueId}-label`}
                id={id}
                value={selectedValue}
                onChange={handleSelectValueChange}
                disabled={disabled || mode === 'view'}
            >
                {!required && <MenuItem value={''}>None</MenuItem>}
                {
                    values.map(row => {
                        return (
                            <MenuItem key={`${row.value}-${uniqueId}`} value={row.value}>{row.label}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

const GenericSelectFieldPropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    values: PropTypes.array,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    onChange: PropTypes.func.isRequired,
    onEmptinessChange: PropTypes.func,
    isDisabled: PropTypes.func,
};
GenericSelectField.propTypes = GenericSelectFieldPropTypes;

export {GenericSelectField, GenericSelectFieldPropTypes}