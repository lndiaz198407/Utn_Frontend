
import { useState } from "react";
const useFerch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    async function sendRequest( requestCallback ) {
        try {
            // marcamos que estamos cargando
            setLoading(true);
            setError(null);
            // ejecutamos la consulta
           const response = await requestCallback()
           // guardamos la respuesta

           setResponse(response)
        }
        catch (error) {
            setError(error)
        }
        // finalmente marcamos que ya no estamos cargando
        finally {
            setLoading(false)
        }
    }

    return { 
        loading, 
        error, 
        response,
        sendRequest
    }


}

export default useFerch