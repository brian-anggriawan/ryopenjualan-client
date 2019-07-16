import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label } from 'reactstrap';
import Select from 'components/Select/select';

export default class form_jasa extends Component {
    render() {
        return (
            <div>
                <Modal title={'Form Jasa'}>
                    <Form>
                        <FormGroup>
                            <Label for='produk'>Nama Jasa</Label>
                            <Input type='text' name='produk' id='produk' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='kategori'>Kategori Produk</Label>
                            <Select  data={[
                                {
                                value:'1',
                                text: 'A1'
                                },
                                {
                                value:'2',
                                text: 'A2'
                                },
                                {
                                value:'3',
                                text: 'A3'
                                }
                            ]} name='kategori' id='kategori'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='satuan'>Satuan</Label>
                            <Select  data={[
                                {
                                value:'1',
                                text: 'PCS'
                                },
                                {
                                value:'2',
                                text: 'M3'
                                },
                                {
                                value:'3',
                                text: 'Pack'
                                }
                            ]} name='satuan' id='satuan'/>
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
