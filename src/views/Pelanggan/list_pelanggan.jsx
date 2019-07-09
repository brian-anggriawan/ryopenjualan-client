import React from "react";
import Page from 'layouts/Page';
import Form from './form_pelanggan';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class Listpelanggan extends React.Component {


  action(){
    return <ButtonAction />
  }

  render() {
    let data = [
      {
        nama: 'Brian Wahyu',
        alamat: 'Sidoarjo',
        biaya: 'Murah',
        id: 1
      },
      {
        nama: 'Ikbal',
        alamat: 'Lumajang',
        biaya: 'Paling Murah',
        id: 2
      },
      {
        nama: 'Firmansyah',
        alamat: 'Lumajang',
        biaya: 'Murah',
        id: 3
      }
    ]
    return (
      <Page title={'Pelanggan'}>
        <Form />
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'nama',
                text: 'Nama'
            },
            {
                dataField: 'alamat',
                text: 'Alamat'
            },
            {
              dataField: 'biaya',
              text: 'Jenis Harga'
            },
            {
              dataField: 'id',
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

export default Listpelanggan;
