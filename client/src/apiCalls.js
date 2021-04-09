import axios from "axios";

export const addPublication = (body, onSuccess, onFailed) => {
    axios.post('http://localhost:1234/article/add', body).then(res => {
        let status = res.data.status;
        if (status === 200) {
            onSuccess();
        } else {
            onFailed(res.data.message);
        }
    })
}