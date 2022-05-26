import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"
import UserContext from "../contexts/UserContext"
import Percentagem from "../contexts/Percentagem"

import "../assets/style/reset.css"
import "../assets/style/style.css"
import HabitsScreen from "./HabitsScreen";
import HistoryScreen from "./HistoryScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import TodayScreen from "./TodayScreen";
import TodayHabits from "../contexts/todayHabits";

export default function App(){
    const[ user, setUser] = useState("")
    const [percentagem, setPercentagem] = useState(0)
    const [todayHabits, setTodayHabits] = useState([])
    const [contador, setContador] = useState(1)

    return (
        <>
        <UserContext.Provider value={{user, setUser}}>
            <Percentagem.Provider value ={{percentagem, setPercentagem}}>
                <TodayHabits.Provider value ={{todayHabits, setTodayHabits}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/cadastro" element={<RegisterScreen />} />
                    <Route path="/habitos" element={<HabitsScreen contador={contador} />} />
                    <Route path="/today" element={<TodayScreen setContador={setContador} contador={contador} />}/>
                    <Route path="/history" element={<HistoryScreen />} />
                </Routes>
            </BrowserRouter>
            </TodayHabits.Provider>
            </Percentagem.Provider>
            </UserContext.Provider>
        </>

    )
}