import Dashboard from "views/Dashboard";
import Test from 'views/test';


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/test",
    name: "Tests",
    icon: "design_app",
    component: Test,
    layout: "/admin"
  }
];
export default dashRoutes;

