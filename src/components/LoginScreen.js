import {Link, useNavigate} from "react-router-dom"
import {useState, useContext} from "react"
import UserContext from "../contexts/UserContext";
import axios from "axios"



import React from 'react';
import styled from "styled-components";
import logo from "../assets/logo.png"

export default function LoginScreen() {
    const {setUser } = useContext(UserContext);

    const [body, setBody] = useState({
        email:"",
        password:""
    })
const navigate = useNavigate()

        
    function Login(event){
        event.preventDefault()
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",body)
        promise.then((resposta) => 
        {setUser(resposta.data)
            navigate("/habitos")
        }

            )
     
    }
      
    return (
        <>
            <Container>
                <img src={logo}></img>
                <h1>TrackIt</h1>
                <form onSubmit={Login}>
                    <Inputs>
                        <input required type="email" onChange={(event) => setBody({...body, email:event.target.value})} placeholder='email'></input>
                        <input required type="password" onChange={(event) => setBody({...body, password:event.target.value})} placeholder='senha'></input>
                    </Inputs>  
                    <button type="submit">Entrar</button>
                </form>
            
               <Link to="/cadastro" >
               <p>Não possui uma conta? <sub>Cadastre-se!</sub></p>
               </Link>
            </Container>
        </>
    )
}

const Container = styled.div`
width:70%;
height:auto;
margin: 20% auto;
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-between;



img{
    width:155px;
}



form{
      width:100%;
      
  } 

button{
        width:100%;
        height:45px;
      
    }

    p{
        color:var(--azulClaro);
        margin-top:20px;
    }
 
`;

const Inputs = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
        width:100%;

    input{
        width:100%;
        margin:5px 0px;
        height: 45px;
        border-radius:5px;
        padding-left:5px;
        border:1px solid #D4D4D4;
        font-family: 'Lexend Deca','sans-serif';
    }

`

