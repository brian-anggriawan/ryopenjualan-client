import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';

export default class form_pengeluaran extends Component {
    render() {
        return (
            <div>
                <Modal title={'Form Pengeluaran Biaya'}>
                    <Form>
                        <FormGroup>
                            <Label for='tanggal'>Tanggal</Label>
                            <Input type='date' name='tanggal' id='tanggal' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='jenisbiaya'>Jenis Biaya</Label>
                            <Input type='select' name='jenisbiaya' id='jenisbiaya'>
                                <option value= '0'>Pilih Jenis Biaya</option>
                                <option value= '1'>Biaya Lain Lain</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='nominal'>Nominal</Label>
                            <Input type='number' name='nominal' id='nominal'/>
                        </FormGroup>
                    </Form>
                </Modal>   
            </div>
        )
    }
}
