import React from "react";
import Page from 'layouts/Page';
import Form from './form_supplier';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import Loading from 'components/Loading';
import { apiGet , apiPost , msgdialog } from 'app';
import { Button } from 'reactstrap';
class Listsupplier extends React.Component {
  constructor(){
    super()
    this.state = {
      data: [],
      loading: true,
      modal: false,
      flag:0,
      edit:[]
    }
    this.mode = this.mode.bind(this);
    this.tambah = this.tambah.bind(this);
    //this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.button = this.button.bind(this);
  }

  mode(){
    this.setState({ modal: !this.state.modal })
  }

  getData(){
    this.setState({ modal: false , loading: true });
    apiGet('supplier/result_data_supplier')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  componentDidMount(){
    this.getData();
  }

  delete(id){ 
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('supplier/hapus' , { id: id })
          .then( res =>{
            if (res) {
              this.getData();
            }
          })
        }
      })
  }

  button(id){
    return <ButtonAction hapus={()=> this.delete(id)} edit={()=> this.edit(id)}  />
  }

  tambah(){
    this.mode();
    this.setState({ flag: 0 })
  }

  render() {
    let { data , loading, modal, edit , flag } = this.state;

    if (loading){
      return(
        <Page title={'Supplier'}>
          <Loading active={loading} />
        </Page>
      ) 
    }
    return (
      <Page title={'Supplier'}>
        <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        <Form mode={this.mode} modal={modal} edit={edit} flag={flag} getData={this.getData} />
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'nama_supplier',
                text: 'Nama Supplier'
            },
            {
                dataField: 'alamat',
                text: 'Alamat'
            },
            {
              dataField: 'id',
              formatter: this.button,
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
