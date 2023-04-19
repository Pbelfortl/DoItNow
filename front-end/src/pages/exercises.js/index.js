import Container from "@/components/container";
import { getExercises } from "@/services/TrainingApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";


export default function exercises () {

    const token = JSON.parse(localStorage.getItem("token"))
    const [muscles, setMuscles] = useState([])
    const [exercises, setExecises] = useState([])
    const router = useRouter()

    useEffect( () => {
        getExercises(token)
            .then(ans => {
                setMuscles(ans.musculatura)
                setExecises(ans.exercises)
                console.log(ans)
            })
            .catch(ans => {
                console.log(ans)
                alert(ans.response.data)
                router.push("/")
            })
    }, [])

    return (
        <Container>
            <MuscleFilter>
                <select>
                    {muscles && muscles.map((muscle) => (
                        <option key={muscle.id}>{muscle.name}</option>
                    ))}
                </select>
            </MuscleFilter>
            <ExercisesBox>
                    {exercises && exercises.map((exercise) => (
                        <div key={exercise.id}>
                            <span>{exercise.name}</span>
                            <iframe width="300" height="180" src={exercise.video} />
                        </div>
                        
                    ))}
            </ExercisesBox>
        </Container>
    )
}

const MuscleFilter = styled.div`
    width: inherit;
    height: 40px;
    border: solid black 1px;
`

const ExercisesBox = styled.div`
    width: 980px;
    height: 850px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    div{
        display: flex;
        width:  950px;
        max-height: 250px;
        border: solid lightgray 1px;}

`