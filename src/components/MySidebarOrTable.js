import * as PropTypes from "prop-types";
import {MySideBySideBarChart} from "./MySideBySideBarChart";
import {Tab, TableCell, Tabs} from "@material-ui/core";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanel(props) {

    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index &&
            children
            }
        </div>
    );
}

function MySidebarOrTable(props) {
    const classes = useStyles();

    const [selectedTab, setSelectedTab] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Typography component="div" align="center">
                <Box m={1} fontSize="h5.fontSize">
                    {props.title}
                </Box>
            </Typography>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Chart"/>
                <Tab label="Table"/>
            </Tabs>
            <TabPanel value={selectedTab} index={0} {...a11yProps(0)}>
                <MySideBySideBarChart id={`${props.id}-chart`} title="" content={props.content}
                                      identityField={props.identityField}
                                      fields={props.fields}
                                      rotated={props.rotated === true}
                />
            </TabPanel>
            <TabPanel value={selectedTab} index={1} {...a11yProps(1)}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            {props.fields.map(field => {
                                return (
                                    <TableCell key={field.key}>
                                        {field.name}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.content.map((row, index) => {
                            return (
                                <TableRow key={row.name + index}>

                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    {props.fields.map((field, index2) => {
                                        return (
                                            <TableCell key={field.key}>
                                                {row[field.value]}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TabPanel>
        </>
    )
}

const MySidebarOrTablePropTypes =
    {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        identityField: PropTypes.string.isRequired,
        content: PropTypes.array.isRequired,
        rotated: PropTypes.bool, fields:
        PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
    };

MySidebarOrTable.propTypes = MySidebarOrTablePropTypes;

export {
    MySidebarOrTable
}