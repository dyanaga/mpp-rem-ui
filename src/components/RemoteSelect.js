import React, {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {performRequest} from "../api/rest-call";

export default function RemoteSelect(props) {
    const {
        id, displayName, valueField, displayValue, onChange, source, getList,
        canBeEmpty = true,
        classname = null
    } = props;

    const [values, setValues] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleSelectValueChange = (event) => {
        setSelectedValue(event.target.value);
        onChange(event);

    };

    function getValues() {
        let request = new Request(`${source}`, {
            method: 'GET',
        });
        performRequest(request, handleSuccess, handleError)
    }

    const handleSuccess = (json, status) => {
        if (status === 200) {
            const converted = getList(json)
                .map(row => {
                    return {"value": row[valueField], "display": row[displayValue]}
                });
            setValues(converted);
        } else {
            handleError(json, status);
        }
    }

    const handleError = (error, status) => {
        alert(`Error while populating 'select' with id ${id}!`);
        console.log(status)
        console.log(error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getValues(), []);


    return (
        <FormControl className={classname}>
            <InputLabel id={`${id}-select-label`}>{displayName}</InputLabel>
            <Select
                labelId={`${id}-select-label`}
                id={id}
                value={selectedValue}
                onChange={handleSelectValueChange}
            >
                {canBeEmpty && <MenuItem value={''}>None</MenuItem>}
                {
                    values.map(row => {
                        return (
                            <MenuItem key={row.value} value={row.value}>{row.display}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )

}
