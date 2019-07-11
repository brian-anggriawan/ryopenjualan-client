import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';
import Select from 'components/Select/select';

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
                            <Select  data={[
                                {
                                value:'1',
                                text: 'Ecer'
                                },
                                {
                                value:'2',
                                text: 'Murah'
                                },
                                {
                                value:'3',
                                text: 'Lebih Murah'
                                },
                                {
                                value:'4',
                                text: 'Paling Murah'
                                }
                            ]} name={'biaya'} id={'biaya'}/>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        )
    }
}
