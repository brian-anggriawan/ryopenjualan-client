import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label , Row , Col  } from 'reactstrap';

export default class form_petugas extends Component {
    render() {
        return (
            <div>
                <Modal title={'Form Petugas Desain'}>
                    <Form>
                        <FormGroup>
                            <Label for='name'>Nama</Label>
                            <Input type='text' name='nama' id='name' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='bonus'>Bonus / (Persen)</Label>
                            <Row>
                                <Col sm='10'>
                                    <Input type='number' name='bonus' id='bonus'/>
                                </Col>
                                <Col sm='2'>
                                    <h3>%</h3>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        )
    }
}
