import Home from './pages/Home';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderList from './pages/OrderList';

export const routeInfo = [
  {
    path : '/',
    element : <Home/>,
  },
  {
    path: "/signup",
    element : <Signup/>
  },
  {
    path : "/reset",
    element : <ResetPassword/>
  },
  {
    path : "/login",
    element : <Login/>
  },
  {
    path : "/books",
    element : <Books/>
  },
  {
    path : "/books/:bookId",
    element : <BookDetail/>
  },
  {
    path : "/cart",
    element : <Cart/>
  },
  {
    path : "/order",
    element : <Order/>
  },
  {
    path : "/orderlist",
    element : <OrderList/>
  }
]