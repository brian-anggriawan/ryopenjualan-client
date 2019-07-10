import React from "react";
import Page from 'layouts/Page';
import { Input , Button , Row ,Col} from 'reactstrap';
import Tabel from 'components/tabel';
import { IoMdTrash } from 'react-icons/io';
import List from './list_menu';

class Listuseraccess extends React.Component {
  constructor(){
    super()
    this.state = {
      modal: false
    }

    this.mode = this.mode.bind(this);
  }

  action(){
    return <Button color='danger' size='sm'><IoMdTrash /></Button>
  }

  mode(){
    this.setState({ modal : !this.state.modal})
  }

  render() {
    let data = [
      {
        path: "/dashboard",
        name: "Dashboard",
        group: 'Dashboard',
        userlevel: 'Owner'
      },
      {
        path: "/pelanggan",
        name: "pelanggan",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/supplier",
        name: "supplier",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/satuan",
        name: "Satuan",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/kategoriproduk",
        name: "Kategori Produk",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/hargaproduk",
        name: "Harga Produk",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/jenisbiaya",
        name: "Jenis Biaya",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/petugas",
        name: "Petugas Desain",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/setupkasir",
        name: "Setup Kasir",
        group: 'setup',
        userlevel: 'Owner'
      },
      {
        path: "/penjualan",
        name: "Penjualan",
        group: 'transaksi',
        userlevel: 'Owner'
      },
      {
        path: "/pengeluaran",
        name: "Pengeluaran",
        group: 'transaksi',
        userlevel: 'Owner'
      },
      {
        path: "/userlogin",
        name: "User Login",
        group: 'config',
        userlevel: 'Owner'
      },
      {
        path: "/userlevel",
        name: "User Level",
        group: 'config',
        userlevel: 'Owner'
      },
      {
        path: "/useraccess",
        name: "User Access",
        group: 'config',
        userlevel: 'Owner'
      }
    ];
    return (
      <Page title={'User Access'}>
        <List mode={this.mode} modal={this.state.modal} data={data}/>
        <Row className='mb-3'>
          <Col>
            <Input type='select'>
              <option value='0'>Pilih User Level</option>
              <option value='1'>Administrator</option>
              <option value='2'>Owner</option>
              <option value='3'>Kasir</option>
            </Input>
          </Col>
          <Col>
            <Button color='success' onClick={this.mode} size='sm'> Tambah</Button>
          </Col>
        </Row>
        <Tabel
          data ={data}
          keyField = {'path'}
          columns ={[
            {
                dataField: 'userlevel',
                text: 'User Level'
            },
            {
              dataField: 'name',
              text: 'Menu'
            },
            {
              dataField: 'group',
              text: 'Group Menu'
            },
            {
              dataField: 'path',
              formatter: this.action,
              text: 'Action'
            }
          ]}                            
            width={{ width:'300px'}}
          />
      </Page>
    );
  }
}

export default Listuseraccess;
