import './App.css'
import Header from './Components/Header/Header';
import {Routes, Route} from 'react-router-dom';
import CategoryPage from './Containers/CategoryPage/CategoryPage';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/categories" element={(<CategoryPage/>)}/>
        <Route path="*" element={(<h1 className="no-found">Not Found</h1>)}/>
      </Routes>
    </>
  )
}

export default App
