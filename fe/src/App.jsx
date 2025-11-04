import "./index.css";
import LoginForm from "./components/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  // const [count, setCount] = useState(0);

  return (
   <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
