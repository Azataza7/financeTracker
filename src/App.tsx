import './App.css'
import Header from './Components/Header/Header';
import {Routes, Route} from 'react-router-dom';
import CategoryList from './Components/Category/CategoryList';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/categories" element={(<CategoryList/>)}/>
        <Route path="*" element={(<h1 className="no-found">Not Found</h1>)}/>
      </Routes>
    </>
  )
}

export default App
