import './App.css'
import Header from './Components/Header/Header';
import {Routes, Route} from 'react-router-dom';
import CategoryPage from './Containers/CategoryPage/CategoryPage';
import ReportsPage from './Containers/ReportsPage/ReportsPage';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={(
          <ReportsPage/>
        )}/>
        <Route path="/edit/:id" element={(
          <ReportsPage/>
        )}/>
        <Route path="/add-transaction" element={(
          <ReportsPage/>
        )}/>
        <Route path="/categories" element={(<CategoryPage/>)}/>
        <Route path="/categories/edit/:id" element={(<CategoryPage/>)}/>
        <Route path="*" element={(<h1 className="no-found">Not Found</h1>)}/>
      </Routes>
    </>
  )
}

export default App
