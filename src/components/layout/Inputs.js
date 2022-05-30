import styled from "styled-components"

export default function ({placeholder, type, onChange}){
    return <>
        <Input placeholder={placeholder} onChange={onChange} type={type}/>
    </>
}

const Input = styled.input`
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #D5D5D5;
    width:300px;
    height:45px;
    font-family: 'Lexend Deca';
    margin:3px 0px;
    padding-left:5px;
`