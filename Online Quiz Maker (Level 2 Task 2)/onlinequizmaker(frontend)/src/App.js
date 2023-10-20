import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';

import HomePage from './pages/quiz/HomePage';
import NavBar from './components/common/NavBar';
import QuizTaking from './pages/quiz/QuizTaking';
import CreateQuiz from './pages/quiz/CreateQuiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <Routes>
          <Route element={<HomePage/>} path='/'/>
          <Route element={<QuizTaking/>} path='/takequiz/:id'/>
          <Route element={<CreateQuiz/>} path='/createquiz'/>
          <Route element={<HomePage/>} path='/leaderboard'/>
          <Route element={<HomePage/>} path='/login'/>
          <Route element={<HomePage/>} path='/register'/>


        </Routes>
      
      </header>
    </div>
  );
}

export default App;
