import {Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"

import styled from "styled-components"
import logo from "../../assets/logo.png"

export default function RegisterScreen(){
    const navigate = useNavigate()
    const [body, setBody] = useState({
        email:"",
        name:"",
        image:"",
        password:""
    })
 
    function Sent(event){
        event.preventDefault()
       
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",body)
        promise.then(resposta => { 
            console.log(resposta)  
            navigate("/")}
           
        )
    }
       
  

 
    return (<>
    
         <Container>
                <img src={logo}></img>
                <h1>TrackIt</h1>
                <form onSubmit={Sent}>
                    <Inputs>
                        <input required type="email" onChange={(event) => setBody({...body, email:event.target.value})} placeholder='email'></input>
                        <input required type="password" onChange={(event) => setBody({...body, password:event.target.value})} placeholder='senha'></input>
                        <input required type="name" onChange={(event) => setBody({...body, name:event.target.value})} placeholder='name'></input>
                        <input required type="foto" onChange={(event) => setBody({...body, image:event.target.value})}placeholder='foto'></input>
                    </Inputs>
                    <button type="submit" >Cadastrar</button>
                </form>
              
               <Link to="/" >
               <p>Já tem uma conta? <sub>Faça login!</sub></p>
               </Link>
            </Container>
    </>)
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

h1{
    font-family:'Playball', 'sans-serif';
    font-size:70px;
    color:var(--azulEscuro)
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