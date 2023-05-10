import {makeStyles} from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import * as moment from "moment";
import Button from "@material-ui/core/Button";
import React from "react";
import RemoteSelect from "../RemoteSelect";

const filterStyle = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',

    },
    textField: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
        width: 350,
    },
    label: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
        width: 200,
    },
    submit: {
        margin: theme.spacing(4),
        width: 150,
    },
}));
export default function GenericFilter({filters, onSubmit}) {
    const filterClasses = filterStyle();

    return (
        <form className={filterClasses.container} noValidate onSubmit={onSubmit}>
            <FormLabel id={"filterTitleLabel"} className={filterClasses.label}>Filters</FormLabel>
            {filters.map(filter => {
                if (filter.type === "datetime") {
                    return (
                        <TextField
                            key={filter.key}
                            id={filter.id}
                            label={filter.displayName}
                            type="datetime-local"
                            defaultValue={moment(filter.default).format('YYYY-MM-DD[T]HH:mm')}
                            className={filterClasses.textField}
                            onChange={filter.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    )
                }
                if (filter.type === "remote-select") {
                    return (
                        <RemoteSelect {...filter} classname={filterClasses.textField}/>
                    )
                }
                return (
                    <TextField
                        key={filter.key}
                        id={filter.id}
                        label={filter.displayName}
                        type="text"
                        className={filterClasses.textField}
                        onChange={filter.onChange}
                        defaultValue={filter.default}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )
            })}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                id={"submitButton"}
                className={filterClasses.submit}
            >
                Filter
            </Button>
        </form>);
}
