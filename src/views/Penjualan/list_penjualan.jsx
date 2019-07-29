import React from "react";
import Page from 'layouts/Page';
import { Input , Button , Row , Col , Form , FormGroup , Label , Table  } from 'reactstrap';
import Serialize from 'form-serialize';
import { formatRupiah , msgdialog ,apiGet , inputQty , qtyToNumber ,rupiahToNumber , dataUser  } from 'app';
import { IoMdTrash } from 'react-icons/io';
import Hotkeys from 'react-hot-keys';
import cuid from 'cuid';
import { UncontrolledTooltip } from 'reactstrap';
import Select from 'react-select';
import Member from './list_member';
import Bayar from './form_pembayaran';
import Jasa from './list_jasa';


class Listpenjualan extends React.Component {
  constructor(){
    super()
    this.state = {
      row:[],
      petugas:[],
      modal: false,
      member:[],
      jasa:[],
      modal2: false,
      modal3 : false,
      header:[],
      detail:[],
      idInputJasa:'',
      total:0
    }
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
    this.setQty = this.setQty.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addRowInTable = this.addRowInTable.bind(this);
    this.save = this.save.bind(this);
    this.mode = this.mode.bind(this);
    this.setMember = this.setMember.bind(this);
    this.mode2 = this.mode2.bind(this);
    this.mode3 = this.mode3.bind(this);
    this.setJasa = this.setJasa.bind(this);
    this.hitungTotalHarga = this.hitungTotalHarga.bind(this);
    this.clearAll = this.clearAll.bind(this);
 
  }

  setJasa(data){
    let { idInputJasa } = this.state;
    document.getElementById(`kode${idInputJasa}`).value = data.kode_jasa;
    document.getElementById(`jasa${idInputJasa}`).value = data.nama_jasa;
    document.getElementById(`satuan${idInputJasa}`).value = data.satuan;
    document.getElementById(`jenis${idInputJasa}`).value = data.jenis;

    let cek = document.getElementById('kode_pelanggan').value.length;
    if (cek > 0) {
      document.getElementById(`harga${idInputJasa}`).value = formatRupiah(data.harga_jual2 ,'');
    }else{
      document.getElementById(`harga${idInputJasa}`).value = formatRupiah(data.harga_jual1,'');
    }

  }

  setMember(kode , nama , alamat){
    document.getElementById('nama_pelanggan').value = nama;
    document.getElementById('kode_pelanggan').value = kode;
    document.getElementById('alamat').value = alamat;
    document.getElementById('nama_pelanggan').readOnly = true;
    document.getElementById('alamat').readOnly = true;

  }

  mode(){
    this.setState({ modal: !this.state.modal});
  }

  mode2(){
    this.setState({ modal2: !this.state.modal2 });
  }

  mode3(id){
    this.setState({ modal3: !this.state.modal3 , idInputJasa: id });
  }

  componentDidMount(){
    apiGet('/penjualan/result_data_petugas')
      .then(res  =>{
        this.setState({petugas: res });
      })
    apiGet('/penjualan/result_data_member')
      .then(res => {
        this.setState({member: res });
      })
    apiGet('/penjualan/result_data_jasa')
      .then(res =>{
        this.setState({jasa: res });
        
      })
  }

  addRowInTable(e , id , value){
    let index = this.state.row.findIndex( x => x.key === id) + 1;
    let count = this.state.row.length;

    let qty = qtyToNumber(document.getElementById(`qty${id}`).value);
    let harga = rupiahToNumber(document.getElementById(`harga${id}`).value);
    let nilaiDiskon = qtyToNumber(((value / 100) * harga).toString());
    let hargaDiskon  = harga - parseInt(nilaiDiskon);

   
    document.getElementById(`hargadiskon${id}`).value = formatRupiah((hargaDiskon).toString() , 'Rp. ');
    document.getElementById(`total${id}`).value = formatRupiah((hargaDiskon * qty).toString(),'Rp. ');  
    this.hitungTotalHarga();  

    if (e.keyCode === 13 && index === count) {
      this.addRow();
    }
  }

  add(){
    apiGet('/penjualan/get_no_nota')
      .then(res  =>{
        document.getElementById('no_nota').value = res;
      });
        document.getElementById('header').hidden = false;
        document.getElementById('no_nota').focus();
        document.getElementById('save').hidden = false;
        document.getElementById('cancel').hidden = false;
        document.getElementById('addrow').hidden = false;
        document.getElementById('tambahnota').hidden = true;
        document.getElementById('addrow').style.width = '240px';

    this.addRow();

  }

