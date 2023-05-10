import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {GenericCRUD} from "../../../components/generics/GenericCRUD";
import {ENDPOINTS} from "../../../api/constants";
import {userModalFields} from "./user-modal-fields";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const topUpButtonStyle = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(1)
    }
}));

const headCells = [
    {id: 'name', label: 'User name', sortable: true},
    {id: 'phoneNumber', label: 'Phone number', sortable: true},
    {id: 'type', label: 'Role', sortable: false},
    {id: 'offers', label: 'Offers', sortable: false},
    {id: 'options', label: 'Options', sortable: false}
];


const tableCells = (row) => {
    return (
        <>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell>
                {row.phoneNumber}
            </TableCell>
            <TableCell>
                {row.type}
            </TableCell>
            <TableCell>
                {row.offers.length}
            </TableCell>
        </>);
}

export default function UsersPage() {

    const topUpClasses = topUpButtonStyle();

    const [userName, setUserName] = React.useState("");
    const [topUpRow, setTopUpRow] = React.useState({});
    const [topUpOpen, setTopUpOpen] = React.useState(false);

    const handleChangeCompanyName = (event) => {
        setUserName(event.target.value);
    };

    const handleTopUpClose = () => {
        setTopUpOpen(false);
    }

    const handleTopUpOpen = (row) => {
        setTopUpRow(row);
        console.log(row);
        setTopUpOpen(true);
    }

    const filters = [
        {
            id: "nameFilter",
            key: "genericFilterNameFilter",
            displayName: "User name",
            type: "text",
            default: userName,
            onChange: handleChangeCompanyName
        },
    ];

    const getFilter = () => {
        let filters = [];

        if (userName.length > 0) {
            filters.push(`name=like=${userName}`);
        }

        return filters.join(";");
    }

    return (<>
        <GenericCRUD
            headCells={headCells}
            modalFields={userModalFields}
            idField="userId"
            tableCells={tableCells}
            defaultOptions={true}
            // otherOptions={otherOptions}
            expand="offers"
            crudName="user"
            endpoint={ENDPOINTS.USERS}
            disableActiveSort={true}
            filters={filters}
            getFilter={getFilter}
            defaultBody={{name: "", macAddress: "", configuration: "", details: "", active: true, accounts: []}}
        />
    </>)
}
