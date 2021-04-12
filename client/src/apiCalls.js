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