import React from "react";
import Page from 'layouts/Page';
import { Input , Button , Row , Col , Form , FormGroup , Label , Table  } from 'reactstrap';
import Serialize from 'form-serialize';
import { formatRupiah } from 'app';
import Select from 'components/Select/select';
import { IoMdTrash } from 'react-icons/io';

class Listpenjualan extends React.Component {
  constructor(){
    super()
    this.state = {
      row:[],
      qty: 0
    }
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
    this.setQty = this.setQty.bind(this);
    this.setHarga = this.setHarga.bind(this);
 
  }

  add(){

    document.getElementById('nota').value = '1242/45/66/RYO';
    document.getElementById('groupmember').hidden = false;
    document.getElementById('groupdesain').hidden = false;
    document.getElementById('save').hidden = false;
    document.getElementById('cancel').hidden = false;
    document.getElementById('nota').focus();


    let row = [];
    for (let i = 0; i < 10; i++) {
      row.push(<tr key={i}>
                <td>
                    <Select data={[
                    {
                      value:'',
                      text: ''
                    },
                    {
                      value:'1',
                      text: 'Undangan'
                    },
                    {
                      value:'2',
                      text: 'Baliho'
                    },
                    {
                      value:'3',
                      text: 'Spanduk'
                    }
                  ]} name={`nama${i}`} id={`nama${i}`} index={i + 4}/>
                </td>
                <td>
                  <Input type='number' name={`qty${i}`} id={`qty${i}`} onChange={this.setQty} tabIndex={i+4} />
                </td>
                <td>
                  <Input type='number' name={`diskon${i}`} id={`diskon${i}`} onChange={this.setHarga} tabIndex={i+4} />
                </td>
                <td>
                  <Input type='text' name={`harga${i}`} id={`harga${i}`} readOnly tabIndex='0' />
                </td>
                <td>
                  <Input type='text' name={`hargadiskon${i}`} id={`hargadiskon${i}`} readOnly tabIndex='0' />
                </td>
                <td>
                  <Input type='text' name={`total${i}`} id={`total${i}`} readOnly tabIndex='0'/>
                </td>
                <td>
                  <Button color='danger' size='sm'><IoMdTrash /></Button>
                </td>
              </tr>
      )
    }
    this.setState({ row: row})

  }
  setQty(e){
    this.setState({ qty : e.target.value })
  }

  setHarga(e){
    let { qty } = this.state;

    let index = e.target.name.replace('diskon','');
    let value = e.target.value;
    let harga = '100000';
    let nilaiDiskon = ((value / 100) * harga);
    let hargaDiskon  = harga - nilaiDiskon;
    document.getElementById(`harga${index}`).value = formatRupiah(harga , 'Rp. ');
    document.getElementById(`hargadiskon${index}`).value = formatRupiah((hargaDiskon).toString() , 'Rp. ');
    document.getElementById(`total${index}`).value = formatRupiah((hargaDiskon * qty).toString(),'Rp. ');
  }

  cancel(){
    this.setState({ row: []});
    document.getElementById('nota').value = '';
    document.getElementById('groupmember').hidden = true;
    document.getElementById('groupdesain').hidden = true;
    document.getElementById('save').hidden = true;
    document.getElementById('cancel').hidden = true;
  }

  save(){
    let header = document.getElementById('header');
    let detail = document.getElementById('detail');
    let dataHeader = Serialize( header , { hash : true });
    let dataDetail = Serialize( detail , { hash : true });

    console.log(dataHeader);
    console.log(dataDetail);
  }

  render() {
    let { row } = this.state;
    return (
      <Page title={'Penjualan'}>
        <Button color='primary' onClick={this.add}>Tambah Nota</Button>
        <hr/>
        <Row>
          <Col sm='3'>
            <Form id='header'>
              <FormGroup>
                <Label for='nota'>Nota</Label>
                <Input type='text' name='nota' id='nota' readOnly tabIndex='1' />
              </FormGroup>
              <FormGroup id='groupmember' hidden>
                <Label for='member'>Nama Member</Label>
                <Select text={'Pilih Member'} data={[
                  {
                    value:'1',
                    text: 'Andi'
                  },
                  {
                    value:'2',
                    text: 'Dina'
                  },
                  {
                    value:'3',
                    text: 'Azril'
                  }
                ]} name='member' id='member' index={2}/>
              </FormGroup>
              <FormGroup id='groupdesain'  hidden>
                <Label for='desain'>Petugas Desain</Label>
                <Select text={'Pilih Petugas Desain'} data={[
                  {
                    value:'1',
                    text: 'Deni'
                  },
                  {
                    value:'2',
                    text: 'Ahmad'
                  },
                  {
                    value:'3',
                    text: 'Zaki'
                  }
                ]} name='desain' id='desain' index={3}/>
              </FormGroup>
              <Row>
                <Col>
                  <Button color='success' style={{ width:'100%'}} id='save' onClick={this.save} hidden tabIndex='0'>Save</Button>
                </Col>
                <Col>
                  <Button color='danger' style={{ width:'100%'}} id='cancel' onClick={this.cancel} hidden tabIndex='0'>Cancel</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm='9'>
            <Form id='detail'>
            <Table responsive>
              <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>QTY</th>
                    <th>Diskon %</th>
                    <th>Harga</th>
                    <th>Harga Diskon</th>
                    <th>Total Harga</th>
                    <th>Delete</th>
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
      </Page>
    );
  }
}

export default Listpenjualan;
