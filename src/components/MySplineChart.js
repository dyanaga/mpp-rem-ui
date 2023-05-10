import React from 'react';
import {
    ArgumentAxis,
    Chart,
    CommonAxisSettings,
    CommonSeriesSettings,
    Format,
    Grid,
    Label,
    Legend,
    Margin,
    Series,
    Tooltip
} from 'devextreme-react/chart';
import * as PropTypes from "prop-types";

export const architectureSources = [
    {value: 'smp', name: 'SMP'},
    {value: 'mmp', name: 'MMP'},
    {value: 'cnstl', name: 'Cnstl'},
    {value: 'cluster', name: 'Cluster'}
];

export const sharingStatisticsInfo = [{
    year: 1997,
    smp: 263,
    mmp: 226,
    cnstl: 10,
    cluster: 1
}, {
    year: 1999,
    smp: 169,
    mmp: 256,
    cnstl: 66,
    cluster: 7
}, {
    year: 2001,
    smp: 57,
    mmp: 257,
    cnstl: 143,
    cluster: 43
}, {
    year: 2003,
    smp: 0,
    mmp: 163,
    cnstl: 127,
    cluster: 210
}, {
    year: 2005,
    smp: 0,
    mmp: 103,
    cnstl: 36,
    cluster: 361
}, {
    year: 2007,
    smp: 0,
    mmp: 91,
    cnstl: 3,
    cluster: 406
}];

function MySplineChart(props) {
    return (
        <Chart
            dataSource={props.content}
            title={props.title}
        >
            <CommonSeriesSettings
                argumentField={props.identityField}
                type='spline'
            />
            <CommonAxisSettings>
                <Grid visible={true}/>
            </CommonAxisSettings>
            {
                props.fields.map((field) => {
                    return <Series key={field.key} valueField={field.value} name={field.name}/>;
                })
            }
            <Margin bottom={20}/>
            <ArgumentAxis
                allowDecimals={false}
                axisDivisionFactor={60}
            >
                <Label>
                    <Format type="decimal"/>
                </Label>
            </ArgumentAxis>
            <Legend
                verticalAlignment="top"
                horizontalAlignment="right"
            />
            <Tooltip enabled={true} customizeTooltip={(arg) => {
                return {text: `${arg.seriesName}: ${arg.valueText}`}
            }}/>
        </Chart>
    );
}

const MySplineChartPropTypes = {
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

MySplineChart.propTypes = MySplineChartPropTypes;

export {MySplineChart, MySplineChartPropTypes};
