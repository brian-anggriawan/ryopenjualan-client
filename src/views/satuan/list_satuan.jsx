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
                  { satuan: 'pcs' , id: 1},
                  { satuan: 'rol' , id: 2},
                  { satuan: 'm3' , id: 3},
                  { satuan: 'pack' , id: 4}
                ]
    return (
      <Page title={'Satuan'}>
        <Input type='text' placeholder='Satuan' />
        <Button color='primary' size='sm' style={{ width: '100%'}} className='mb-4'>Simpan</Button>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'satuan',
                text: 'Satuan'
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
