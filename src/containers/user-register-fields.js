const userRegisterFields = [
    {
        id: 'name',
        label: 'User name',
        type: "text",
        required: true,
        isValid: (value) => {
            return value.length > 2 && value.length < 50
        },
        errorMessage: "The length has to be between 3 and 50"
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