
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard.jsx';
import EditorLayout from './layouts/Editorlayout.jsx';

function App() {


  return (
    <>
      <div className='min-h-screen '>

        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<EditorLayout />} />
          </Routes>
        </BrowserRouter>


      </div>
    </>
  )
}

export default App;
