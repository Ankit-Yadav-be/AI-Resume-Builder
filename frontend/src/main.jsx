import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from './auth/signIn/SignInPage.jsx';
import Home from './home/Home.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
import { ClerkProvider } from "@clerk/clerk-react"
import EditUserResume from './dashboard/components/resume/[resumeId]/EditUserResume.jsx';
import ViewResume from './myresume/[resumeId]/view/ViewResume';
import { ResumeProvider } from './context/ResumeContext';



const router = createBrowserRouter([
  {

    element: <App />,
    children: [

      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditUserResume />
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path:'/myresume/:resumeId/view',
    element:<ViewResume/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

  
   <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
      <ResumeProvider>
      <RouterProvider router={router} />
      </ResumeProvider>
    </ClerkProvider>
 



  </StrictMode>,
)


