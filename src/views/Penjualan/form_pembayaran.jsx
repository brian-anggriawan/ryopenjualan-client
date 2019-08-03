import Modal from 'layouts/list_modal';
import React, { Component } from 'react';
import { FormGroup , Label , Input ,Button , Form } from 'reactstrap';
import Serialize from 'form-serialize';
import Select from 'react-select';
import { inputRupiah , rupiahToNumber ,formatRupiah , apiPostPenjualan , urlServer , msgerror} from 'app';

export default class form_pembayaran extends Component {
    constructor(){
        super()
        this.state ={
            flagnorek: false,
            kredit: false
        }
        this.simpan = this.simpan.bind(this);
        this.cara = this.cara.bind(this);
        this.metode = this.metode.bind(this);
    }

    cara(e){
        if (e.value === 'KREDIT') {
            this.setState({ flagnorek: false , kredit: true  }); 
        }else{
            this.setState({ flagnorek: false , kredit: false }) 
        }
    }

    metode(e){
        if (e.value === 'TRANSFER' || e.value === 'EDC') {
            this.setState({ flagnorek: true , kredit: false });
        }else{
            this.setState({ flagnorek: false , kredit: false })   
        }
    }

    simpan(){
        let { header , detail , clear } = this.props;
        let data = Serialize(document.getElementById('pembayaran') ,{ hash: true });
        let cek  = data.cara_bayar;

        if (cek === 'KREDIT') {
            let bayar = parseInt(rupiahToNumber(data.bayar || '0'));
            let proses = (50 / 100) * header.total_harga;
            
            if (proses > bayar ) {
                msgerror('Diskon Hanya Boleh Minimal 50%')
            }else{
                header.cara_bayar = data.cara_bayar || '0';
                header.no_rekening = data.no_rekening || 0;
                header.bayar = rupiahToNumber(data.bayar || '0');
                header.kembali = rupiahToNumber(data.kembali || '0');
                header.tanggal_ambil = data.tanggal_ambil || '0';
                header.jam_ambil = data.jam_ambil || '00:00';
                header.metode_pembayaran = data.metode_pembayaran || '0'
                header.detail = detail;
                apiPostPenjualan('penjualan/tambah' , header)
                    .then(res =>{
                        if (res.result === 'true') {
                            window.open(`${urlServer}/penjualan/cetak_nota/${res.id_penjualan}`,'MsgWindow', 'width=4000,height=4000');
                            clear();   
                        }      
                    })
            }
        }else{
            header.cara_bayar = data.cara_bayar || '0';
            header.no_rekening = data.no_rekening || 0;
            header.bayar = rupiahToNumber(data.bayar || '0');
            header.kembali = rupiahToNumber(data.kembali || '0');
            header.tanggal_ambil = data.tanggal_ambil || '0';
            header.jam_ambil = data.jam_ambil || '00:00';
            header.metode_pembayaran = data.metode_pembayaran || '0'
            header.detail = detail;
            apiPostPenjualan('penjualan/tambah' , header)
                .then(res =>{
                    if (res.result === 'true') {
                        window.open(`${urlServer}/penjualan/cetak_nota/${res.id_penjualan}`,'MsgWindow', 'width=4000,height=4000');
                        clear();   
                    }      
                })
        }
        
    }

    bayar(value){
        inputRupiah('bayar' , value);
        let total_harga = this.props.header.total_harga || 0;
        
        return document.getElementById('kembali').value = formatRupiah((rupiahToNumber(value) - total_harga).toString(),'');
    }

    kredit(value){
        inputRupiah('bayar',value);
        let total_harga = this.props.header.total_harga || 0;

        return document.getElementById('kembali').value = formatRupiah((total_harga - rupiahToNumber(value)).toString(),'');
    }


    render() {
        let { modal , mode , header } = this.props;
        let { flagnorek , kredit } = this.state;

        let total_harga = formatRupiah((header.total_harga || '0').toString(),'');
        return (
            <Modal modal={modal} mode={mode} title={'Pembayaran'}>
                <Form id='pembayaran'>
                    <FormGroup>
                        <Label>Tanggal Pengambilan</Label>
                        <Input type='date' name='tanggal_ambil'  tabIndex='1'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Jam Pengambilan</Label>
                        <Input type='time' name='jam_ambil' tabIndex='2'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='cara_bayar'>Pembayaran</Label>
                        <Select 
                            options={[
                                {
                                    label: 'LUNAS',
                                    value:'LUNAS'
                                },
                                {
                                    label: 'KREDIT',
                                    value:'KREDIT'
                                }
                            ]}
                        name='cara_bayar' id='cara_bayar' tabIndex= '3' onChange={this.cara} className='select'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='metode_pembayaran'>Metode Pembayaran</Label>
                        <Select 
                            options={[
                                {
                                    label: 'CASH',
                                    value:'CASH'
                                },
                                {
                                    label: 'TRANSFER',
                                    value:'TRANSFER'
                                },
                                {
                                    label: 'EDC',
                                    value:'EDC'
                                }
                            ]}
                        name='metode_pembayaran' id='metode_pembayaran' tabIndex= '4' onChange={this.metode} className='select'/>
                    </FormGroup>
                    {
                        flagnorek ? 
                        <FormGroup>
                            <Label for='no_rekening'>No Rekning</Label>
                            <Input type='number' name='no_rekening' tabIndex='5'/>
                        </FormGroup> : ''

                    }
                    {
                        kredit ?
                        <div>
                            <FormGroup>
                                <Label for='bayar'>Bayar</Label> 
                                <Input type='text' name='bayar' id='bayar' tabIndex='6' onKeyUp={(e)=> this.kredit(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='total_harga'>Total Harga</Label>
                                <Input type='text' name='total_harga' id='total_harga' defaultValue={total_harga} tabIndex='7' readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='kembali'>Sisa Bayar</Label>
                                <Input type='text' name='kembali' id='kembali' tabIndex='8' readOnly/>
                            </FormGroup>
                        </div>
                        :
                        <div>
                            <FormGroup>
                                <Label for='bayar'>Bayar</Label> 
                                <Input type='text' name='bayar' id='bayar' tabIndex='6' onKeyUp={(e)=> this.bayar(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='total_harga'>Total Harga</Label>
                                <Input type='text' name='total_harga' id='total_harga' defaultValue={total_harga} tabIndex='7' readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='kembali'>Kembalian</Label>
                                <Input type='text' name='kembali' id='kembali' tabIndex='8' readOnly/>
                            </FormGroup>
                        </div>
                    }  
                   
                    <hr />
                    <Button type='button' color='success' tabIndex='6' onClick={this.simpan} size='sm' style={{ width: '100%'}}>Bayar</Button>
                </Form>
            </Modal>
        )
    }
}
