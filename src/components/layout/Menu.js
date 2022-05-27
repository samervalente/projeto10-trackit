import styled from "styled-components"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import Percentagem from "../../contexts/Percentagem";
 
export default function Menu() {
    const {percentagem} = useContext(Percentagem)

    return <>
        <Body>
            <Link to={"/habitos"}>
                <p>Hábitos</p>
            </Link>
           <Link to={"/today"} >
           <Circular>
                <CircularProgressbar value={percentagem} text="Hoje" styles={buildStyles({
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
