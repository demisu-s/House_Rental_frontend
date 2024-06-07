import axios from "axios";

const fetchRole = async (id) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        return response;
        // return response.data
    } catch (error) {
        console.error("error logging in: ", error)
        throw error
    }
}

const roleService = {
    fetchRole
}

export default roleService