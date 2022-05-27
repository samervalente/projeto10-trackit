import { useEffect, useContext, useState } from "react"
import axios from "axios"
import UserContext from "../../contexts/UserContext";
import styled from "styled-components"
import Menu from "../layout/Menu";
import Percentagem from "../../contexts/Percentagem";
import TodayHabits from "../../contexts/todayHabits";

export default function TodayScreen({contador, setContador}) {

    const { user } = useContext(UserContext)
    const { todayHabits, setTodayHabits } = useContext(TodayHabits)
    const {percentagem, setPercentagem } = useContext(Percentagem)
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

     

    useEffect(() => {
        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

        promise.then(resposta => setTodayHabits([...resposta.data]))
    }, [])

    function Done(idHabit) {
        console.log(config)
        let promiseCheck = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabit}/check`, config)
        promiseCheck.then(resposta => console.log(resposta))

        let dones = todayHabits.map((object) => {
            if(object.id === idHabit){
                if(object.done === true){ 
                    setContador(contador-1)
                    return {...object, done:false}
                }
                setContador(contador+1)
                return {...object, done:true}
            }else{
                return {...object}
            }
        })
   setTodayHabits(dones)
 
    }
    setPercentagem((contador/todayHabits.length)*100)
    
    function HabitsToday() {
        return <>
            <ul>
                {todayHabits.map(object => {
                    return <HabitToday done={object.done} >
                        <div>
                            <h2>{object.name}</h2>
                            <p>Sequência atual: {object.currentSequence} dias</p>
                            <p>Seu recorde: {object.highestSequence} dias</p>
                        </div>
                        <ion-icon onClick={() => Done(object.id)} done={object.done} name="checkbox"></ion-icon>
                    </HabitToday>
                })}
            </ul>
        </>
    }

    return (
        <>
            <Header>
                <h1>TrackIt</h1>
                <div>
                    <img src={user.image} />
                </div>
            </Header>
            <Container>
                <Label>
                    <h3>Quinta, 25/05</h3>
                    {contador > 0? <p>{percentagem.toFixed(0)}% dos hábitos concluídos</p>: <p>Nenhum hábito concluido ainda</p>}
                </Label>
                <HabitsToday />
            </Container>
            <Menu />
        </>
    )
}

const Header = styled.div`
position:fixed;
top:0;
left:0;
width:100%;
background-color: var(--azulEscuro);
height:70px;
display: flex;
justify-content: space-between;
align-items: center;
padding:0px 20px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1{
        color:white;
        font-size:40px;
    }

    img{
        border-radius: 50%;
        width:50px;
        height:50px;
    }

`

const Container = styled.div`
background-color:  var(--body);
height:100vh;
 padding:85px 20px 0px 20px;
 margin-bottom:70px;
`

const Label = styled.div`
margin:15px 0px;
h3{
    color:var(--azulEscuro);
    font-size:23px;
}

p{
    font-size:18px;
    color:#BABABA;
}

`

const HabitToday = styled.ul`
background-color: white;
border-radius: 5px;
display:flex;
justify-content: space-between;
align-items: center;
height:95px;
padding: 0px 10px;

div{
    h2{
        color:#666666;
        font-size:20px;
        margin-bottom:10px
    }

    p{
        font-size: 12px;
        color:#666666;
        margin:3px 0px;
    }
}

ion-icon{
    color:${props => props.done ? "var(--VerdeLimão)": "#E7E7E7"};
    width:70px;
    height:70px;
    border-radius: 5px;
}
`