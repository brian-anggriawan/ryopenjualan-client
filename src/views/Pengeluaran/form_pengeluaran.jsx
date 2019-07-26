import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , FormGroup , Label  } from 'reactstrap';
import Select from 'react-select';
import serialize from 'form-serialize';
import { apiPost  , apiGet , inputRupiah ,formatRupiah , formatTanggal , rupiahToNumber ,dataUser} from 'app';
import dt from 'moment';

export default class form_pengeluaran extends Component {
    constructor(){
        super()
        this.state={
            jenis:[]
        }
        
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        apiGet('jenis_biaya/result_data_jenis_biaya')
        .then(res =>{
          this.setState({ jenis:  res });
        })  
    }
    
    save(){
        let data =  serialize(document.getElementById('pengeluaran') ,{hash: true});
     
            if(this.props.flag === 1){
                data.id = this.props.edit.id;
                data.operator = dataUser().username;
                data.jumlah = rupiahToNumber(data.jumlah);
                data.tanggal = this.props.edit.tanggal;
                apiPost('pengeluaran/edit' ,data)
                .then(res =>{
                  if (res) {
                    this.props.getData();
                  }
                })
            }else{
                data.tanggal = formatTanggal(new Date());
                data.operator = dataUser().username;
                data.jumlah = rupiahToNumber(data.jumlah);
                apiPost('pengeluaran/tambah' ,data)
                .then(res =>{
                  if (res) {
                    this.props.getData();
                  }
                })
            }
    }


    render() {
        let { modal , mode ,edit , flag , count } = this.props;
        let { jenis } = this.state;
        let tanggal = dt(new Date()).format('L').replace('/','').replace('/','');

        return (
            <div>
                <Modal title={'Form Pengeluaran Biaya'} modal={modal} mode={mode} idform={'pengeluaran'} action={this.save}>
                    {
                        flag === 1 ?
                        <div>
                            <FormGroup>
                            <Label for='kode_pengeluaran'>Kode Pengeluaran</Label>
                                <Input type='text' name='kode_pengeluaran' readOnly defaultValue={edit.kode_pengeluaran} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='nama_acc'>Jenis Biaya</Label>
                                <Select className='select'  options={jenis.map(x => ({
                                    value: x.kelompok_acc,
                                    label: x.kelompok_acc
                                }))}
                                name='nama_acc' defaultValue={{ value: edit.nama_acc , label: edit.nama_acc}}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='keterangan'>Keterangan</Label>
                                <Input type='text' name='keterangan' defaultValue={edit.keterangan}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='jumlah'>Nominal</Label>
                                <Input type='text' name='jumlah' id='jumlah' onKeyUp={(e)=> inputRupiah('jumlah' , e.target.value)} defaultValue={formatRupiah(edit.jumlah,'')}/>
                            </FormGroup>
                        </div>
                        :
                        <div>
                            <FormGroup>
                            <Label for='kode_pengeluaran'>Kode Pengeluaran</Label>
                                <Input type='text' name='kode_pengeluaran' readOnly defaultValue={`JB-${count+1}${tanggal}`} />
                            </FormGroup>
                            <FormGroup>
                                <Label for='nama_acc'>Jenis Biaya</Label>
                                <Select className='select'  options={jenis.map(x => ({
                                    value: x.kelompok_acc,
                                    label: x.kelompok_acc
                                }))}
                                name='nama_acc'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='keterangan'>Keterangan</Label>
                                <Input type='text' name='keterangan'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='jumlah'>Nominal</Label>
                                <Input type='text' name='jumlah' id='jumlah' onKeyUp={(e)=> inputRupiah('jumlah' , e.target.value)}/>
                            </FormGroup>
                        </div>
                        
                    }
                </Modal>   
            </div>
        )
    }
}
