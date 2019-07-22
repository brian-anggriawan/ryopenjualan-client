import React from "react";
import Page from 'layouts/Page';
import Form from './form_jasa';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import Loading from 'components/Loading';
import { apiGet , apiPost , msgdialog , formatRupiah } from 'app';

class Listtarif extends React.Component {
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
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.button = this.button.bind(this);
    this.getData = this.getData.bind(this);
  }

  mode(){
    this.setState({ modal: !this.state.modal })
  }

  getData(){
    this.setState({ modal: false , loading: true });
    apiGet('harga_jasa/result_harga_jasa')
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
          apiPost('harga_jasa/hapus' , { id: id })
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

  edit(id){
    let data = this.state.data.filter( x => x.id === id)[0];
    this.setState({ edit: data , flag: 1 });
    this.mode();
  }

  formatuang(nilai){
    return formatRupiah(nilai,'')
  }

  render() {
    let { data , loading, modal, edit , flag } = this.state;

    if (loading){
      return(
        <Page title={'Harga Jasa'}>
          <Loading active={loading} />
        </Page>
      ) 
    }
    return (
      <Page title={'Harga Jasa'}>
        <Form mode={this.mode} modal={modal} edit={edit} flag={flag} getData={this.getData} count={data.length} />
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
              dataField: 'kode_jasa',
              text: 'Kode'
            },
            {
                dataField: 'nama_jasa',
                text: 'Jasa'
            },
            {
                dataField: 'jenis',
                text: 'Jenis'
            },
            {
              dataField: 'satuan',
              text: 'Satuan'
            },
            {
              dataField: 'hpp',
              formatter: this.formatuang,
              text: 'HPP'
            },
            {
              dataField: 'harga_jual1',
              formatter: this.formatuang,
              text: 'Harga 1'
            },
            {
              dataField: 'harga_jual2',
              formatter: this.formatuang,
              text: 'Harga 2'
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

export default Listtarif;
