import styled from "styled-components"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate } from "react-router-dom";
import Percentagem from "../../contexts/Percentagem";
import { useContext } from "react";

export default function Menu() {
    const navigate = useNavigate()

  
   
    return <>
        <Body>
            <Link to={"/habitos"}>
                <p>Hábitos</p>
            </Link>
           <Link to={"/today"} >
           <Circular>
                <CircularProgressbar onClick={() => navigate("/today")} value={JSON.parse(localStorage.getItem("Porcentagem"))} text="Hoje" styles={buildStyles({
                    pathColor: `white`,
                    trailColor: "#52B6FF",
                    textColor: 'white'
                })} />
            </Circular>
           </Link>

           <Link to={"/history"}>
           <p>Histórico</p>
           </Link>
        </Body>

    </>
}

const Body = styled.div`
width:100%;
height:70px;
position:fixed;
bottom:0;
left:0;
background-color: white;
color:var(--azulClaro);
display:flex;
justify-content:space-between;
align-items: center;
padding:0px 20px;

a{
    text-decoration: none;
}

p{
        color:var(--azulClaro);
        
    }

`

const Circular = styled.div`
padding:10px;
width:100px;
height:100px;
background-color:#52B6FF ;
border-radius:500px;
position: fixed;
left:40vw;
bottom:20px;
`
