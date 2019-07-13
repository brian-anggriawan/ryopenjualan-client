import React from "react";
import Page from 'layouts/Page';
import { Input , Button , Row , Col , Form , FormGroup , Label , Table  } from 'reactstrap';
import Serialize from 'form-serialize';
import { formatRupiah } from 'app';
import Select from 'components/Select/select';
import { IoMdTrash } from 'react-icons/io';
import Hotkeys from 'react-hot-keys';
import cuid from 'cuid';

class Listpenjualan extends React.Component {
  constructor(){
    super()
    this.state = {
      row:[],
      qty: 0,
      keys:''
    }
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
    this.setQty = this.setQty.bind(this);
    this.setHarga = this.setHarga.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
 
  }

  add(){
    document.getElementById('nota').focus();
    document.getElementById('nota').value = '1242/45/66/RYO';
    document.getElementById('groupmember').hidden = false;
    document.getElementById('groupdesain').hidden = false;
    document.getElementById('save').hidden = false;
    document.getElementById('cancel').hidden = false;

    let row = [];
    let id = cuid(10);
      row.push(<tr key={id}>
                <td>
                  <Select text={'Jasa'} data={[
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
                  ]} name={`jasa${id}`} id={`jasa${id}`} index={4}/>
                </td>
                <td>
                  <Input type='number' name={`qty${id}`} id={`qty${id}`} onChange={this.setQty} tabIndex={4} />
                </td>
                <td>
                  <Input type='number' name={`diskon${id}`} id={`diskon${id}`} onChange={this.setHarga} tabIndex={4} />
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
                  <Button color='danger' size='sm'><IoMdTrash /></Button>
                </td>
              </tr>
      )
    this.setState({ row: row});

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

  onKeyDown(keyName, e, handle) {

    if (keyName === 'shift+a') {
      return this.add();
    }else if(keyName === 'shift+s'){
      let row = [];
      let id = cuid(10);
        row.push(<tr key={id}>
                  <td>
                    <Select text={'Jasa'} data={[
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
                    ]} name={`jasa${id}`} id={`jasa${id}`} index={4}/>
                  </td>
                  <td>
                    <Input type='number' name={`qty${id}`} id={`qty${id}`} onChange={this.setQty} tabIndex={4} />
                  </td>
                  <td>
                    <Input type='number' name={`diskon${id}`} id={`diskon${id}`} onChange={this.setHarga} tabIndex={4} />
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
                    <Button color='danger' size='sm'><IoMdTrash /></Button>
                  </td>
                </tr>
        )

        let copy = [ ...this.state.row , row];
        this.setState({ row: copy});
    }

  }

  render() {
    let { row } = this.state;
    return (
      <Hotkeys 
      keyName="shift+a ,shift+s"
      onKeyDown={this.onKeyDown}
    >
      <Page title={'Penjualan'}>
        <Button color='primary' onClick={this.add}>Tambah Nota</Button>
        <hr/>
        <Row>
          <Col sm='3'>
            <Form id='header' onSubmit={()=> {return false}}>
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
            <Form id='detail' onSubmit={()=> {return false}}>
            <Table responsive>
              <thead>
                  <tr>
                    <th className='w-25'>Nama Jasa</th>
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
      </Hotkeys>
    );
  }
}

export default Listpenjualan;
