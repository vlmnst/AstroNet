import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCredentials = async() => {
    try {
        const credentials = await AsyncStorage.getItem('storageCredentials');

        if (credentials === null) {
            return null;
        } else {
            const user = JSON.parse(credentials);
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