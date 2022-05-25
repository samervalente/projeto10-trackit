import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"

import "../assets/style/reset.css"
import "../assets/style/style.css"
import HabitsScreen from "./HabitsScreen";
import HistoryScreen from "./HistoryScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import TodayScreen from "./TodayScreen";

export default function App(){
    const[ user, setUser] = useState("")

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen setUser={setUser} />} />
                    <Route path="/cadastro" element={<RegisterScreen />} />
                    <Route path="/habitos" element={<HabitsScreen user={user} />} />
                    <Route path="/today" element={<TodayScreen />}/>
                    <Route path="/history" element={<HistoryScreen />} />
                </Routes>
            </BrowserRouter>
        </>

    )
}