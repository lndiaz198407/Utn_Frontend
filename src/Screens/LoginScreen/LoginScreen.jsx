import React from 'react'
import useFetch from '../../Hooks/useFetch.jsx'
import useForm from '../../Hooks/useForm.jsx'
import { login } from '../../Services/authService.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import LOCALSTORAGE_KEYS from '../../constants/localstrorage.js'


const FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

const initial_form_state = {
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PASSWORD]: ''
}

export const LoginScreen = () => {

   const navigate = useNavigate ()

    const {
        sendRequest,
        loading,
        response,
        error
    } = useFetch()
    
    const onLogin = (form_state) => {
        sendRequest(() => login(
            form_state[FORM_FIELDS.EMAIL],
            form_state[FORM_FIELDS.PASSWORD]
        ))
    }
    useEffect(() => {

        console.log(response);
         if (response && response.ok) {
            localStorage.setItem(LOCALSTORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
            navigate('/home')
        } 
    },
     [response, navigate]
    )



    
    const {
        form_state: login_form_state,
        handleSubmit,
        handleInputChange
    } = useForm(
        {
            initial_form_state,
            onSubmit: onLogin
        }
    )

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
                    <input
                        name={FORM_FIELDS.EMAIL}
                        id={FORM_FIELDS.EMAIL}
                        type='email'
                        value={login_form_state[FORM_FIELDS.EMAIL]}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <input
                        name={FORM_FIELDS.PASSWORD}
                        id={FORM_FIELDS.PASSWORD}
                        type='password'
                        value={login_form_state[FORM_FIELDS.PASSWORD]}
                        onChange={handleInputChange}
                    />
                    
                </div>
                {
                    !response
                        ?
                        <button type='submit' disabled={loading}>
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                        :
                        <>
                            <button type='submit' disabled={true}>Sesión Iniciada</button>
                            <span style={{ color: 'green' }}>{response.message}</span>
                        </>
                }
                {
                    error && <span style={{ color: 'red' }}>{error.message}</span>
                }
            </form>
        </div>
    )
}