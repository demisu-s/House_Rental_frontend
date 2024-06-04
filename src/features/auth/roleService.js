import axios from "axios";

const fetchRole = async () => {
    try {
        const response = await axios.get("");
        return response;
    } catch (error) {
        console.error("error logging in: ", error)
        throw error
    }
}

const roleService = {
    fetchRole
}

export default roleService