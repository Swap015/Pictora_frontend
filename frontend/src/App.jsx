
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from './pages/Dashboard.jsx';
import EditorLayout from './layouts/Editorlayout.jsx';
import NewwPage from './pages/NewwPage.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

function App() {


  return (
    <>
      <div className='min-h-screen '>

        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<EditorLayout />} />
            <Route path="/page" element={<NewwPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>


          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            draggable
            theme="light"
            transition={Bounce}
            toastClassName="custom-toast"
            bodyClassName="custom-toast-body"
            progressClassName="custom-progress"
          />
        </BrowserRouter>


      </div>
    </>
  )
}

export default App;