  addRow(){
    let id = cuid(10);
    let tanggal = new Date();
    let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;
   
    let copy = [ ...this.state.row];

    copy.push( 
      <tr key={id}>
              <td>
                <Row>
                  <Col sm='8'>
                    <Input type='text' name={`kode${id}`} id={`kode${id}`} tabIndex={0} hidden/>
                    <Input type='text' name={`jasa${id}`} id={`jasa${id}`} tabIndex={index + 1}/>
                    <Input type='text' name={`satuan${id}`} id={`satuan${id}`} tabIndex={0} hidden/>
                    <Input type='text' name={`jenis${id}`} id={`jenis${id}`} tabIndex={0} hidden />
                  </Col>
                  <Col sm='3'>
                    <Button size='sm' color='success' onClick={()=> this.mode3(`${id}`)}>+</Button>
                  </Col>
                </Row>
              </td>
              <td>
                <Input type='text' name={`qty${id}`} id={`qty${id}`} onKeyUp={(e)=> this.setQty(id,e.target.value)} tabIndex={index + 2}/>
              </td>
              <td>
                <Input onKeyUp={(e)=> this.addRowInTable(e , id , e.target.value)} type='number' name={`diskon${id}`} id={`diskon${id}`}  tabIndex={index + 3} />
              </td>
              <td>
                <Input type='text' name={`harga${id}`} id={`harga${id}`} readOnly tabIndex='0' />
              </td>
              <td>
                <Input type='text' name={`hargadiskon${id}`} id={`hargadiskon${id}`} readOnly tabIndex='0' />
              </td>
              <td>
                <Input type='text' name={`total${id}`} id={`total${id}`} readOnly tabIndex='0'/>
              </td>
              <td>
                <Button color='danger' size='sm' onClick={()=> this.deleteRow(id)} tabIndex='0'><IoMdTrash /></Button>
              </td>
            </tr>
     );

     this.setState({ row : copy})
  }

  setQty(id , value){
    inputQty(`qty${id}` , value);
    let diskon = document.getElementById(`diskon${id}`).value || 0;
    let harga = rupiahToNumber(document.getElementById(`harga${id}`).value);
    let nilaiDiskon = ((diskon / 100) * harga);
    let hargaDiskon  = harga - nilaiDiskon;
    let qty = qtyToNumber(value);
   
    document.getElementById(`hargadiskon${id}`).value = formatRupiah((hargaDiskon).toString() , 'Rp. ');
    document.getElementById(`total${id}`).value = formatRupiah((hargaDiskon * qty).toString(),'Rp. ');
    this.hitungTotalHarga();
  }

  hitungTotalHarga(){
    let detail = document.getElementById('detail');
    let dataDetail = Serialize( detail , { hash : true });
    let nilai = 0
    for( let i = 0; i < this.state.row.length; i++){
      
      let cek = rupiahToNumber(dataDetail[`total${this.state.row[i].key}`]);      
      nilai += parseInt(cek);
      
    }
    this.setState({ total: nilai });
  }

  clearAll(){
    this.setState({ row: [] , modal: false , modal2: false , modal3: false , header:[] , detail:[] , idinput:'' , total: 0 });
    document.getElementById('no_nota').value = '';
    document.getElementById('header').hidden = true;
    document.getElementById('save').hidden = true;
    document.getElementById('cancel').hidden = true;
    document.getElementById('addrow').hidden = true;
    document.getElementById('tambahnota').hidden = false;
    document.getElementById('header').reset();
    document.getElementById('detail').reset();
  }

  cancel(){
    msgdialog('Membatalkan')
      .then(res =>{
        if (res){
          this.clearAll();
        }
      })
  }

  save(){
          let header = document.getElementById('header');
          let detail = document.getElementById('detail');
          let dataHeader = Serialize( header , { hash : true });
          let dataDetail = Serialize( detail , { hash : true });

          dataHeader.operator = dataUser().username;
          dataHeader.total_harga = this.state.total;
          let cek = dataHeader.kode_petugas_design || 0;

          if (cek !== 0) {
            dataHeader.petugas_design = this.state.petugas.filter(x => x.kode_petugas === dataHeader.kode_petugas_design)[0].nama_petugas;
          }

          let arrayDetail = [];

          this.state.row.map(x => (
            arrayDetail.push({
              id_penjualan: dataHeader.no_nota,
              kode_jasa: dataDetail[`kode${x.key}`] || '', 
              nama_jasa: dataDetail[`jasa${x.key}`] || '', 
              satuan: dataDetail[`satuan${x.key}`] || '', 
              harga: rupiahToNumber(dataDetail[`harga${x.key}`] || '0'), 
              diskon: dataDetail[`diskon${x.key}`] || '0', 
              harga_diskon: rupiahToNumber(dataDetail[`hargadiskon${x.key}`] || '0'), 
              qty: qtyToNumber(dataDetail[`qty${x.key}`] || '0'), 
              total_harga: rupiahToNumber(dataDetail[`total${x.key}`] || '0'),
              jenis_jasa: dataDetail[`jenis${x.key}`] || '',
            })
          ))
        this.setState({ detail: arrayDetail.filter(x => x.kode_jasa !== '') , header: dataHeader });
        this.mode2();
  }

