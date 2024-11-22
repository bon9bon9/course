import Layout from './components/layout/Layout';
import Error from './components/common/Error'
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeInfo } from './router';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient';


const router = createBrowserRouter(routeInfo.map((route) => (
  {
    ...route,
    element : <Layout>{route.element}</Layout>,
    errorElement : <Layout><Error/></Layout>
  }
)))

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
          <RouterProvider router={router}/>
      </BookStoreThemeProvider>
    </QueryClientProvider>
    
  );
}

export default App;
