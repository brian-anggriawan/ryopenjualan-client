import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label } from 'reactstrap';

export default class form_jasa extends Component {
    render() {
        return (
            <div>
                <Modal title={'Form Produk'}>
                    <Form>
                        <FormGroup>
                            <Label for='produk'>Nama Produk</Label>
                            <Input type='text' name='produk' id='produk' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='kategori'>Kategori Produk</Label>
                            <Input type='select' name='kategori' id='kategori'>
                                <option value='0'>Pilih Kategori Produk</option>
                                <option value='1'>a3</option>
                                <option value='2'>a1</option>
                                <option value='3'>a2</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='satuan'>Satuan</Label>
                            <Input type='select' name='satuan' id='satuan'>
                                <option value='0'>Pilih Satuan</option>
                                <option value='1'>pcs</option>
                                <option value='2'>m3</option>
                                <option value='3'>Pack</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='hpp'>Harga Pokok</Label>
                            <Input type='number' name='hpp' id='hpp'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='harga1'>Harga Jual 1</Label>
                            <Input type='number' name='harga1' id='harga1'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='hpp'>Harga Jual 2</Label>
                            <Input type='number' name='harga2' id='harga2'/>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        )
    }
}
