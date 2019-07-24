let Menu = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "design_app",
      component: 'Auth(Dashboard)',
      layout: "/admin",
      group: 'Dashboard'
    },
    {
      path: "/pelanggan",
      name: "pelanggan",
      icon: "business_badge",
      component: 'Auth(Pelanggan)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/supplier",
      name: "supplier",
      icon: "emoticons_satisfied",
      component: 'Auth(Supplier)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/satuan",
      name: "Satuan",
      icon: "design-2_ruler-pencil",
      component: 'Auth(satuan)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/kategorijasa",
      name: "Kategori Jasa",
      icon: "shopping_tag-content",
      component: 'Auth(kategori)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/hargajasa",
      name: "Harga Jasa",
      icon: "business_money-coins",
      component: 'Auth(Tarif)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/jenisbiaya",
      name: "Jenis Biaya",
      icon: "files_paper",
      component: 'Auth(Jenisbiaya)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/petugas",
      name: "Petugas Desain",
      icon: "users_circle-08",
      component: 'Auth(Petugas)',
      layout: "/admin",
      group: 'setup'
    },
    {
      path: "/penjualan",
      name: "Penjualan",
      icon: "shopping_box",
      component: 'Auth(Penjualan)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/pengeluaran",
      name: "Pengeluaran",
      icon: "shopping_cart-simple",
      component: 'Auth(Pengeluaran)',
      layout: "/admin",
      group: 'transaksi'
    },
    {
      path: "/userlogin",
      name: "User Login",
      icon: "users_single-02",
      component: 'Auth(Userlogin)',
      layout: "/admin",
      group: 'config'
    },
    {
      path: "/userlevel",
      name: "User Level",
      icon: "design_bullet-list-67",
      component: 'Auth(Userlevel)',
      layout: "/admin",
      group: 'config'
    },
    {
      path: "/useraccess",
      name: "User Access",
      icon: "sport_user-run",
      component: 'Auth(Useraccess)',
      layout: "/admin",
      group: 'config'
    }
  ];
  export default Menu;
  