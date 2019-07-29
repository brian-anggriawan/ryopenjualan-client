import Modal from 'layouts/list_modal';
import React, { Component } from 'react';
import { FormGroup , Label , Input ,Button , Form } from 'reactstrap';
import Serialize from 'form-serialize';
import Select from 'react-select';
import { inputRupiah , rupiahToNumber ,formatRupiah } from 'app';

export default class form_pembayaran extends Component {
    constructor(){
        super()
        this.state ={
            flagnorek: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.simpan = this.simpan.bind(this);
    }

    handleChange(e){
        if (e.value === 'TRANSFER' || e.value === 'EDC') {
            this.setState({ flagnorek: true });
        }else{
            this.setState({ flagnorek: false });
        }
    }

    simpan(){
        let { header , detail , clear } = this.props;
        let data = Serialize(document.getElementById('pembayaran') ,{ hash: true });
        header.cara_bayar = data.cara_bayar;
        header.no_rekening = data.no_rekening || 0;
        header.bayar = data.bayar;
        header.bayar = rupiahToNumber(data.kembali);
        header.detail = detail;
        console.log(header);
        clear();
    }

    bayar(value){
        inputRupiah('bayar' , value);
        let total_harga = this.props.header.total_harga || 0;
        
        return document.getElementById('kembali').value = formatRupiah((rupiahToNumber(value) - total_harga).toString(),'');
    }

    render() {
        let { modal , mode } = this.props;
        let { flagnorek } = this.state;
        return (
            <Modal modal={modal} mode={mode} title={'Pembayaran'}>
                <Form id='pembayaran'>
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
                        name='cara_bayar' id='cara_bayar' tabIndex= '1' onChange={this.handleChange} className='select'/>
                    </FormGroup>
                    {
                        flagnorek ? 
                        <FormGroup>
                            <Label for='no_rekening'>No Rekning</Label>
                            <Input type='number' name='no_rekening' tabIndex='2'/>
                        </FormGroup> : ''

                    }   
                    <FormGroup>
                        <Label for='bayar'>Bayar</Label>
                        <Input type='text' name='bayar' id='bayar' tabIndex='4' onKeyUp={(e)=> this.bayar(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='kembali'>Kembalian</Label>
                        <Input type='text' name='kembali' id='kembali' tabIndex='5' readOnly/>
                    </FormGroup>
                    <hr />
                    <Button type='button' color='success' tabIndex='6' onClick={this.simpan} size='sm' style={{ width: '100%'}}>Bayar</Button>
                </Form>
            </Modal>
        )
    }
}
