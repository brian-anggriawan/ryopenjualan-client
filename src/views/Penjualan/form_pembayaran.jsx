import Modal from 'layouts/list_modal';
import React, { Component } from 'react';
import { FormGroup , Label , Input ,Button , Form } from 'reactstrap';
import Select from 'react-select';

export default class form_pembayaran extends Component {
    constructor(){
        super()
        this.state ={
            flagnorek: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        if (e.value === 'TRANSFER' || e.value === 'EDC') {
            this.setState({ flagnorek: true });
        }else{
            this.setState({ flagnorek: false });
        }
    }

    render() {
        let { modal , mode} = this.props;
        let { flagnorek } = this.state;
        return (
            <Modal modal={modal} mode={mode} title={'Pembayaran'}>
                <Form>
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
                        <Label for='total_harga'>Total Harga</Label>
                        <Input type='text' name='total_harga' tabIndex='3'  readOnly/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='bayar'>Bayar</Label>
                        <Input type='text' name='bayar' tabIndex='4'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='kembali'>Kembalian</Label>
                        <Input type='text' name='kembali' tabIndex='5'/>
                    </FormGroup>
                    <hr />
                    <Button type='button' color='success' tabIndex='6' size='sm' style={{ width: '100%'}}>Bayar</Button>
                </Form>
            </Modal>
        )
    }
}
