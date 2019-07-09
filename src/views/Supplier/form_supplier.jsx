import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';

export default class form_supplier extends Component {
    render() {
        return (
            <div>
                <Modal title={'Form Supplier'}>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Nama</Label>
                            <Input type='text' name='nama' id='name' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='alamat'>alamat</Label>
                            <Input type='text' name='alamat' id='alamat'/>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        )
    }
}
