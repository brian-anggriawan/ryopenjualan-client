import React, { Component } from 'react';
import Modal from 'layouts/form_modal_with_button';
import { Input , Form , FormGroup , Label  } from 'reactstrap';
import Select from 'components/Select/select';

export default class form_pelanggan extends Component {
    constructor(){
        super()
        this.state ={}

        this.test = this.test.bind(this);
    }


    test(e){

        let charCode = e.keyCode;
        if ( charCode === 13 )
        {
            e.keyCode = 9;
            return e.keyCode;
       }

    }

    render() {
        return (
            <div>
                <Modal title={'Form Pelanggan'}>
                    <Form id='pelanggan'>
                        <FormGroup>
                            <Label for='name'>Nama</Label>
                            <Input type='text' name='nama' id='1' onKeyDown={this.test} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='alamat'>alamat</Label>
                            <Input type='text' name='alamat' id='2' />
                        </FormGroup>
                        <FormGroup>
                            <Label for='biaya'>Level Harga</Label>
                            <Select onKeyDown={(e)=>this.test(e , 3)}  data={[
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
