import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';

export default class form_user_login extends Component {
    render() {
        return (
            <div>
                <Modal title={'Form User'}>
                    <Form>
                        <FormGroup>
                            <Label for='username'>Username</Label>
                            <Input type='text' name='username' id='username' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='userlevel'>User Level</Label>
                            <Input type='select' name='userlevel' id='userlevel' >
                                <option value='0'>Pilih User Lvel </option>
                                <option value='1'>Administrator </option>
                                <option value='2'>Owner </option>
                                <option value='3'>Kasir </option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <Input type='password' name='password' id='password'/>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        )
    }
}
