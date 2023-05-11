import React from 'react';
import {GenericCheckboxField} from "../fields/GenericCheckboxField";
import {GenericTextField} from "../fields/GenericTextField";
import * as PropTypes from "prop-types";
import {GenericListField} from "../fields/GenericListField";
import {GenericSelectField} from "../fields/GenericSelectField";
import {GenericPasswordField} from "../fields/GenericPasswordField";
import {GenericRemoteSelectField} from "../fields/GenericRemoteSelectField";
import * as moment from "moment/moment";
import TextField from "@material-ui/core/TextField";

function GenericFieldContainer(props) {

    const {id, mode, fields, initialValue, onValidityChange, onEmptinessChange, onChange} = props;
    const [content, setContent] = React.useState({...initialValue});

    const handleValidityChange = (fieldId, value) => {
        if (onValidityChange != null) {
            const completeFieldId = `${id}.${fieldId}`;
            onValidityChange(completeFieldId, value);
        }
    }

    const handleEmptinessChange = (fieldId, value) => {
        if (onEmptinessChange != null) {
            const completeFieldId = `${id}.${fieldId}`;
            onEmptinessChange(completeFieldId, value);
        }
    }

    const handleContentChange = (fieldId, value) => {
        const newContent = {...content}
        newContent[fieldId] = value;
        setContent(newContent);
        if (onChange != null) {
            onChange(id, newContent);
        }
    }

    return (
        <>
            {
                fields != null &&
                fields.map((field) => {
                    let value = null;
                    if (initialValue != null) {
                        if (field.getValue != null) {
                            value = field.getValue(initialValue);
                        } else {
                            value = initialValue[field.id];
                        }
                    }
                    if (field.type === "text" || field.type === "number" || field.type === "text-multiline" || field.type === "datetime-local") {
                        return (
                            <GenericTextField key={`${id}.${field.id}`}
                                              type={field.type === "text-multiline" ? "text" : field.type}
                                              mode={mode}
                                              initialValue={value}
                                              id={field.id}
                                              label={field.label}
                                              required={field.required}
                                              isDisabled={field.isDisabled}
                                              errorMessage={field.errorMessage}
                                              multiline={field.type === "text-multiline"}
                                              onValidityChange={handleValidityChange}
                                              onEmptinessChange={handleEmptinessChange}
                                              isValid={field.isValid}
                                              getter={field.getter}
                                              onChange={handleContentChange}
                            />
                        )
                    }
                    if (field.type === "password") {
                        return (
                            <GenericPasswordField key={`${id}.${field.id}`}
                                                  mode={mode}
                                                  initialValue={value}
                                                  id={field.id}
                                                  label={field.label}
                                                  required={field.required}
                                                  isDisabled={field.isDisabled}
                                                  errorMessage={field.errorMessage}
                                                  multiline={field.type === "text-multiline"}
                                                  onValidityChange={handleValidityChange}
                                                  onEmptinessChange={handleEmptinessChange}
                                                  isValid={field.isValid}
                                                  onChange={handleContentChange}
                            />
                        )
                    }
                    if (field.type === "checkbox") {
                        return (
                            <GenericCheckboxField
                                mode={mode}
                                key={`${id}.${field.id}`}
                                id={field.id}
                                initialValue={value}
                                isDisabled={field.isDisabled}
                                onChange={handleContentChange}
                                label={field.label}
                            />
                        )
                    }
                    if (field.type === "select-local") {
                        return (
                            <GenericSelectField
                                mode={mode}
                                key={`${id}.${field.id}`}
                                initialValue={value}
                                required={field.required}
                                isDisabled={field.isDisabled}
                                values={field.values}
                                id={field.id}
                                onChange={handleContentChange}
                                label={field.label}
                            />
                        )
                    }
                    if (field.type === "select-remote") {
                        return (
                            <GenericRemoteSelectField
                                mode={mode}
                                key={`${id}.${field.id}`}
                                initialValue={value}
                                required={field.required}
                                isDisabled={field.isDisabled}
                                id={field.id}
                                getList={field.getList}
                                source={field.source}
                                valueField={field.valueField}
                                displayField={field.displayField}
                                onEmptinessChange={handleEmptinessChange}
                                onChange={handleContentChange}
                                label={field.label}
                            />
                        )
                    }
                    if (field.type === "list") {
                        return (
                            <GenericListField key={`${id}.${field.id}`}
                                              mode={mode}
                                              initialValue={value}
                                              id={field.id}
                                              label={field.label}
                                              fields={field.fields}
                                              rowTemplate={field.rowTemplate}
                                              onValidityChange={handleValidityChange}
                                              onEmptinessChange={handleEmptinessChange}
                                              onChange={handleContentChange}
                                              enableAdd={field.enableAdd}
                                              borderColor={field.borderColor}
                            />
                        )
                    }
                    return `Invalid field with id '${field.id}'`
                })
            }
        </>
    );
}

const GenericFieldContainerFieldsPropTypes = PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'checkbox', 'datetime-local', 'text-multiline', 'list', 'select-local', 'select-remote', 'password']),
    required: PropTypes.bool,
    errorMessage: PropTypes.string,
    borderColor: PropTypes.string,
    source: PropTypes.string,
    valueField: PropTypes.string,
    displayField: PropTypes.string,
    isValid: PropTypes.func,
    //A getter that defaults to parent.id if function not given
    getValue: PropTypes.func,
    getList: PropTypes.func,
    isDisabled: PropTypes.func,
}));

const GenericFieldContainerPropTypes = {
    id: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['view', 'create', 'update']).isRequired,
    fields: GenericFieldContainerFieldsPropTypes.isRequired,
    initialValue: PropTypes.object,
    onValidityChange: PropTypes.func,
    onEmptinessChange: PropTypes.func,
    onChange: PropTypes.func,
};
GenericFieldContainer.propTypes = GenericFieldContainerPropTypes;

export {GenericFieldContainer, GenericFieldContainerPropTypes, GenericFieldContainerFieldsPropTypes}