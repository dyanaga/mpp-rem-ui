import {Label, Legend, Series} from "devextreme-react/chart";
import PieChart, {Connector, Font} from "devextreme-react/pie-chart";
import * as React from "react";
import * as PropTypes from "prop-types";

function customizeText(arg) {
    return `${arg.valueText} (${arg.percentText})`;
}

function MyPieChart(props) {

    return (
        <PieChart id={props.id}
                  palette="Bright"
                  dataSource={props.content}
                  title={props.title}
        >
            <Legend
                orientation="horizontal"
                itemTextPosition="right"
                horizontalAlignment="center"
                verticalAlignment="bottom"
                columnCount={4}/>
            <Series argumentField="name" valueField="value">
                <Label
                    visible={true}
                    position="columns"
                    customizeText={customizeText}>
                    <Font size={16}/>
                    <Connector visible={true} width={0.5}/>
                </Label>
            </Series>
        </PieChart>
    )
}

const MyPieChartPropTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
};
MyPieChart.propTypes = MyPieChartPropTypes;
export {MyPieChart, MyPieChartPropTypes}