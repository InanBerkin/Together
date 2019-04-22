export const login = (username, password) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT',
    };
};