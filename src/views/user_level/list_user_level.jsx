import React from "react";
import Page from 'layouts/Page';
import { Button , Input } from 'reactstrap';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class userlevel extends React.Component {


  action(){
    return (
      <ButtonAction />
    )
  }

  render() {
    let data =  [
                  { userlevel: 'Administrator' , id: 1},
                  { userlevel: 'Owner' , id: 2},
                  { userlevel: 'Kasir' , id: 3},
                ]
    return (
      <Page title={'Jenis Biaya'}>
        <Input type='text' placeholder='User Level' />
        <Button color='primary' size='sm' style={{ width: '100%'}} className='mb-4'>Simpan</Button>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'userlevel',
                text: 'User Level'
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

export default userlevel;
