import React from 'react'
import useForm from '../../Hooks/useForm.jsx'
import useFerch from '../../Hooks/useFetch.jsx'
import { register } from '../../Services/authService.js'


const RegisterScreen = () => {

    const FORM_FIELDS = {
        NAME: 'name',
        EMAIL: 'email',
        PASSWORD: 'password'
    }
    const initial_form_state = {
        [FORM_FIELDS.NAME]: '',
        [FORM_FIELDS.EMAIL]: '',
        [FORM_FIELDS.PASSWORD]: ''
    }

    const onRegister = (form_state) => {

        sendRequest( () => register(
            form_state[FORM_FIELDS.NAME],
            form_state[FORM_FIELDS.EMAIL],
            form_state[FORM_FIELDS.PASSWORD]
        ) )

    }
        
    const {
        form_state, 
        handleInputChange, 
        handleSubmit
    } = useForm({
                initial_form_state,
                onSubmit: onRegister
                })

    const {
        sendRequest, 
        loading, 
        response, 
        error
    }= useFerch()

  return (
    <div>
        <h1>Registrate</h1>

        <form onSubmit={handleSubmit}>"
            <label htmlFor={FORM_FIELDS.NAME}>Nombre</label>
            <input
                type="text"
                placeholder='Nombre'
                id='name'
                name={FORM_FIELDS.NAME}
                value={form_state[FORM_FIELDS.NAME]}
                onChange={handleInputChange}
            />
            
            <input
                type="email"
                placeholder='Email'
                name={FORM_FIELDS.EMAIL}
                value={form_state[FORM_FIELDS.EMAIL]}
                onChange={handleInputChange}
            />
            <input
                type="password"
                placeholder='Password'
                name={FORM_FIELDS.PASSWORD}
                value={form_state[FORM_FIELDS.PASSWORD]}
                onChange={handleInputChange}
            />
            {
                !response
                ? <button type='submit'disabled={loading}>Registrarse</button>
                : <>        
                <button type='submit'disabled={true}>Registrarse</button>
                <p style={{color:'green'}}>{response.message}</p>
                </> 
            }
            {
                error && <p style={{color:'red'}}>Error: {error.message}</p>
            }
        </form>

    </div>
  )
}

export default RegisterScreen