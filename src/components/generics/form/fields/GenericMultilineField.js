import React from "react";
import {GenericTextField, GenericTextFieldPropTypes} from "./GenericTextField";

function GenericMultilineField(props) {
    return <GenericTextField
        {...props}
        type={"text"}
        multiline={true}
    />
}

GenericMultilineField.propTypes = {
    type: undefined,
    multiline: undefined,
    ...GenericTextFieldPropTypes
};

export {GenericMultilineField}