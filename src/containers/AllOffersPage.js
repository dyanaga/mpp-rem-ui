import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {GenericCRUD} from "../components/generics/GenericCRUD";
import {ENDPOINTS} from "../api/constants";
import {dateStringToRomanianFormat} from "../utils/DateUtils";


const modalFields = [
    {
        id: 'price',
        label: 'Price',
        type: "number",
        getValue: (body) => {
            return body.price
        }
    },
    {
        id: 'comment',
        label: 'Comment',
        type: 'text-multiline',
        getValue: (body) => {
            return body.comment
        }
    },
    {
        id: 'timestamp',
        label: 'Timestamp',
        type: "text",
        isDisabled: () => true,
        getValue: (body) => {
            return dateStringToRomanianFormat(body.timestamp)
        }
    },
    {
        id: 'listingName',
        label: 'Listing name',
        type: "text",
        isDisabled: () => true,
        getValue: (body) => {
            return body.listing.name
        }
    },
    {
        id: 'listingAddress',
        label: 'Listing address',
        type: "text",
        isDisabled: () => true,
        getValue: (body) => {
            return body.listing.address
        }
    },
    {
        id: 'listingRooms',
        label: 'Listing rooms',
        type: "number",
        isDisabled: () => true,
        getValue: (body) => {
            return body.listing.rooms
        }
    },
    {
        id: 'listingDescription',
        label: 'Listing description',
        type: "text-multiline",
        isDisabled: () => true,
        getValue: (body) => {
            return body.listing.description
        }
    },
    {
        id: 'listingSize',
        label: 'Listing size',
        type: "number",
        isDisabled: () => true,
        getValue: (body) => {
            return body.listing.size
        }
    },
    {
        id: 'listingNeighbourhood',
        label: 'Listing neighbourhood',
        type: "text",
        isDisabled: () => true,
        getValue: (body) => {
            return body.listing.neighbourhood
        }
    },
    {
        id: 'listingPrice',
        label: 'Listing price',
        type: "number",
        isDisabled: () => true,
        getValue: (body) => {
            return body.listing.suggestedPrice
        }
    }
]

export default function AllOffersPage(props) {

    const [comment, setComment] = React.useState('');


    const handleChangeComment = (event) => {
        setComment(event.target.value);
    };


    const filters = [
        {
            id: "commentFilter",
            key: "genericFilterCommentFilter",
            displayName: "Comment",
            type: "text",
            default: comment,
            onChange: handleChangeComment
        }
    ];
    const headCells = [
        {id: 'name', label: 'Listing name', sortable: true},
        {id: 'username', label: 'Username', sortable: true},
        {id: 'price', label: 'Price', sortable: true},
        {id: 'offerPrice', label: 'Offered price', sortable: true},
        {id: 'timestamp', label: 'Time', sortable: true},
    ];


    const getFilter = () => {
        let filters = [];

        if (comment.length > 0) {
            filters.push(`comment=like=${comment}`);
        }

        return filters.join(";");
    }


    const tableCells = (row) => {
        return (
                <>
                    <TableCell component="th" scope="row">
                        {row.listing.name}
                    </TableCell>
                    <TableCell>
                        {row.user.name}
                    </TableCell>
                    <TableCell>
                        {row.listing.suggestedPrice} Euro
                    </TableCell>
                    <TableCell>
                        {row.price} Euro
                    </TableCell>
                    <TableCell>
                        {dateStringToRomanianFormat(row.timestamp)}
                    </TableCell>
                </>);
    }

    return (<>
        <GenericCRUD
                headCells={headCells}
                modalFields={modalFields}
                idField="offerId"
                tableCells={tableCells}
                crudName="offer"
                endpoint={ENDPOINTS.OFFERS}
                expand="listing,user"
                filters={filters}
                getFilter={getFilter}
                defaultBody={{name: "", address: "", rooms: 1, description: "", size: 5, neighbourhood: "", suggestedPrice: 0, offers: [], users: []}}
                disableCreate
                disableActiveSort
                initialOrder="desc"
                initialOrderBy="timestamp"
                defaultOptions
        />
    </>)
}
