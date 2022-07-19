import AsyncStorage from '@react-native-async-storage/async-storage';

// export const isLogged = async() => {
//     try {
//         const signed = await AsyncStorage.getItem('storageCredentials');

//         if (signed === null) { return reject }
//         else { return true }
//     } catch (error) {
//         console.log(error)
//     };
// };

export const getCredentials = async() => {
    try {
        const credentials = await AsyncStorage.getItem('storageCredentials');

        if (credentials === null) {
            // console.log('You are not signed in')
            return null;
        } else {
            const user = JSON.parse(credentials);
            // console.log(user);
            return user;
        };
    } catch (error) {
        console.log('error checking credentials', error);
    };
};

export const logOut = async() => {
    try {
        const isLogged = await AsyncStorage.getItem('storageCredentials');
        if (isLogged === null) {
            alert('You are not signed in')
        } else {
            AsyncStorage.removeItem('storageCredentials')
                .then(() => alert('Signed out successfully'))
        };
    } catch (error) {
        console.log('error logging out', error)
    };
};