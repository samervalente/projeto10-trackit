import { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"

export default function HabitsScreen({user}) {
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

    console.log(user)

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
   
    return (
        <>
            <Header>
                <h1>TrackIt</h1>
                <div>
                    <img src={user.image}/>

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

                        }}
                            placeholder='nome do hábito' />
                        <ul>
                            {days.map((dayArr, index) => {
                                return <Day onClick={() => choiceDay(index)} choice={dayArr.choice}>
                                    {dayArr.day}
                                </Day>
                            })}
                        </ul>
                        <div>
                            <span onClick={Create}>Cancelar</span>
                            <button>Salvar</button>
                        </div>
                    </CreateHabit>
                    <p>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </p>
                </div>
            </Container>

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

    ul{
        display:flex;
    }
`
const Day = styled.li`
            width:30px;
            height:30px;
            border:1px solid #D5D5D5;
            color:#DBDBDB;
            border-radius:5px;
            margin-right: 10px;
            display:flex;
            align-items:center;
            justify-content: center;
            background-color:${props => props.choice ? "var(--choiceDay)" : "white"};
            cursor:pointer;
   
   

`