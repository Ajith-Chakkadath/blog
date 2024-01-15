
import './App.css';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import AllPost from './Pages/Post/AllPost';
import AddPost from './Pages/Post/addPost';
import Login from './Pages/Login';
import Register from './Pages/Register/register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<AllPost />} />
        <Route path='/' element={<AddPost />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
