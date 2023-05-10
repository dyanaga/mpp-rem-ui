import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {GenericCRUD} from "../../components/generics/GenericCRUD";
import {ENDPOINTS} from "../../api/constants";
import {dateStringToRomanianFormat} from "../../utils/DateUtils";
import moment from "moment";


const headCells = [
    {id: 'posName', label: 'POS name', sortable: false},
    {id: 'cardNickname', label: 'Cad nickname', sortable: false},
    {id: 'accountPreviousValue', label: 'Account previous value', sortable: false},
    {id: 'paymentValue', label: 'Payment value', sortable: false},
    {id: 'accountNewValue', label: 'Account new value', sortable: false},
    {id: 'status', label: 'Status', sortable: false},
    {id: 'timestamp', label: 'Date', sortable: true},
];

const modalFields = [
    {
        id: 'posName',
        label: 'Pos name',
        type: "text",
        getValue: (body) => {
            if (body.paymentDetails != null) {
                return body.paymentDetails.posName
            }
            return "";
        }
    },
    {
        id: 'accountName',
        label: 'Account name',
        type: "text",
        getValue: (body) => {
            if (body.paymentDetails != null) {
                return body.paymentDetails.accountName
            }
            return "";
        }
    },
    {
        id: 'cardNickname',
        label: 'Card nickname',
        type: "text",
        getValue: (body) => {
            if (body.paymentDetails != null) {
                return body.paymentDetails.cardNickname
            }
            return "";
        }
    },
    {
        id: 'accountPreviousValue',
        label: 'Account previous value',
        type: "text",
    },
    {
        id: 'total',
        label: 'Total',
        type: "text",
    },
    {
        id: 'timestamp',
        label: 'Timestamp',
        type: "text",
        getValue: body => dateStringToRomanianFormat(body.timestamp)
    },
    {
        id: 'paymentItems',
        label: 'Products',
        type: 'list',
        borderColor: "green",
        fields: [
            {
                id: 'quantity',
                label: 'Quantity',
                type: "text",

            },
            {
                id: 'product',
                label: 'Product name',
                type: "text",
                getValue: body => body.product.name
            }, {
                id: 'purchasePrice',
                label: 'Price per product',
                type: "text",
            },
        ],
        rowTemplate: {nickname: '', value: 0, active: true}
    },
]


const tableCells = (row) => {
    return (
        <>
            <TableCell component="th" scope="row">
                {row.paymentDetails.posName}
            </TableCell>
            <TableCell>
                {row.paymentDetails.cardNickname}
            </TableCell>
            <TableCell>
                {row.accountPreviousValue}
            </TableCell>
            <TableCell>
                {row.total}
            </TableCell>
            <TableCell>
                {(row.accountPreviousValue - row.total).toFixed(2)}
            </TableCell>

            <TableCell>
                {row.status === "DONE" ? "Done" : "Refunded"}
            </TableCell>
            <TableCell>
                {dateStringToRomanianFormat(row.timestamp)}
            </TableCell>
        </>);
}
export default function PurchaseHistoryPage(props) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const yesterday = new Date();
    //TODO remove this
    yesterday.setMonth(0);
    yesterday.setMinutes(now.getMinutes() + 1);
    yesterday.setSeconds(0);
    yesterday.setMilliseconds(0);
    yesterday.setDate(yesterday.getDate() - 1);
    const {mode, userId} = props;

    const [posId, setPosId] = React.useState('');
    const [cardNickname, setCardNickname] = React.useState('');
    const [cardUid, setCardUid] = React.useState('');
    const [from, setFrom] = React.useState(yesterday);
    const [until, setUntil] = React.useState(now);

    const handleChangePos = (event) => {
        setPosId(event.target.value);
    };

    const handleChangeCardNickname = (event) => {
        setCardNickname(event.target.value);
    };

    const handleChangeFrom = (event) => {
        setFrom(new Date(event.target.value));
    };

    const handleChangeUntil = (event) => {
        setUntil(new Date(event.target.value));
    };

    const filters = [
        {
            id: "posSelect",
            key: "genericFilterPosFilter",
            displayName: "Pos",
            type: "remote-select",
            valueField: "posId",
            displayValue: "name",
            canBeEmpty: true,
            source: ENDPOINTS.POSES,
            getList: (json) => json.content,
            onChange: handleChangePos,
            value: posId
        },
        {
            id: "cardFilter",
            key: "genericFilterCardNicknameFilter",
            displayName: "Card nickname",
            type: "text",
            default: cardNickname,
            onChange: handleChangeCardNickname
        },
        {
            id: "cardUidFilter",
            key: "genericFilterCardUidFilter",
            displayName: "Card Unique ID",
            type: "text",
            default: cardUid,
            onChange: handleChangeCardNickname
        },
        {
            id: "fromFilter",
            key: "genericFilterFromFilter",
            displayName: "From",
            type: "datetime",
            default: yesterday,
            onChange: handleChangeFrom
        },
        {
            id: "untilFilter",
            key: "genericFilterUntilFilter",
            displayName: "Until",
            type: "datetime",
            default: now,
            onChange: handleChangeUntil
        }
    ];

    const getFilter = () => {
        let filters = [];

        filters.push(`from==${moment(from).format('yyyy-MM-DD[T]HH:mm:ss.SSS[+0200]')}`)
        filters.push(`until==${moment(until).format('yyyy-MM-DD[T]HH:mm:ss.SSS[+0200]')}`)
        filters.push(`card.account.userId==${userId}`)

        if (posId.length > 0) {
            filters.push(`posId==${posId}`);
        }

        if (cardNickname.length > 0) {
            filters.push(`card.nickname=like=${cardNickname}`);
        }

        if (cardUid.length > 0) {
            filters.push(`card.cardUid=like=${cardUid}`);
        }

        return filters.join(";");
    }

    return (<>
        <GenericCRUD
            headCells={headCells}
            modalFields={modalFields}
            idField="topUpId"
            tableCells={tableCells}
            crudName="purchase"
            endpoint={ENDPOINTS.LISTINGS}
            expand="paymentDetails,paymentItems,product"
            filters={filters}
            getFilter={getFilter}
            defaultBody={{name: "", macAddress: "", configuration: "", details: "", active: true}}
            disableCreate
            disableUpdate
            disableActiveSort
            initialOrder="desc"
            initialOrderBy="timestamp"
            defaultOptions={false}

        />
    </>)
}
