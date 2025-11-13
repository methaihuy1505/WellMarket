import "./index.css";
import Test from "./components/Login/Test"
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0);

  return (
  
    <Router>
        <Routes>
          <Route path="/" element={<Header/>}></Route>
          <Route path="/" element={<Test/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
