import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';
import Select from 'components/Select/select';

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
                            <Select  data={[
                                {
                                value:'1',
                                text: 'Biaya Lain Lain'
                                },
                                {
                                value:'2',
                                text: 'Biaya Transportasi'
                                }
                            ]} name='jenisbiaya' id='jenisbiaya'/>
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
