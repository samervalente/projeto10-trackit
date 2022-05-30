import { useEffect, useContext, useState } from "react"
import axios from "axios"
import UserContext from "../../contexts/UserContext";
import styled from "styled-components"
import Menu from "../layout/Menu";
import Percentagem from "../../contexts/Percentagem";
import TodayHabits from "../../contexts/todayHabits";
import HabitsDone from "../../contexts/HabitsDone"

export default function TodayScreen() {
    const dayjs = require('dayjs')
    var updateLocale = require('dayjs/plugin/updateLocale')
    dayjs.extend(updateLocale)
    
    var weekday = require('dayjs/plugin/weekday')
    dayjs.extend(weekday)

   let days =  dayjs.updateLocale('en', {
        weekdays: [
            "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
          ]
    })

    let weekDay = days.weekdays[dayjs().weekday()]
    let date = dayjs(`${dayjs().month()+1}-${dayjs().date()}`).format('DD/MM')
  
    const { user } = useContext(UserContext)
    const { todayHabits, setTodayHabits } = useContext(TodayHabits)
    const { setHabitsDone} = useContext(HabitsDone)
  
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
   const body = {}
    useEffect(() => {
        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

        promise.then(resposta => setTodayHabits([...resposta.data]))

    }, [])

    localStorage.setItem("User",JSON.stringify(user))

    function Done(idHabit) {
      let dones =  todayHabits.map((object) => {
            if(object.id === idHabit){
                
                if(object.done === true){ 
                    axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabit}/uncheck`,body, config)
                    return {...object, done:false}
                }
                
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabit}/check`,body, config)
                return {...object, done:true}
            }else{
                return {...object}
            }
        })

        //Armazenando a quantidade de hábitos marcados como "feitos" no local storage 
        let JustDones = dones.filter(object => object.done === true)

        setTodayHabits(dones)
        setHabitsDone(JustDones.length)
        localStorage.setItem("Porcentagem", JSON.stringify((JustDones.length/todayHabits.length)*100))
           
    }

    function HabitsToday() {
        return <>
            <ul>
                {todayHabits.map((object) => {
                    return <HabitToday done={object.done} >
                        <div>
                            <h2>{object.name}</h2>
                            <p>Sequência atual: 
                                <Em record={object.currentSequence >= object.highestSequence && object.currentSequence > 0 ? "record": null}> {object.currentSequence} {object.currentSequence === 1 ? "dia": "dias"}</Em> </p>


                            <p>Seu recorde: <Em record={object.currentSequence <= object.highestSequence && object.currentSequence > 0 ? "record": null}  >{object.highestSequence} {object.highestSequence === 1 ? "dia": "dias"}</Em> </p>
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
                    <h3>{weekDay}, {date}</h3>
                    { JSON.parse(localStorage.getItem("Porcentagem"))   > 0? 
                    <DonePercentage count={"done"}>
                        {JSON.parse(localStorage.getItem("Porcentagem")).toFixed(0)}% dos hábitos concluídos
                        </DonePercentage>: 
                    <DonePercentage count={null}>
                        Nenhum hábito concluido ainda
                    </DonePercentage>}
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
    cursor:pointer;
}
`

const Em = styled.em`
    color:${props => props.record === "record"? "var(--VerdeLimão)": "var(--PretoClaro)"};
`
const DonePercentage = styled.p`
 color:${props => props.count === "done"? "var(--VerdeLimão)": "var(--PretoClaro)"}
`
   

