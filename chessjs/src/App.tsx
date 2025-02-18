import { useState } from 'react'
import './App.css'
import Home from './pages/home';
import { HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
