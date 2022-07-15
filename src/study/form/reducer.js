export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            const newUsers = [...state.users, action.payload]
            return {
                ...state,
                users: newUsers
            }
        case 'DELETE_USER':
            const newDeletedUsers = state.users.filter(
                (user) => user.id !== action.payload
            );
            return {
                ...state,
                users: newDeletedUsers
            }

        default:
            throw new Error("No matching action");

    }
};
