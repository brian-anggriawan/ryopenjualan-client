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
import satuan from 'views/satuan/list_satuan';
import kategori from 'views/kategori_produk/list_kategoriproduk';
import Setupkasir from 'views/Setup_kasir/list_kasir';
import Userlevel from 'views/user_level/list_user_level';


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
    icon: "business_badge",
    component: Pelanggan,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/supplier",
    name: "supplier",
    icon: "emoticons_satisfied",
    component: Supplier,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/satuan",
    name: "Satuan",
    icon: "design-2_ruler-pencil",
    component: satuan,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/kategoriproduk",
    name: "Kategori Produk",
    icon: "shopping_tag-content",
    component: kategori,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/hargaproduk",
    name: "Harga Produk",
    icon: "business_money-coins",
    component: Tarif,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/jenisbiaya",
    name: "Jenis Biaya",
    icon: "files_paper",
    component: Jenisbiaya,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/petugas",
    name: "Petugas Desain",
    icon: "users_circle-08",
    component: Petugas,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/setupkasir",
    name: "Setup Kasir",
    icon: "tech_laptop",
    component: Setupkasir,
    layout: "/admin",
    group: 'setup'
  },
  {
    path: "/penjualan",
    name: "Penjualan",
    icon: "shopping_box",
    component: Penjualan,
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/pengeluaran",
    name: "Pengeluaran",
    icon: "shopping_cart-simple",
    component: Pengeluaran,
    layout: "/admin",
    group: 'transaksi'
  },
  {
    path: "/userlogin",
    name: "User Login",
    icon: "users_single-02",
    component: Userlogin,
    layout: "/admin",
    group: 'config'
  },
  {
    path: "/userlevel",
    name: "User Level",
    icon: "design_bullet-list-67",
    component: Userlevel,
    layout: "/admin",
    group: 'config'
  },
  {
    path: "/useraccess",
    name: "User Access",
    icon: "sport_user-run",
    component: Useraccess,
    layout: "/admin",
    group: 'config'
  }
];
export default dashRoutes;

