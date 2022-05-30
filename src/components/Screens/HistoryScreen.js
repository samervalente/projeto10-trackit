import axios from "axios"
import { useEffect, useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import styled from "styled-components"
import Habits from "../layout/Habit";
import Menu from "../layout/Menu"

export default function HistoryScreen(){
    const {user} = useContext(UserContext)
    const [history, setHistory] = useState([])

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",config)
        promise.then(
            resposta => {
                setHistory([...resposta.data])
            }
        )

    }, [])

        let historys = history.map(day => {
            return <History create={true} height={"180px"}>
                    <h2>Data: {day.day}</h2>
                    {day.habits.map(habit => {
                        return <div>
                            
                            <h3>Hábito: {habit.name}</h3>
                            <p>Dia da semana: {habit.weekDay}</p>
                            <span>Concluído? {habit.done ? <Done done={true}>Sim</Done>:<Done done={false}>Não</Done> }</span>
                            </div>     
                    })   
                    }
            </History>
        })
    
    return (
        <>
        <Container>
            {historys}
        </Container>
        <Menu />
        </>
    )
}
const History = styled.div`
background-color: white;
border: 2px dotted var(--azulClaro);
margin:15px 0px;
border-radius: 5px;

h2{
        font-weight: bold;
        color:var(--azulEscuro);
        font-size:22px;
    }

div{
    background-color: var(--white);
    margin:15px 0px;

    

    h3{
        font-weight: bold;
        color:var(--azulClaro);
        margin-bottom:10px;
    }
    p{
        margin: 5px 0px;
    }
}
`

const Done = styled.span`
color:${props => props.done? "var(--VerdeLimão)": "red"};
`

const Container = styled.div`
background-color:  var(--body);
height:100vh;
 padding:85px 20px 0px 20px;
 margin-bottom:130px;
`
