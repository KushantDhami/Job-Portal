import Navbar from './components/shared/Navbar.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/auth/Login.jsx'
import Singup from './components/auth/Singup.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'
import AppliedJobsTable from './components/AppliedJobsTable.jsx'
import JobDescription from './components/JobDescription.jsx'
import "./index.css";
import "./app.css"
import Companies from './components/admin/Companies.jsx'
import CompanyCreate from './components/admin/CompanyCreate.jsx'
import CompanySetup from './components/admin/CompanySetup.jsx'
import AdminJobs from './components/admin/AdminJobs.jsx'
import PostJob from './components/admin/PostJob.jsx'
import Applicants from './components/admin/Applicants.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/singup",
    element:<Singup/>
  },
  {
     path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
// admin Parentheses
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs/",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
