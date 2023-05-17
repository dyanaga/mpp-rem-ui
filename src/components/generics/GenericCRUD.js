import React, {useEffect} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import GenericTable from "./GenericTable";
import {activateItem, createItem, deleteItem, getItems, updateItem} from "../../api/generic-crud";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import GenericFilter from "./GenericFilter";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {indigo, yellow} from "@material-ui/core/colors";
import {GenericModal} from "./GenericModal";
import * as PropTypes from "prop-types";
import {GenericFieldContainerFieldsPropTypes} from "./form/containers/GenericFieldContainer";
import Cookies from "universal-cookie";
import {COOKIES} from "../../constants";

const createButtonStyle = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(4),
        primary: indigo,
        secondary: yellow,
    }
}));

const cookies = new Cookies();

function GenericCRUD(props) {
    const createButtonClasses = createButtonStyle();

    const {
        headCells = "",
        modalFields,
        idField = "id",
        tableCells = [],
        defaultOptions = true,
        defaultOptionsIf,
        otherOptions,
        crudName = "crud",
        endpoint = "",
        expand = null,
        filters = [],
        getFilter = () => null,
        defaultBody = {},
        disableCreate = false,
        disableUpdate = false,
        disableView = false,
        disableActiveSort = false,
        initialOrder = 'asc',
        initialOrderBy = 'name',
    } = props;

    const initialPage = 0;
    let pageSize = cookies.get(COOKIES.PAGE_SIZE);
    let initialRowsPerPage = 10;
    if(pageSize && pageSize > 0) {
        initialRowsPerPage = pageSize
    }


    const [page, setPage] = React.useState(initialPage);
    const [pageCount, setPageCount] = React.useState(initialPage);
    const [count, setCount] = React.useState(initialRowsPerPage);
    const [order, setOrder] = React.useState(initialOrder);
    const [orderBy, setOrderBy] = React.useState(initialOrderBy);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
    const [rows, setRows] = React.useState([]);
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Server error!");
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("Success!");
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState(null);
    const [modalContent, setModalContent] = React.useState(null);

    // Event handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        refreshRows(newPage, rowsPerPage, order, orderBy);
    };

    const handleChangeRowsPerPage = (event) => {
        const rowsPerPage = event.target.value;
        setRowsPerPage(parseInt(rowsPerPage, 10));
        setPage(0);
        refreshRows(0, rowsPerPage, order, orderBy);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';
        setOrder(newOrder);
        setOrderBy(property);
        refreshRows(page, rowsPerPage, newOrder, property);
    };

    const handleCreate = (event) => {
        setModalType("create");
        setModalContent({...defaultBody})
        setModalOpen(true);
    }

    const handleTableRowClick = (content) => {
        if (!disableUpdate) {
            setModalType("update");
            setModalContent(content)
            setModalOpen(true);
        }
        else if (!disableView) {
            setModalType("view");
            setModalContent(content)
            setModalOpen(true);
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setHasError(false);
    };

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSuccess(false);
    };

    const handleModalClose = (event) => {
        setModalOpen(false);
    };


    const handleFilterSubmit = (event) => {
        event.preventDefault();
        refreshRows(page, rowsPerPage, order, orderBy);
    };

    // CRUD operations

    const refreshRows = (page, rowsPerPage, order, orderBy) => {
        let filter = getFilter();
        let sorts = [];

        sorts.push(`${order === 'asc' ? '+' : '-'}${orderBy}`);
        if (!disableActiveSort && !(sorts.includes("-active") || sorts.includes("+active"))) {
            sorts = ["-active", ...sorts];
        }

        const sort = sorts.join(",")
        getItems(endpoint, page, rowsPerPage, filter, sort, expand, successfulGetItems, onGetError);
    }

    const handleDeactivate = (itemId) => {
        deleteItem(endpoint, itemId, successfulDelete, onDeleteError)
    }

    const handleActivate = (itemId) => {
        activateItem(endpoint, itemId, successfulActivate, onActivateError)
    }


    const handleModalSave = (body) => {

        if (body[idField] === undefined) {
            createItem(endpoint, body, successfulCreate, onCreateError)
        }
        else {
            updateItem(endpoint, body[idField], body, successfulUpdate, onUpdateError)
        }
    }

    //API Success response handlers
    const successfulGetItems = (json, status) => {
        if (status === 200) {
            let content = json.content;
            setRows(content);
            let totalElements = json.totalElements;
            let pages = json.pages;
            setPageCount(pages)
            setCount(totalElements);
        }
        else {
            setHasError(true);
            setErrorMessage(`Error while getting ${crudName}`);
        }
    }

    const successfulUpdate = (json, status) => {
        setSuccessMessage(`Updated ${crudName}.`)
        if (isSuccess) {
            setIsSuccess(false);
        }
        setIsSuccess(true);
        setModalOpen(false);
        refreshRows(page, rowsPerPage, order, orderBy);
    }
    const successfulCreate = (json, status) => {
        setSuccessMessage(`Created ${crudName}.`)
        if (isSuccess) {
            setIsSuccess(false);
        }
        setIsSuccess(true);
        setModalOpen(false);
        refreshRows(page, rowsPerPage, order, orderBy);
    }

    const successfulDelete = (json, status) => {
        setSuccessMessage(`Deleted ${crudName}.`)
        if (isSuccess) {
            setIsSuccess(false);
        }
        setIsSuccess(true);
        refreshRows(page, rowsPerPage, order, orderBy);
    }
    const successfulActivate = (json, status) => {
        setSuccessMessage(`Added ${crudName}.`)
        if (isSuccess) {
            setIsSuccess(false);
        }
        setIsSuccess(true);
        refreshRows(page, rowsPerPage, order, orderBy);
    }

    //API Error response handlers
    const onGetError = (error, status) => {
        setErrorMessage(`Error while getting items of ${crudName}!\nStatus:${status}`)
        console.log(error);
        setHasError(true);
    }

    const onDeleteError = (error, status) => {
        setErrorMessage(`Error deleting ${crudName}!\nStatus:${status}`)
        console.log(error);
        setHasError(true);
    }

    const onUpdateError = (error, status) => {
        setErrorMessage(`Error updating ${crudName}!\nStatus:${status}`)
        console.log(error);
        setHasError(true);
    }

    const onActivateError = (error, status) => {
        setErrorMessage(`Error activating ${crudName}!\nStatus:${status}`)
        console.log(error);
        setHasError(true);
    }

    const onCreateError = (error, status) => {
        setErrorMessage(`Error creating ${crudName}!\nMessage:${error.message}`)
        console.log(error);
        setHasError(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => refreshRows(initialPage, initialRowsPerPage, initialOrder, initialOrderBy), []);

    //HTML providers
    const rowProvider = (row, defaultId) => {
        return (
                <TableRow key={defaultId} onClick={event => handleTableRowClick(row)} hover={true}>
                    {tableCells(row)}
                    {
                            defaultOptions && (!defaultOptionsIf || defaultOptionsIf(row)) && (
                                    <TableCell>
                                        <Button onClick={event => {
                                            event.stopPropagation()
                                            handleDeactivate(row[idField]);
                                        }} variant="contained" color="secondary">
                                            Delete
                                        </Button>
                                        {otherOptions && otherOptions(row)}
                                    </TableCell>
                            )
                    }
                </TableRow>
        );
    }
    const createButton = !disableCreate ? (
            <Button
                    onClick={handleCreate} variant="contained" className={createButtonClasses.button} color={"primary"}>
                Create {crudName}
            </Button>
    ) : '';

    return (<>
        {
                modalOpen &&
                <GenericModal open={modalOpen}
                              crudName={crudName}
                              fields={modalFields}
                              mode={modalType}
                              initialValue={modalContent}
                              onCancel={handleModalClose}
                              onSave={handleModalSave}
                />
        }

        <GenericTable
                headers={headCells}
                filters={(
                        <GenericFilter filters={filters}
                                       onSubmit={handleFilterSubmit}/>
                )}
                buttons={createButton}
                rows={rows}
                rowProvider={rowProvider}
                page={page}
                pageCount={pageCount}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangeSort={handleRequestSort}
                rowsPerPage={rowsPerPage}
                count={count}
                order={order}
                orderBy={orderBy}
        />

        {/*Error message*/}
        <Snackbar open={hasError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
        {/*Success message*/}
        <Snackbar open={isSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
            <Alert onClose={handleCloseSuccess} severity="success">
                {successMessage}
            </Alert>
        </Snackbar>
    </>)
}

//TODO: create definitions for everything
const GenericCrudPropTypes = {
    crudName: PropTypes.string.isRequired,
    modalFields: GenericFieldContainerFieldsPropTypes.isRequired,
    initialOrder: PropTypes.oneOf(['asc', 'desc']),
};
GenericCRUD.propTypes = GenericCrudPropTypes;
export {GenericCRUD, GenericCrudPropTypes}