import React from "react";
import Page from 'layouts/Page';
import Form from './form_supplier';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class Listsupplier extends React.Component {

  action(){
    return <ButtonAction />
  }

  render() {

    let data = [
      {
        nama: 'Brian Wahyu',
        alamat: 'Sidoarjo',
        id: 1
      },
      {
        nama: 'Ikbal',
        alamat: 'Lumajang',
        id: 2
      },
      {
        nama: 'Firmansyah',
        alamat: 'Lumajang',
        id: 3
      }
    ]
    return (
      <Page title={'Supplier'}>
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

export default Listsupplier;
