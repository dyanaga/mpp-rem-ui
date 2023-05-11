import {dateStringToRomanianFormat} from "../../../utils/DateUtils";

const userFormFields = [
    {
        id: 'name',
        label: 'Full name',
        type: "text",
        required: true,
        isValid: (value) => {
            return value.length > 2 && value.length < 50
        },
        errorMessage: "The length has to be between 3 and 50"
    },
    {
        id: 'username',
        label: 'Username',
        type: "text",
        isDisabled: (mode) => mode !== "create",
    },
    {
        id: 'email',
        label: 'Email',
        type: "text",
        required: true,
        isValid: (value) => {
            return value.match("(?:^[a-zA-Z0-9._]+@[a-zA-Z]+\\.[a-zA-Z]+$)|^$") != null
        },
        errorMessage: "The email has to be valid!"
    },
    {
        id: 'password',
        label: 'Password',
        type: "password",
        isValid: (value) => {
            return value.match("(^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,12}$|^$)") != null
        },
    },
    {
        id: 'phoneNumber',
        label: 'Phone number',
        type: "text",
        required: true,
        isValid: (value) => {
            return value.match("^(?:\\+407|0[1-9])[0-9]{8}$|^$") != null
        },
        errorMessage: "Phone number has to be empty or like 0724584391 or +40724584391"
    },
    {
        id: 'bio',
        label: 'Bio',
        type: "text",
        required: true,
        isValid: (value) => {
            return value.length < 500
        },
        errorMessage: "The bio should be shorter than 500 characters"
    },
    {
        id: 'location',
        label: 'Location',
        type: "text",
        required: true,
        isValid: (value) => {
            return value.length < 100
        },
        errorMessage: "The bio should be shorter than 500 characters"
    },
    {
        id: 'gender',
        label: 'Gender',
        type: "text",
        required: false,
        isValid: (value) => {
            return value.length < 100
        },
        errorMessage: "The gender should be shorter than 100 characters"
    },
    {
        id: 'birthday',
        label: 'Birthday',
        type: "text",
        isDisabled: () => true,
        getter: (value) => {
            return dateStringToRomanianFormat(value);
        }
    },
    {
        id: 'url',
        label: 'URL',
        type: "text",
        required: false,
        isValid: (value) => {
            return value.length < 100
        },
        errorMessage: "The gender should be shorter than 100 characters"
    },
    {
        id: 'pagePreference',
        label: 'Page size preference',
        type: "number",
        required: true,
        isValid: (value) => {
            return value >= 4 && value <= 100
        },
        errorMessage: "The page size should be between 5 and 100 characters"
    },
    {
        id: 'listings',
        label: 'Agent in listings',
        type: "number",
        isDisabled: () => true,
        getter: (value) => {
            return value ? value.length : 0;
        }

    },
    {
        id: 'reviews',
        label: 'Reviews received:',
        type: "number",
        isDisabled: () => true,
        getter: (value) => {
            return value ? value.length : 0;
        }

    },
    {
        id: 'writtenReviews',
        label: 'Reviews written:',
        type: "number",
        isDisabled: () => true,
        getter: (value) => {
            return value ? value.length : 0;
        }

    },
    {
        id: 'offers',
        label: 'Offers given:',
        type: "number",
        isDisabled: () => true,
        getter: (value) => {
            return value ? value.length : 0;
        }

    },
    {
        id: 'listingsCreated',
        label: 'Listings created:',
        type: "number",
        isDisabled: () => true,
        getter: (value) => {
            return value ? value.length : 0;
        }

    },
    {
        id: 'type',
        label: 'User type',
        type: 'select-local',
        required: true,
        isDisabled: () => true,
        values: [
            {
                label: 'Client',
                value: 'CLIENT'
            },
            {
                label: 'Agent',
                value: 'AGENT'
            },
            {
                label: 'Director',
                value: 'DIRECTOR'
            },
            {
                label: 'Admin',
                value: 'ADMIN'
            }        ]
    }
]

export {userFormFields}