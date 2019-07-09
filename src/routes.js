import Dashboard from "views/Dashboard/Dashboard";
import Jenisbiaya from 'views/Jenis_biaya/list_jenisbiaya';
import Pelanggan from 'views/Pelanggan/list_pelanggan';
import Pengeluaran from 'views/Pengeluaran/list_pengeluaran';
import Penjualan from 'views/Penjualan/list_penjualan';
import Petugas from 'views/Petugas Desain/list_petugasa';
import Supplier from 'views/Supplier/list_supplier';
import Tarif from 'views/Tarif_Jasa/list_tarif';
import Userlogin from 'views/user_login/list_user_login';
import Useraccess from 'views/user_access/list_user_access';


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
    group: 'Dashboard'
  },
  {
    path: "/pelanggan",
    name: "pelanggan",
    icon: "design_app",
    component: Pelanggan,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/supplier",
    name: "supplier",
    icon: "design_app",
    component: Supplier,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/tarifjasa",
    name: "Tarif Jasa",
    icon: "design_app",
    component: Tarif,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/jenisbiaya",
    name: "Jenis Biaya",
    icon: "design_app",
    component: Jenisbiaya,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/petugas",
    name: "Petugas Desain",
    icon: "design_app",
    component: Petugas,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/penjualan",
    name: "Penjualan",
    icon: "design_app",
    component: Penjualan,
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/pengeluaran",
    name: "Pengeluaran",
    icon: "design_app",
    component: Pengeluaran,
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/userlogin",
    name: "User Login",
    icon: "design_app",
    component: Userlogin,
    layout: "/admin",
    group: 'config'
  },
  {
    path: "/useraccess",
    name: "User Access",
    icon: "design_app",
    component: Useraccess,
    layout: "/admin",
    group: 'config'
  }
];
export default dashRoutes;

