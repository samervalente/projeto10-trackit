import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"
import UserContext from "../contexts/UserContext"
import Percentagem from "../contexts/Percentagem"

import "../assets/style/reset.css"
import "../assets/style/style.css"
import HabitsScreen from "./Screens/HabitsScreen";
import HistoryScreen from "./Screens/HistoryScreen";
import LoginScreen from "./Register/LoginScreen";
import RegisterScreen from "./Register/RegisterScreen";
import TodayScreen from "./Screens/TodayScreen";
import TodayHabits from "../contexts/todayHabits";
import HabitsDone from "../contexts/HabitsDone"

export default function App() {
    const [user, setUser] = useState("")
    let [percentagem, setPercentagem] = useState(0)
    const [todayHabits, setTodayHabits] = useState([])
    const [habitsDone, setHabitsDone] = useState(0)

    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <Percentagem.Provider value={{ percentagem, setPercentagem }}>
                    <TodayHabits.Provider value={{ todayHabits, setTodayHabits }}>
                        <HabitsDone.Provider value={{ habitsDone, setHabitsDone }}>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<LoginScreen />} />
                                    <Route path="/cadastro" element={<RegisterScreen />} />
                                    <Route path="/habitos" element={<HabitsScreen />} />
                                    <Route path="/today" element={<TodayScreen />} />
                                    <Route path="/history" element={<HistoryScreen />} />
                                </Routes>
                            </BrowserRouter>
                        </HabitsDone.Provider>
                    </TodayHabits.Provider>
                </Percentagem.Provider>
            </UserContext.Provider>
        </>

    )
}