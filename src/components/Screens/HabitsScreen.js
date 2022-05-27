import { useState, useEffect, useContext } from "react"
import axios from "axios"
import styled from "styled-components"
import Menu from "../layout/Menu"
import UserContext from "../../contexts/UserContext";
import Percentagem from "../../contexts/Percentagem";
import TodayHabits from "../../contexts/todayHabits";

export default function HabitsScreen({contador}) {
    const data = [{ day: "D" }, { day: "S" }, { day: "T" }, { day: "Q" }, { day: "Q" }, { day: "S" }, { day: "S" }]
    let arrayDays = data.map(day => {
        return { ...day, choice: false }
    })
    const [create, setCreate] = useState(false)
    const [days, setDays] = useState(arrayDays)
    const [habit, setHabit] = useState({
        name: "",
        days: []
    })
    const [habits, setHabits] = useState([])
    const {user} = useContext(UserContext)
    const {percentagem, setPercentagem} = useContext(Percentagem)
    const {todayHabits, setTodayHabits } = useContext(TodayHabits)

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise.then(resposta => setHabits([...resposta.data]))
    }, [])


    function Create() {
        setCreate(!create)
    }

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

     let promisePost =   axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habit, config)
     promisePost.then(resposta => console.log(resposta))
     
        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
        promise.then(resposta => {

            
        let attList = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config)
         attList.then(resposta => {
            setTodayHabits([...resposta.data])
            console.log(todayHabits)
        })

            setHabits([...resposta.data])
            setPercentagem((contador/todayHabits.length)*100)
           
        })
    }

   function DeleteHabit(id){ 
       let bool = window.confirm("Você deseja excluir esse hábito?")

       if(bool){
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config)
       }

     let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
     promise.then(resposta => setHabits([...resposta.data]))
   }
    
 
   function DisplayHabits(){
    let arrHabits = habits.map(object => {
      return <div>
            <p>{object.name}</p>
            <ListDays>
                {days.map((day,index) => {
                    let selected = false;
                    for(let i = 0; i < object.days.length; i ++){
                        if(object.days[i] === index){
                            selected = true;
                        }
                    }
                    return <Day choice={selected}>{day.day}</Day> 
                })}
                <ion-icon onClick={() => DeleteHabit(object.id)} name="trash-outline"></ion-icon>
            </ListDays>
        </div>

    })

    return (
        <>
            {arrHabits}
        </>
    )
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
                <div className="MyHabits"><h4>Meus Hábitos</h4>
                    <button onClick={Create} >+</button>
                </div>
                <div>
                    <CreateHabit create={create}>
                        <input required type="name" onChange={(event) => {
                            setHabit({ ...habit, name: event.target.value })
                        } } value={habit.name}
                            placeholder='nome do hábito' />
                        <ListDays>
                            {days.map((dayArr, index) => {
                                return <Day onClick={() => choiceDay(index)} choice={dayArr.choice}>
                                    {dayArr.day}
                                </Day>
                            })}
                        </ListDays>
                        <div>
                            <span onClick={Create}>Cancelar</span>
                            <button onClick={Save}>Salvar</button>
                        </div>
                    </CreateHabit>
                   {habits.length === 0? "Carregando...": <DisplayHabits />}
                </div>
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

 padding:85px 20px 0px 20px;
 margin-bottom:70px;

    .MyHabits{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        button{
            width:40px;
            height:35px;
        }

        h4{
            color:var(--azulEscuro);
            font-size:22px;
        }

        p{

        }
    }
`

const CreateHabit = styled.div`
height:180px;
width:340px;
background-color: white;
display:${props => props.create ? "flex" : "none"};
flex-direction: column;
align-items:center;
justify-content: center;

  
`
const ListDays = styled.ul`
        display:flex;
`



const Day = styled.li`
            width:30px;
            height:30px;
            border:1px solid #D5D5D5;
            color:${props => props.choice? "white" : "#DBDBDB"};
            border-radius:5px;
            margin-right: 10px;
            display:flex;
            align-items:center;
            justify-content: center;
            background-color:${props => props.choice ? "var(--choiceDay)" : "white"};
            cursor:pointer;
`