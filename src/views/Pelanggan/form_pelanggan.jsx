import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';

export default class form_pelanggan extends Component {
    render() {
        return (
            <div>
                <Modal title={'Form Pelanggan'}>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Nama</Label>
                            <Input type='text' name='nama' id='name' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='alamat'>alamat</Label>
                            <Input type='text' name='alamat' id='alamat'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='biaya'>Level Harga</Label>
                            <Input type='select' name='biaya' id='biaya'>
                                <option value='0'>Pilih Level</option>
                                <option value='1'>Ecer</option>
                                <option value='2'>Murah</option>
                                <option value='3'>Lebih Murah</option>
                                <option value='4'>Paling Murah</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        )
    }
}
