import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Error from './components/common/Error'
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout><Home/></Layout>,
    errorElement : <Layout><Error/></Layout>
  },
  {
    path: "/signup",
    element : (
      <Layout>
        <Signup/>
      </Layout>
    )
  },
  {
    path : "/reset",
    element : (
      <Layout>
        <ResetPassword/>
      </Layout>
    )
  },
  {
    path : "/login",
    element : (
      <Layout>
        <Login/>
      </Layout>
    )
  },
  {
    path : "/books",
    element : (
      <Layout>
        <Books/>
      </Layout>
    )
  },
  {
    path : "/books/:bookId",
    element : (
      <Layout>
        <BookDetail/>
      </Layout>
    )
  }
])

function App() {
  return (
    <BookStoreThemeProvider>
        <RouterProvider router={router}/>
    </BookStoreThemeProvider>
    
  );
}

export default App;
