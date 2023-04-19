import Container from "@/components/container"
import { useEffect, useState } from "react"
import { getExercises, postDivision, postGroups } from "@/services/TrainingApi"
import { useRouter } from "next/router"
import styled from "styled-components"
import { handleJwtError } from "@/errors/handleJwtError"
import useToken from "@/hooks/useToken"

export default function newTraining() {

    const token = (typeof window !== undefined) ? JSON.parse(window.localStorage.getItem("token")) : null
    const [exercises, setExercises] = useState()
    const [divisoes, setDivisoes] = useState()
    const [divisao, setDivisao] = useState()
    const [groups, setGroups] = useState()
    let training
    const router = useRouter()


    useEffect(() => {
        getExercises(token)
            .then((ans) => {
                setExercises(ans.exercises)
                setDivisoes(ans.divisao)
            })
            .catch((ans) => {
                alert(ans.response.data)
                router.push("/")
            })
    }, [])

    function createGroups (divName) {
       
        const groupsArr = []
        console.log(divisoes[groupsArr.length])
        while (groupsArr.length < divName.length) {
            (divisoes[groupsArr.length]?.name === divName) && setDivisao(divisoes[groupsArr.length])
            groupsArr.push(
                {
                    day: divName[groupsArr.length],
                    exercicio1: null,
                    exercicio2: null,
                    exercicio3: null,
                    exercicio4: null,
                    exercicio5: null,
                    exercicio6: null,
                    exercicio7: null,
                }
            )
        }
        setGroups(groupsArr)
    }

    async function postTraining (event) {
        event.preventDefault()
        console.log(divisao)
        try {

            const training = await postGroups(token, divisao.id, groups)
            training && router.push("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Container>
            <DivisionBox>
                {divisoes &&
                    <div>
                        <span>Escolha a divisão do treino!</span>
                        <select onClick={(e) => {createGroups(e.target.value)}}>
                            {divisoes.map((divs) => (
                                <option key={divs.id} value={divs.name}>{divs.name}</option>
                            ))}
                        </select>
                        {divisao && <span>{divisao.description}</span>}
                    </div>
                }
            </DivisionBox>
            <GroupsBox>
                {divisao && <span>Escolha pelo menos 4 exercícios por grupo</span>}
                {groups &&
                    groups.map((group) => (
                        <form onSubmit={event => postTraining(event)} id="training" key={group.id}>
                            <span>Treino {group.day}<br/></span>
                            <select required onClick={(e) => {group.exercicio1 = Number(e.target.value)}}>
                                <option />
                                {exercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                            <select required onClick={(e) => {group.exercicio2 = Number(e.target.value)}}>
                                <option />
                                {exercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                            <select required onClick={(e) => {group.exercicio3 = Number(e.target.value)}}>
                                <option />
                                {exercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                            <select required onClick={(e) => {group.exercicio4 = Number(e.target.value)}}>
                                <option />
                                {exercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                            <select onClick={(e) => {group.exercicio5 = Number(e.target.value)}}>
                                <option />
                                {exercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                            <select onClick={(e) => {group.exercicio6 = Number(e.target.value)}}>
                                <option />
                                {exercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                            <select onClick={(e) => {group.exercicio7 = Number(e.target.value)}}>
                                <option />
                                {exercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                ))}
                            </select>
                        </form>
                    ))
                }
                <button type="submit" form="training">Cadastrar treino</button>
            </GroupsBox>
        </Container>

    )
}

const DivisionBox = styled.div`
    width: inherit;
    height: 40px;
    border: solid black 1px;
`

const GroupsBox = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 800px;
    width: 950px;
    overflow-y: scroll;
    border: solid lightgray 1px;
    form{
        width: 300px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    button{
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
`