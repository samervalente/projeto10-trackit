import styled from "styled-components"


export default function Habits({ create, height, children}) {
    return (
        <>
            <Habit create={create} height={height}  >
                {children}
            </Habit>
        </>
    )
}

const Habit = styled.div`
height:${props => props.height};
width:340px;
background-color: white;
display:${props => props.create ? "flex" : "none"};
flex-direction: column;
padding-left:15px;
justify-content: center;
border-radius: 5px;
margin:30px 0px;


div{

    display: flex;
    justify-content:flex-end;
    align-items: center;
    margin:30px 25px 0px 0px ;
  

    span{
        margin-right:15px;
        color:var(--azulClaro);
        cursor:pointer;
    }

    button{
        cursor:pointer;
        height:35px;
        width:84px;
        display: flex;
        align-items:center;
        justify-content: center;
    }
}
`