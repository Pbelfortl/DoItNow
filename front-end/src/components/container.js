import styled from "styled-components"
import TopBar from "./topBar"


export default function Container ({children}) {


    return (
        <ConntainerBox>
            <TopBar/>
            {children}
        </ConntainerBox>
    )
}

const ConntainerBox = styled.div`
    width: 1024px;
    height: 940px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border: solid lightgray 1px;
    border-radius: 10px;
    padding: 10px;
`