import axios from "axios";

const clienteAxios = axios.create({
    baseURL : 'http://localhost:5000' //TODO APLICAR variable de entorno
});

export default clienteAxios;