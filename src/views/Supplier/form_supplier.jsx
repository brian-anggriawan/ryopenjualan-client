import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , FormGroup , Label  } from 'reactstrap';

export default class form_supplier extends Component {
    render() {
        let { modal , mode} = this.props;
        return (
            <div>
                <Modal title={'Form Supplier'} modal={modal} mode={mode}>
                    <FormGroup>
                        <Label for='name'>Nama</Label>
                        <Input type='text' name='nama' id='name' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='alamat'>alamat</Label>
                        <Input type='text' name='alamat' id='alamat'/>
                    </FormGroup>
                </Modal>
            </div>
        )
    }
}
