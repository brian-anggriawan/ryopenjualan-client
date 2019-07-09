import React from "react";
import Page from 'layouts/Page';
import { Button , Input } from 'reactstrap';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class Jenisbiaya extends React.Component {


  action(){
    return (
      <ButtonAction />
    )
  }

  render() {
    let data =  [
                  { nama: 'Biaya Administrasi' , id: 1},
                  { nama: 'Biaya ATK' , id: 2},
                  { nama: 'Biaya Pembelian' , id: 3},
                  { nama: 'Biaya Perbaikan' , id: 4},
                  { nama: 'Biaya Sosial' , id: 5},
                  { nama: 'Biaya Transportasi' , id: 6}
                ]
    return (
      <Page title={'Jenis Biaya'}>
        <Input type='text' placeholder='Jenis Biaya' />
        <Button color='primary' size='sm' style={{ width: '100%'}} className='mb-4'>Simpan</Button>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'nama',
                text: 'Jenis Biaya'
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

export default Jenisbiaya;
