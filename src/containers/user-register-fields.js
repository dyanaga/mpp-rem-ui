const userRegisterFields = [
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
        required: true,
        isValid: (value) => {
            return value.length > 2 && value.length < 50
        },
        errorMessage: "The username should be shorter than 50 characters but longer than 5"
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
        required: true,
        type: "password",
        isValid: (value) => {
            return value.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})") != null
        },
        errorMessage: "The password length should be strong and between 8 and 12 characters"
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
        type: "datetime-local",
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
        id: 'type',
        label: 'User type',
        type: 'select-local',
        required: true,
        isDisabled: () => true,
        values: [
            {
                label: 'Client',
                value: 'CLIENT'
            }
        ]
    }
]

export {userRegisterFields}