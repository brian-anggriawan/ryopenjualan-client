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
                  { kategori: 'a3' , id: 1},
                  { kategori: 'Trotec uv' , id: 2},
                  { kategori: 'Offset' , id: 3},
                ]
    return (
      <Page title={'Kategori Jasa'}>
        <Input type='text' placeholder='Kategor Produk' />
        <Button color='primary' size='sm' style={{ width: '100%'}} className='mb-4'>Simpan</Button>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'kategori',
                text: 'Kategori Jasa'
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
