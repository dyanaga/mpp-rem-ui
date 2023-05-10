import React, {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import * as PropTypes from "prop-types";
import {v4 as uuid} from 'uuid';
import {performRequest} from "../../../../api/rest-call";
import {makeStyles} from "@material-ui/core/styles";

const fieldStyle = makeStyles((theme) => ({
    field: {
        marginTop: theme.spacing(0.3),
    }
}));

function GenericRemoteSelectField(props) {
    const fieldClasses = fieldStyle();

    const {id, label, required, initialValue, mode, isDisabled, source, valueField, displayField} = props;
    const {onChange, getList, onEmptinessChange} = props;
    const uniqueId = uuid();
    const disabled = (isDisabled == null ? false : isDisabled(mode)) || mode === "view";

    const [selectedValue, setSelectedValue] = React.useState('');
    const [values, setValues] = React.useState([]);


    function getValues() {
        let request = new Request(`${source}`, {
            method: 'GET',
        });
        performRequest(request, handleSuccess, handleError)
    }

    const handleSelectValueChange = (event) => {
        const value = event.target.value;
        if (required && selectedValue === '' && value !== '') {
            onEmptinessChange(id, false);
        }
        setSelectedValue(value);
        if (onChange != null) {
            if (value === '') {
                onChange(id, null);
            } else {
                onChange(id, value);
            }
        }
    };

    const handleError = (error, status) => {
        alert(`Error while populating 'select' with id ${id}!`);
        console.log(status)
        console.log(error)
    }

    const handleSuccess = (json, status) => {
        if (status === 200) {
            const converted = getList(json)
                .map(row => {
                    return {"value": row[valueField], "label": row[displayField]}
                });
            setValues(converted);
        } else {
            handleError(json, status);
        }
    }

    useEffect(() => {
        let stateInitialValue;
        if (required) {
            if (initialValue == null) {
                if(values.length > 0) {
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
        if (onChange != null) {
            if (stateInitialValue === '') {
                onChange(id, null);
            } else {
                onChange(id, stateInitialValue);
            }
        }
        setSelectedValue(stateInitialValue);
        // eslint-disable-next-line
    }, [values]);

    useEffect(() => {
            if (required) {
                onEmptinessChange(id, true);
            }
            getValues();
        },
        // eslint-disable-next-line
        [])

    return (
        <FormControl fullWidth={true} className={fieldClasses.field}>
            <InputLabel id={`${id}-${uniqueId}-label`}>{label}</InputLabel>
            <Select
                margin={"none"}
                required={required}
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

const GenericRemoteSelectFieldPropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired,
    displayField: PropTypes.string.isRequired,
    required: PropTypes.bool,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    onChange: PropTypes.func.isRequired,
    onEmptinessChange: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    isDisabled: PropTypes.func,
};
GenericRemoteSelectField.propTypes = GenericRemoteSelectFieldPropTypes;

export {GenericRemoteSelectField, GenericRemoteSelectFieldPropTypes}