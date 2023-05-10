import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {GenericCRUD} from "../../components/generics/GenericCRUD";
import {ENDPOINTS} from "../../api/constants";
import {dateStringToRomanianFormat} from "../../utils/DateUtils";
import Button from "@material-ui/core/Button";
import {ACCOUNT_TYPE} from "../../constants";
import {GenericModal} from "../../components/generics/GenericModal";
import {createOffer, enroll, quit} from "../../api/offers";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


const modalFields = [
    {
        id: 'name',
        label: 'Name',
        type: "text",
        required: true,
        isValid: (text) => {
            return text !== null && text.length > 3 && text.length < 50;
        },
        getValue: (body) => {
            return body.name
        }
    },
    {
        id: 'address',
        required: true,
        label: 'Address',
        type: "text",
        getValue: (body) => {
            return body.address
        }
    },
    {
        id: 'rooms',
        required: true,
        label: 'Rooms',
        type: "text",
        getValue: (body) => {
            return body.rooms
        }
    },
    {
        id: 'description',
        label: 'Description',
        required: true,
        type: 'text-multiline',
        getValue: (body) => {
            return body.description
        }
    },
    {
        id: 'size',
        label: 'Size',
        required: true,
        type: "text",
        getValue: (body) => {

            return body.size + " m^2";
        }
    },
    {
        id: 'neighbourhood',
        label: 'Neighbourhood',
        required: true,
        type: "text",
        getValue: (body) => {
            return body.neighbourhood;
        }
    },
    {
        id: 'suggestedPrice',
        label: 'Price',
        required: true,
        type: "text",
        getValue: (body) => {
            return body.suggestedPrice;
        }
    },
    {
        id: 'offers',
        label: 'Offers',
        type: 'list',
        borderColor: "green",

        fields: [
            {
                id: 'price',
                label: 'Price',
                type: "text",
            },
            {
                id: 'comment',
                label: 'Comment',
                type: 'text-multiline'
            },
            {
                id: 'timestamp',
                label: 'Comment',
                type: 'text',
                getValue: body => dateStringToRomanianFormat(body.timestamp)
            },
        ],
        rowTemplate: {price: 0, comment: ''}
    },
    {
        id: 'users',
        label: 'Agents',
        type: 'list',
        borderColor: "blue",
        fields: [
            {
                id: 'name',
                label: 'Name',
                type: "text",
            },
            {
                id: 'email',
                label: 'Email',
                type: 'text'
            },
            {
                id: 'phoneNumber',
                label: 'Phone number',
                type: 'text'
            }
        ],
        rowTemplate: {name: '', email: '', phoneNumber: ''}
    },
]

const offerModalFields = [{
    id: 'price',
    label: 'Price',
    type: "number",
},
    {
        id: 'comment',
        label: 'Comment',
        type: 'text-multiline'
    }]

