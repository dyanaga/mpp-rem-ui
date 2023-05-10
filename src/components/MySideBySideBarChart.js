import React from 'react';

import {Chart, CommonSeriesSettings, Format, Label, Legend, Series, Tooltip} from 'devextreme-react/chart';
import * as PropTypes from "prop-types";

function MySideBySideBarChart(props) {
    const {rotated = false} = props
    return (
        <Chart id={props.id}
               title={props.title}
               dataSource={props.content}
               rotated={rotated}
        >
            <CommonSeriesSettings
                argumentField={props.identityField}
                type="bar"

            >
                <Label visible={true}>
                    <Format type="fixedPoint" precision={0}/>
                </Label>
            </CommonSeriesSettings>
            {props.fields.map(field => {
                return (
                    <Series
                        key={field.key}
                        valueField={field.value}
                        name={field.name}
                    />
                )
            })}
            <Tooltip
                enabled={true}
                location="edge"
                customizeTooltip={(arg) => {
                    return {text: `${arg.argumentText}, ${arg.seriesName}: ${arg.valueText}`}
                }}
            />
            <Legend verticalAlignment="bottom" horizontalAlignment="center"/>
        </Chart>
    );

}

const MySideBySideBarChartPropTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    identityField: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    rotated: PropTypes.bool,
    fields: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
};

MySideBySideBarChart.propTypes = MySideBySideBarChartPropTypes;
export {MySideBySideBarChart, MySideBySideBarChartPropTypes};
