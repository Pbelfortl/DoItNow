import api from "./api"


export async function getTraining (token) {
    const response = await api.get("/training", {headers: {Authorization: `Bearer ${token}`}})
    return response.data
}

export async function getExercises (token) {
    const response = await api.get("/exercises", {headers: {Authorization: `Bearer ${token}`}})
    return response.data
}

export async function postDivision (token, divisaoId){
    const response = await api.post("/training", {divisaoId:divisaoId},{headers: {Authorization: `Bearer ${token}`}})
    return response.data
} 

export async function postGroups (token, divisaoId, groups) {
    const response = await api.post("/groups", {divisaoId:divisaoId, groups: groups}, {headers: {Authorization: `Bearer ${token}`}})
}
