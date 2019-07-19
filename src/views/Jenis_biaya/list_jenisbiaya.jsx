import React from "react";
import Page from 'layouts/Page';
import { Button , Input } from 'reactstrap';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import { apiGet , apiPost} from 'app';
import Loading from 'components/Loading';

class Jenisbiaya extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      loading : true
    }
  }

  componentWillMount(){
    apiGet('jenis_biaya/result_data_jenis_biaya')
      .then(res =>{
        this.setState({ data: res , loading: false});
      })

      
  }

  test(){
    apiPost('jenis_biaya/tambah' ,{ kelompok_acc: 'test'})
      .then(res =>{
        console.log(res)
      })
  }

  action(){
    return (
      <ButtonAction />
    )
  }

  render() {
    let { data ,loading } = this.state;

    if (loading){
      return(
        <Page title={'Jenis Biaya'}>
          <Loading active={loading} />
        </Page>
      ) 
    }

    return (
      <Page title={'Jenis Biaya'}>
        <Input type='text' placeholder='Jenis Biaya' />
        <Button color='primary' size='sm' style={{ width: '100%'}} onClick={this.test} className='mb-4'>Simpan</Button>
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'kelompok_acc',
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
