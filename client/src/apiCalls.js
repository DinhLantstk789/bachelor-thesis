import axios from "axios";

const reqConfigs = {
    withCredentials: true, /* accept cookie */
    baseURL: 'http://localhost:1234/'
}

export const fetchUsers = (body, onSuccess, onFailed) => {
    axios.post('users/fetchUser', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.userList);
        } else {
            onFailed(res.data.message);
        }
    })
}

export const fetchFullyUserData = (body, onSuccess, onFailed) => {
    axios.post('users/fetchFullyUserData', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.userData);
        } else {
            onFailed(res.data.message);
        }
    })
}
export const addUser =(body,onSuccess, onFailed)=>{
    axios.post('users/addUser', body,reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.email)
        } else {
            onFailed( res.data.message)
        }
    })
}
export const deleteUser = (body, onSuccess, onFailed) => {
    axios.post('users/deleteUser', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess();
        } else {
            onFailed(res.data.message);
        }
    })
}

export const toggleApprovePublication = (body, onSuccess, onFailed) => {
    axios.post('article/toggleApproval', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess();
        } else {
            onFailed(res.data.message);
        }
    })
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

export const logout = (onSuccess, onFailed) => {
    axios.get('users/logout', reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.message);
        } else {
            onFailed(res.data.message);
        }
    })
}

export const verifyCookie = (onSuccess, onFailed) => {
    axios.post('users/verifyCookie', {}, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.user);
        } else {
            onFailed(res.data.message);
        }
    })
}

export const fetchPublication = (onSuccess, onFailed) => {
    axios.get('article/fetch', reqConfigs).then(res => {
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
export const fetchPublicationAsDivision = (body, onSuccess, onFailed) => {
    axios.post('article/view', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.publications);
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
export const fetchIdAllPublicationAsDivision = (body, onSuccess, onFailed) => {
    axios.post('article/fetchAllPublicationAsDivision', body, reqConfigs).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess(res.data.pubId);
        } else {
            onFailed(res.data.message);
        }
    })
}

