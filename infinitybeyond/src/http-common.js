import axios from "axios";


export default axios.create({
    baseURL: "mijatovic1878-001-site1.htempurl.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});