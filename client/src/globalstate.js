import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: {
        isLoggedIn: false,
        isAdmin: false,
    }
});

export const announcementsState = atom({
    key: 'announcementsState',
    default: []
});

export const companyState = atom({
    key: 'companyState',
    default: []
});

export const allUsersState = atom({
    key: 'allUsersState',
    default: []
});

export const errorState = atom({
    key: 'errorState',
    default: {
        isError: false,
        message: ''
    }
});