import React from "react";
import Page from 'layouts/Page';
import Form from './form_pengeluaran';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';
import Loading from 'components/Loading';
import { apiGet , apiPost , msgdialog } from 'app';
import { Button } from 'reactstrap';
import { formatRupiah } from 'app';

class Listpengeluaran extends React.Component {
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
    apiGet('pengeluaran/result_data_pengeluaran')
    .then(res =>{
      this.setState({ data: res , loading: false });
    })
  }

  componentWillMount(){
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

  edit(id){
    let data = this.state.data.filter( x => x.id === id)[0];
    this.setState({ edit: data , flag: 1 });
    this.mode();
  }

  nominal(nilai){
    return formatRupiah(nilai ,'')
  }

  render() {
    let { data , loading, modal, edit , flag } = this.state;

    if (loading){
      return(
        <Page title={'Pengeluaran'}>
          <Loading active={loading} />
        </Page>
      ) 
    }

    return (
      <Page title={'Pengeluaran'}>
        <Button type='button' size='sm' color='primary' onClick={this.tambah}>Tambah</Button>
        <Form  mode={this.mode} modal={modal} edit={edit} flag={flag} getData={this.getData}/>
         <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
              dataField: 'kode_pengeluaran',
              text: 'Kode'
            },
            {
                dataField: 'tanggal',
                text: 'Tanggal'
            },
            {
              dataField: 'jam',
              text: 'Jam'
            },
            {
              dataField: 'operator',
              text: 'Operator'
            },
            {
              dataField: 'nama_acc',
              text: 'Jenis Biaya'
            },
            {
              dataField: 'keterangan',
              text: 'Keterangan'
            },
            {
              dataField: 'jumlah',
              formatter: this.nominal,
              text: 'Jumlah'
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

export default Listpengeluaran;
