import React from "react";
import Page from 'layouts/Page';
import Form from './form_petugas';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class Listpetugas extends React.Component {
  action(){
    return <ButtonAction />
  }
  render() {

    let data = [
      {
        nama: 'Brian Wahyu',
        bonus: '10%',
        id: 1
      },
      {
        nama: 'Ikbal',
        bonus: '20%',
        id: 2
      },
      {
        nama: 'Firmansyah',
        bonus: '30%',
        id: 3
      }
    ]
    return (
      <Page title={'Petugas Desain'}>
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
                dataField: 'bonus',
                text: 'Bonus'
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

export default Listpetugas;
