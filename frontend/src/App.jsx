import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/> 
      </Routes>
    </>
  )
}

export default App;
