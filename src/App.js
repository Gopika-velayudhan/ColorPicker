
import './App.css';
import { Route,Routes } from 'react-router-dom';
import CreateTask from './components/header/Createtask';
import Task from './components/header/Task';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element = {<Task/>}/>   
        <Route path='/createtask' element={<CreateTask/>}/>
    
      </Routes>
      
    
    </div>
  );
}

export default App;

