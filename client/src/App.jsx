// eslint-disable-next-line no-unused-vars
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/about';
import SignIn from './pages/Signin';
import Header from './components/header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/about" element={<About/>} />
      <Route element = {<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>} />
      </Route>
    </Routes>
    </BrowserRouter>
) 
}