export default function ListingPage(props) {

    const {
        accountType,
        currentUser,
        userId,
        personal = false
    } = props;

    const [userIdAux, setUserId] = React.useState(userId);
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [neighbourhood, setNeighbourhood] = React.useState('');
    const [rooms, setRooms] = React.useState(null);
    const [currentOffers, setCurrentOffers] = React.useState([]);
    const [currentAgent, setCurrentAgent] = React.useState([]);
    const [listingId, setListingId] = React.useState('');
    const [offerModalOpen, setOfferModalOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Server error!");
    const [successMessage, setSuccessMessage] = React.useState("Success!");
    const [hasError, setHasError] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);


    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };

    const handleChangeNeighbourhood = (event) => {
        setNeighbourhood(event.target.value);
    };
    const handleChangeRooms = (event) => {
        setRooms(event.target.value);
    };

    const filters = [
        {
            id: "nameFilter",
            key: "genericFilterNameFilter",
            displayName: "Name",
            type: "text",
            default: name,
            onChange: handleChangeName
        },
        {
            id: "addressFilter",
            key: "genericFilterAddressFilter",
            displayName: "Address",
            type: "text",
            default: address,
            onChange: handleChangeAddress
        },
        {
            id: "neighbourhoodFilter",
            key: "genericFilterNeighbourhoodFilter",
            displayName: "Neighbourhood",
            type: "text",
            default: neighbourhood,
            onChange: handleChangeNeighbourhood
        },
        {
            id: "roomFiler",
            key: "genericFilterRoomFilter",
            displayName: "Rooms",
            type: "number",
            default: rooms,
            onChange: handleChangeRooms
        },

    ];
    let headCells = [
        {id: 'name', label: 'Name', sortable: true},
        {id: 'neighbourhood', label: 'Neighbourhood', sortable: true},
        {id: 'size', label: 'Size (m^2)', sortable: true},
        {id: 'rooms', label: 'Rooms', sortable: true},
        {id: 'price', label: 'Price', sortable: true},
        {id: 'offers', label: 'Offers', sortable: false},
        {id: 'options', label: 'Options', sortable: false},
    ];

    if (accountType !== ACCOUNT_TYPE.GUEST && accountType !== ACCOUNT_TYPE.CLIENT) {
        headCells.push({id: 'delete', label: 'Role based', sortable: false})
    }


    const handleModalSave = (body) => {
        createOffer(body.listingId, body, successfulCreate, onCreateError)
    }

    const successfulCreate = (json, status) => {
        setSuccessMessage(`Created offer.`)
        if (isSuccess) {
            setIsSuccess(false);
        }
        setIsSuccess(true);
        setCurrentOffers([...currentOffers, json.listingId])
        setOfferModalOpen(false);
    }

    const successfulEnroll = (json, status) => {
        setSuccessMessage(`Enrolled successfully.`)
        if (isSuccess) {
            setIsSuccess(false);
        }
        setIsSuccess(true);
        setCurrentAgent([...currentAgent, json.listingId])
    }

    const successfulQuit = (json, status) => {
        setSuccessMessage(`Quit successfully.`)
        if (isSuccess) {
            setIsSuccess(false);
        }
        setIsSuccess(true);
        setCurrentAgent(currentAgent.filter(id => id !== json.listingId))
    }

    const handleModalClose = (event) => {
        setOfferModalOpen(false);
    };

    const onCreateError = (error, status) => {
        setErrorMessage(`Error creating offer!\nStatus:${status}`)
        console.log(error);
        setHasError(true);
    }

    const onEnrollError = (error, status) => {
        setErrorMessage(`Error on enroll!\nStatus:${status}`)
        console.log(error);
        setHasError(true);
    }

    const onQuitError = (error, status) => {
        setErrorMessage(`Error on  quit!\nStatus:${status}`)
        console.log(error);
        setHasError(true);
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

    const getFilter = () => {
        let filters = [];

        if (personal) {
            filters.push(`agent==${userId}`);
        }

        if (name.length > 0) {
            filters.push(`name=like=${name}`);
        }

        if (address.length > 0) {
            filters.push(`address=like=${address}`);
        }

        if (neighbourhood.length > 0) {
            filters.push(`neighbourhood=like=${neighbourhood}`);
        }

        if (rooms !== null && rooms.length > 0) {
            filters.push(`rooms==${rooms}`);
        }

        return filters.join(";");
    }


    const tableCells = (row) => {
        return (
                <>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {row.neighbourhood}
                    </TableCell>
                    <TableCell>
                        {row.size}
                    </TableCell>
                    <TableCell>
                        {row.rooms}
                    </TableCell>
                    <TableCell>
                        {row.suggestedPrice} Euro
                    </TableCell>
                    <TableCell>
                        {row.offers.length}
                    </TableCell>

                    <TableCell>
                        {
                            accountType !== ACCOUNT_TYPE.GUEST && accountType !== ACCOUNT_TYPE.CLIENT ?
                                    (
                                            row.offers.filter(offer => offer.userId === userId).length === 0 && !currentOffers.includes(row.listingId) ?
                                                    (
                                                            <Button onClick={event => {
                                                                event.stopPropagation();
                                                                setListingId(row.listingId);
                                                                setOfferModalOpen(true);
                                                                setUserId(currentUser['id']);
                                                            }} variant="contained" color={"primary"}>
                                                                Add offer
                                                            </Button>
                                                    )
                                                    :
                                                    "Offered"
                                    ) : ('')
                        }

                        {
                            accountType !== ACCOUNT_TYPE.GUEST && accountType !== ACCOUNT_TYPE.CLIENT ?
                                    (
                                            row.users.filter(user => user.userId === userId).length === 0 ?
                                                    // currentAgent.includes(row.listingId) ?
                                                    (
                                                            <Button onClick={event => {
                                                                event.stopPropagation();
                                                                enroll(row.listingId, (json, status) => {
                                                                    successfulEnroll(json, status);
                                                                    row.users.push(currentUser);
                                                                    setUserId(currentUser['id']);
                                                                }, onEnrollError)
                                                            }} variant="contained" color={"primary"}>
                                                                Enroll as agent
                                                            </Button>
                                                    )
                                                    :
                                                    <Button onClick={event => {
                                                        event.stopPropagation();
                                                        quit(row.listingId, (json, status) => {
                                                            successfulQuit(json, status);
                                                            row.users = row.users.filter(user => user.userId !== userId);
                                                            setUserId(currentUser['id']);
                                                        }, onQuitError)
                                                    }} variant="contained" color={"secondary"}>
                                                        Quit as agent
                                                    </Button>
                                    ) : ('')
                        }
                    </TableCell>
                </>);
    }

    return (<>
        {
                offerModalOpen &&
                <GenericModal open={offerModalOpen}
                              crudName={"offer"}
                              fields={offerModalFields}
                              mode='create'
                              initialValue={{price: 0, comment: '', listingId: listingId}}
                              onCancel={handleModalClose}
                              onSave={handleModalSave}
                />
        }
        <GenericCRUD
                headCells={headCells}
                modalFields={modalFields}
                idField="listingId"
                tableCells={tableCells}
                crudName="listing"
                endpoint={ENDPOINTS.LISTINGS}
                expand="users,offers"
                filters={filters}
                getFilter={getFilter}
                defaultBody={{name: "", address: "", rooms: 1, description: "", size: 5, neighbourhood: "", suggestedPrice: 0, offers: [], users: []}}
                disableCreate={accountType === ACCOUNT_TYPE.GUEST || accountType === ACCOUNT_TYPE.CLIENT}
                disableUpdate
                disableActiveSort
                initialOrder="asc"
                initialOrderBy="name"
                defaultOptions={accountType !== ACCOUNT_TYPE.GUEST && accountType !== ACCOUNT_TYPE.CLIENT}
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
