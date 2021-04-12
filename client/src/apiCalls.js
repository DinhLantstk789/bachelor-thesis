import axios from "axios";

const reqConfigs = {
    withCredentials: true, /* accept cookie */
    baseURL: 'http://localhost:1234/'
}

export const addPublication = (body, onSuccess, onFailed) => {
    axios.post('article/add', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess();
        } else {
            onFailed(res.data.message);
        }
    })
}

export const login = (body, onSuccess, onFailed) => {
    axios.post('users/login', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.user);
        } else {
            onFailed(res.data.message);
        }
    })
}

export const fetchPublication = (body, onSuccess, onFailed) => {
    axios.post('article/fetch', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.publications);
        } else {
            onFailed(res.data.message);
        }
    })
}

export const viewPublication = (body, onSuccess, onFailed) => {
    axios.post('article/view', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.publications[0]);
        } else {
            onFailed(res.data.message);
        }
    })
}

export const deletePublication = (body, onSuccess, onFailed) => {
    axios.post('article/deletePublication', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess();
        } else {
            onFailed(res.data.message);
        }
    })
}