import styled from "styled-components"
import { useRouter } from "next/router"

export default function TopBar () {
    
    const router = useRouter()

    return (
        <Bar>
            <div onClick={() => router.push("/home")}></div>
            <div onClick={() => router.push("/newTraining")}></div>
            <div onClick={() => router.push("/exercises")}></div>
        </Bar>
    )
}

const Bar = styled.div`
    display: flex;
    width: 1000px;
    height: 50px;
    background-color: blue;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 5px;
    div{
        height: 45px;
        width: 295px;
        background-color: lightblue;
        :hover{
            cursor: pointer;
        }
        border-radius: inherit;
    }
`