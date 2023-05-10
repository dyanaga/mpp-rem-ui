import * as PropTypes from "prop-types";
import React from "react";
import {GenericFieldContainer} from "../containers/GenericFieldContainer";
import {Box, FormLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";

function GenericListField(props) {
    //TODO implement delete?
    const {id, mode, fields, initialValue, label, rowTemplate, enableAdd, borderColor="black"} = props;
    const {onValidityChange, onEmptinessChange, onChange} = props;

    const [content, setContent] = React.useState([...initialValue]);
    const handleValidityChange = (fieldId, value) => {
        if (onValidityChange != null) {
            onValidityChange(fieldId, value);
        }
    }

    const handleEmptinessChange = (fieldId, value) => {
        if (onEmptinessChange != null) {
            onEmptinessChange(fieldId, value);
        }
    }

    const handleContentChange = (index, value) => {
        const newContent = [...content];
        newContent[index] = {...value};
        setContent(newContent);
        if (onChange != null) {
            onChange(id, newContent);
        }
    }

    const addRow = (event) => {
        setContent([...content, {...rowTemplate}]);
    }

    return (
        <>
            <Box marginTop={3}/>
            <FormLabel color={'secondary'}> {label} </FormLabel>
            {
                content.length > 0 &&
                <Box marginTop={2} borderColor={borderColor} borderBottom={1} borderTop={1} width={"95%"}>
                    {
                        content.map((item, index) =>
                            <Box borderLeft={1} borderColor={borderColor} key={`${id}[${index}]`}>
                                <Box marginLeft={1} marginTop={2} alignItems={"center"} display={"flex"}
                                     flexDirection={"column"}>
                                    <GenericFieldContainer id={`${id}[${index}]`}
                                                           mode={mode}
                                                           fields={fields}
                                                           initialValue={item}
                                                           onValidityChange={handleValidityChange}
                                                           onEmptinessChange={handleEmptinessChange}
                                                           onChange={(fieldId, value) => handleContentChange(index, value)}/>

                                </Box>
                            </Box>
                        )
                    }
                    <Box marginTop={1} borderColor={borderColor}/>
                </Box>
            }
            {
                content.length === 0 &&
                <FormLabel color={'secondary'}> - </FormLabel>
            }
            {
                mode !== 'view' && enableAdd &&
                <Button
                    onClick={addRow} color="primary">
                    Add {id}
                </Button>
            }

        </>

    )
}

GenericListField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    initialValue: PropTypes.arrayOf(PropTypes.object),
    rowTemplate: PropTypes.object,
    enableAdd: PropTypes.bool,
    borderColor: PropTypes.string,
    onValidityChange: PropTypes.func,
    onEmptinessChange: PropTypes.func,
    onChange: PropTypes.func,
};

export
{
    GenericListField
}