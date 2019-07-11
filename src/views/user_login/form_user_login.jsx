import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';
import Select from 'components/Select/select';

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
                            <Select  data={[
                                {
                                value:'1',
                                text: 'Administrator'
                                },
                                {
                                value:'2',
                                text: 'Administrator'
                                },
                                {
                                value:'2',
                                text: 'Kasir'
                                }
                            ]} name='userlevel' id='userlevel'/>
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
