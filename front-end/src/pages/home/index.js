import Container from "@/components/container"
import { useEffect, useState } from "react"
import { getTraining } from "@/services/TrainingApi"
import styled from "styled-components"
import { useRouter } from "next/router"

export default function Home () {

    const token = (typeof window !== undefined) ? JSON.parse(window.localStorage.getItem("token")) : null
    const [trainings, setTrainings] = useState()
    const [groups, setGroups] = useState()
    const router = useRouter()

    useEffect(()=> {
        getTraining(token)
            .then((ans) => {
                console.log(ans)
                setTrainings(ans.training)
                setGroups(ans.groups)
            })
            .catch(ans => {
                (ans.response.data === "jwt expired") && router.push("/")
                console.log(ans)
            })
    },[])

    return (
        <Container>
            
                {trainings &&
                    trainings.map(trn => (
                        <TrainingBox>
                            <span>{trn.divisao.name}</span>
                            {groups.map((grp) => (
                                
                                
                                (grp.treinoId === trn.id) ? 
                                <div>
                                    <span>{grp.day}</span>
                                    <span>{grp.exercicio_grupo_exercicio1Toexercicio.name}</span>
                                    <span>{grp.exercicio_grupo_exercicio2Toexercicio.name}</span>
                                    <span>{grp.exercicio_grupo_exercicio3Toexercicio.name}</span>
                                    <span>{grp.exercicio_grupo_exercicio4Toexercicio.name}</span>
                                    <span>{grp.exercicio_grupo_exercicio5Toexercicio?.name}</span>
                                    <span>{grp.exercicio_grupo_exercicio6Toexercicio?.name}</span>
                                    <span>{grp.exercicio_grupo_exercicio7Toexercicio?.name}</span>
                                </div>
                                
                                : <></>
                                
                            ))}
                        </TrainingBox>
                    ))
                }
            
        </Container>
    )
}

const TrainingBox = styled.div`
    display: flex;
    justify-content:space-around;
    margin-top: 10px;
    width: 850px;
    height: 200px;
    background-color: wheat;
    div{
        display: flex;
        flex-direction: column;
        background-color: aqua;
    }
`