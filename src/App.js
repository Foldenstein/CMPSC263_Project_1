import Navbar from "./Navbar";
import Home from "./pages/HomePage";
import Contact from "./pages/ContactPage";
import User from "./pages/UserPage";
import Review from "./pages/ReviewPage";
import { Route, Routes } from 'react-router-dom'; 

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/user" element={<User />} />
                    
                </Routes>
            </div>
            
        </>
    )

}

export default App;