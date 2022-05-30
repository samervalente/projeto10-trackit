import { useState, useEffect, useContext } from "react"
import { ThreeDots } from "react-loader-spinner";
import axios from "axios"
import styled from "styled-components"

import UserContext from "../../contexts/UserContext";
import TodayHabit from "../../contexts/todayHabits"

import Menu from "../layout/Menu"
import Input from "../layout/Inputs"
import Habits from "../layout/Habit";
import HabitsDone from "../../contexts/HabitsDone"
import TodayHabits from "../../contexts/todayHabits";

export default function HabitsScreen() {
    const data = [{ day: "D" }, { day: "S" }, { day: "T" }, { day: "Q" }, { day: "Q" }, { day: "S" }, { day: "S" }]
    let arrayDays = data.map(day => {
        return { ...day, choice: false }
    })
    const [days, setDays] = useState(arrayDays)
    const [create, setCreate] = useState(false)
    const [habit, setHabit] = useState({
        name: "",
        days: []
    })
    const [created, setCreated] = useState(false)
    const [habits, setHabits] = useState([])
    const { user } = useContext(UserContext)
    const { todayHabits, setTodayHabits } = useContext(TodayHabits)
    let { habitsDone } = useContext(HabitsDone)

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise.then(resposta => setHabits([...resposta.data]))
    }, [])

    function choiceDay(num) {
        let Choices = days.map((dayArr, index) => {
            if (num === index) {
                if (dayArr.choice === true) {
                    setHabit({ ...habit, days: habit.days.filter((numArr) => numArr !== num) })
                    return { ...dayArr, choice: false }
                } else {
                    setHabit({ ...habit, days: [...habit.days, num] })
                    return { ...dayArr, choice: true }
                }
            } else {
                return { ...dayArr }
            }
        })
        setDays(Choices)
    }

    function Save() {
        setCreated(true)

        if (habit.days.length === 0) {
            alert("Selecione ao menos um dia")
            setCreated(false)
        } else {
            const promiseCreate = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, habit, config)
            promiseCreate
                .then(
                    () => {
                        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
                        promise.then(resposta => {
                            setHabits([...resposta.data])
                            setCreated(false)
                        })

                        const AttPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
                        AttPromise.then(resposta => setTodayHabits([...resposta.data]))
                        
                        if(JSON.parse(localStorage.getItem("Porcentagem")) !== null ){
                            let sum = todayHabits.length + 1
                            localStorage.setItem("Porcentagem", JSON.stringify((habitsDone / (sum)) * 100))
                        }

                    }
                )
                .catch(err => {
                    if (err.response.status === 422) {
                        alert(`O campo "Nome do hábito" não pode estar em branco`)
                        setCreated(false)
                    }
                })
        }

    }

    function DeleteHabit(id) {
        let bool = window.confirm("Você deseja excluir esse hábito?")

        if (bool) {
            const promiseDelete = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
            promiseDelete.then(() => {
                const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
                promise.then(resposta => {
                    setHabits([...resposta.data])
                })

                const AttPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
                        AttPromise.then(resposta => setTodayHabits([...resposta.data]))
                        let sum = todayHabits.length - 1
                        localStorage.setItem("Porcentagem", JSON.stringify(((habitsDone / (sum))/2) * 100))
            })
        }
    }


    function HabitsCreated() {
        let arrHabits = habits.map((object, index) => {
            return <CreatedHabits key={index}>
                <p>{object.name}</p>
                <ListDays>
                    {days.map((day, index) => {
                        let selected = false;
                        for (let i = 0; i < object.days.length; i++) {
                            if (object.days[i] === index) {
                                selected = true;
                            }
                        }
                        return <Day choice={selected}>{day.day}</Day>
                    })}
                    <ion-icon onClick={() => DeleteHabit(object.id)} name="trash-outline"></ion-icon>
                </ListDays>
            </CreatedHabits>

        })

        return (
            <>
                {arrHabits}
            </>
        )
    }

    return (
        <> <MainSection>
            <Header>
                <div>
                <h1>TrackIt</h1>
                    <img src={user.image} />
                </div>
               
            </Header>
           
            <Container>
                <MyHabits className="MyHabits"><h4>Meus Hábitos</h4>
                    <button onClick={() => setCreate(!create)} type="submit" >+</button>
                </MyHabits>
                <Habits create={create} height={"180px"}>
                    <Input required type="name" onChange={(event) => {
                        setHabit({ ...habit, name: event.target.value })
                    }} value={habit.name}
                        placeholder='nome do hábito' />
                    <ListDays>
                        {days.map((dayArr, index) => {
                            return <Day key={index} onClick={() => choiceDay(index)} choice={dayArr.choice}>
                                {dayArr.day}
                            </Day>
                        })}
                    </ListDays>
                    <div>
                        <span onClick={() => setCreate(!create)}>Cancelar</span>
                        {created ? <button type="submit"><ThreeDots color="white" heigh={14} ></ThreeDots></button> : <button onClick={Save} type="submit" >Salvar</button>}
                    </div>
                </Habits>
               <CreatedHabitsContainer>
               {habits.length === 0 ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> : <HabitsCreated />}
               </CreatedHabitsContainer>
            </Container>
            <Menu />
            </MainSection>
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
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
display:flex;
align-items:center;
padding:0px 20px;

    h1{
        color:white;
        font-size:40px;
    }

    img{
        border-radius: 50%;
        width:50px;
        height:50px;
    }
    div{
    display: flex;
    justify-content: space-between; 
    align-items: center;
    width:90%;
    }

`

const ListDays = styled.ul`
display:flex;
margin:5px 0px;
`
const MainSection = styled.body`
  background-color:  var(--body);
  height:100vh;
`
  

const Container = styled.div`
 padding:85px 20px 0px 20px;
 margin-bottom:70px;
 height:100vh;

  

    p{
       color:var(--PretoClaro);
        }
`
const MyHabits = styled.div`
    display:flex;
    width:90%;

    justify-content: space-between;
    align-items: center;
   
  

    button{
        width:40px;
        height:35px;
        cursor:pointer;
    }

    h4{
        color:var(--azulEscuro);
        font-size:22px;
    }


`

const Day = styled.li`
            width:30px;
            height:30px;
            border:1px solid #D5D5D5;
            color:${props => props.choice ? "white" : "#DBDBDB"};
            border-radius:5px;
            margin-right: 10px;
            display:flex;
            align-items:center;
            justify-content: center;
            background-color:${props => props.choice ? "var(--choiceDay)" : "white"};
            cursor:pointer;
`

const CreatedHabitsContainer = styled.div`
    margin-top:40px;
    height: 300px;
    overflow-y:scroll;
    width:90%;
  
    &::-webkit-scrollbar{/* Hide scrollbar for Chrome, Safari and Opera */
        display:none;
    }
    &{/* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none;  
         scrollbar-width: none;  
    }

  
`

const CreatedHabits = styled.div`
height:90px;
width:100%;
background-color: white;
display:flex;
flex-direction: column;
padding-left:15px;
justify-content: center;
border-radius: 5px;
margin:15px 0px;
position:relative;

ion-icon{
    cursor:pointer;
    position:absolute;
    top:5px;
    right:10px;
    
}
`