  onKeyDown(keyName, e, handle) {
    if (keyName === 'shift+a') {
      let count = this.state.row.length;
      if (count === 0) {
        return this.add();
      }
    }else if(keyName === 'shift+s'){
      return this.addRow()
    }else if(keyName === 'f5'){
      e.preventDefault()
    }

  }

  deleteRow(id){
    this.setState({
      row: this.state.row.filter( x => x.key !== id) 
    },()=>{
      this.hitungTotalHarga();
    }) 
  }

  render() {
    let { row , petugas , modal , member , jasa , modal2 , modal3 , idInputJasa , total , header , detail} = this.state;
    return (
      <Hotkeys 
        keyName="shift+a ,shift+s ,f5"
        onKeyDown={this.onKeyDown}
      >
      <Page title={'Penjualan'}>
        <Member modal={modal} mode={this.mode} member={ member } setMember={this.setMember} />
        <Bayar modal={modal2} mode={this.mode2} header={header} detail={detail} clear={this.clearAll} />
        <Jasa modal={modal3} mode={this.mode3} jasa={jasa} idinput={idInputJasa} setJasa={this.setJasa}  />
        <Row>
          <Col sm='3'>
            <Row>
              <Col>
                <Button color='primary' size='sm' onClick={this.add} style={{width:'100%'}} id='tambahnota' tabIndex='0'>Add</Button>
                <UncontrolledTooltip placement="top" target="tambahnota" delay={0}>
                  Bisa Juga Dengan Shift + A
                </UncontrolledTooltip>
              </Col>
              <Col>
                <Button color='info' size='sm' id='addrow' onClick={this.addRow} style={{width:'100%'}} hidden tabIndex='0'>Row</Button>
                <UncontrolledTooltip placement="top" target="addrow" delay={0}>
                  Bisa Juga Dengan Shift + S
                </UncontrolledTooltip>
              </Col>
            </Row>
          </Col>
          <Col sm='9'></Col>
        </Row>
        <hr/>
        <Form id='header' onSubmit={(e)=>  e.preventDefault()} hidden>
        <Row>
            <Col>
              <FormGroup>
                <Label for='no_nota'>Nota</Label>
                <Input type='text' name='no_nota' id='no_nota'  readOnly tabIndex='0' />
              </FormGroup>
              <FormGroup id='kode_petugas_design'>
                <Label for='kode_petugas_design'>Petugas Design</Label>
                <Select options={petugas.map(x => ({
                  value: x.kode_petugas,
                  label: x.nama_petugas
                }))}
                name='kode_petugas_design' className='select' id='kode_petugas_design' tabIndex='1'/>
              </FormGroup>
            </Col>
            <Col>
                <Row>
                  <Col sm='9'>
                    <FormGroup >
                      <Label for='nama_pelanggan'>Nama Pelanggan</Label>
                      <Input type='text' name='nama_pelanggan' id='nama_pelanggan' tabIndex='2'/>
                    </FormGroup>
                  </Col>
                  <Col sm='3'>
                    <Button type='submit' className='mt-4' onClick={this.mode} color='info' tabIndex='0'>Pilih</Button>
                  </Col>
                </Row>
              <FormGroup>
                <Label for='alamat'>Alamat</Label>
                <Input type='text' name='alamat' id='alamat' tabIndex='3' />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for='no_telepon'>No Telp</Label>
                <Input type='number' name='no_telepon' tabIndex='4'/>
              </FormGroup>
              <FormGroup>
                <Label for='kode_pelanggan'>Kode Pelanggan</Label>
                <Input type='text' name='kode_pelanggan' id='kode_pelanggan' tabIndex='5' readOnly/>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <hr />
        <Row style={{ marginBottom:'50px'}}>
          <Col>
              <Form id='detail' onSubmit={(e)=>  e.preventDefault()}>
              <Table responsive>
                <thead>
                    <tr>
                      <th style={{width: '35%'}}>Jasa</th>
                      <th style={{width: '10%'}}>QTY</th>
                      <th style={{width: '10%'}}>Diskon</th>
                      <th>Harga</th>
                      <th>Harga Diskon</th>
                      <th>Total</th>
                      <th>Hapus</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    row
                  }
                </tbody> 
              </Table>
              </Form>
            </Col>
        </Row>
        <h3>{`Total Harga : ${formatRupiah(total.toString(),'')}`}</h3>
        <Row>
          <Col>
              <Button color='success' size='sm' type='button' style={{ width:'100%'}} id='save' tabIndex='0' onClick={this.save} hidden >Proses</Button>
          </Col>
          <Col>
              <Button color='danger' size='sm' type='button'  style={{ width:'100%'}} id='cancel' tabIndex='0' onClick={this.cancel} hidden>Cancel</Button>
          </Col>
        </Row>
      </Page>
      </Hotkeys>
    );
  }
}

export default Listpenjualan;
