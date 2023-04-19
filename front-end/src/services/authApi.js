import api from './api'

export async function signIn (body) {
    const response = await api.post('/signin', body)
    
    return response.data
}