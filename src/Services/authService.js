import ENVIORMENT from "../config/enviorment"
import { CONTENT_TYPE_VALUES, HEADER_TYPES, HEADERS, HTTP_METHODS } from "../constants/http"




export async function register(name, email, password) {
    const usuario = { 
        email,
        username: name,  
        password 
    }

    const response_http = await fetch(
    `${ENVIORMENT.API_URL}/api/auth/register`, {
        method: HTTP_METHODS.POST,
    
        headers: {
            [HEADERS.CONTENT_TYPE]: HEADER_TYPES.JSON
        },
        body: JSON.stringify(usuario)
    },

    )

    const response_data = await response_http.json()
 if (!response_http.ok) {
        throw new Error(response_data.message || 'Error en el registro')
    }
    return response_data
}

export async function login(email, password) {
    const response = await fetch(
        `${ENVIORMENT.API_URL}/api/auth/login`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify({ email, password })
        })
    const response_data = await response.json()

    if (!response.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}


