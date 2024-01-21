import GetMessages from "./components/GetMessages";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddMessage from "./components/AddMessage";
import LoginPage from "./components/LoginPage";
import { useState } from "react";

export default function App() {
    const [user_id, setUser_id] = useState(0);
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/posts"
                    element={<GetMessages user_id={user_id} />}
                />
                <Route
                    path="/addPost"
                    element={<AddMessage user_id={user_id} />}
                />
                <Route
                    path="/loginPage"
                    element={<LoginPage getUser={getUser} user_id={user_id} />}
                />
            </Routes>
        </div>
    );
    function getUser(id) {
        setUser_id(id);
    }
}
