import GetMessages from "./components/GetMessages";
import HomePage from "./components/HomePage";
import { Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function App() {
    return (
        <div>
            <Navigation />
            <Link to="/posts?category=0">Posts</Link>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<GetMessages />} />
            </Routes>
        </div>
    );
}
