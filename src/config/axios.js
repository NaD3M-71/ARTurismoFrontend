import axios from "axios";

const clienteAxios = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000' //TODO APLICAR variable de entorno
});

export default clienteAxios;