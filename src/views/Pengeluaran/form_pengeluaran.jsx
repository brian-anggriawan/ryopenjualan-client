import React, { Component } from 'react';
import Modal from 'layouts/form_modal';
import { Input , Form , FormGroup , Label  } from 'reactstrap';
import Select from 'components/Select/select';
import serialize from 'form-serialize';
import { apiPost } from 'app';

export default class form_pengeluaran extends Component {
    constructor(){
        super()
        this.state={
    
        }
            this.save = this.save.bind(this);
    }
    
        save(){
            let data =  serialize(document.getElementById('pelanggan') ,{hash: true});
     
            if(this.props.flag === 1){
                data.id = this.props.edit.id;
                apiPost('supplier/edit' ,data)
                .then(res =>{
                  if (res) {
                    this.props.getData();
                  }
                })
            }else{
                apiPost('supplier/tambah' ,data)
                .then(res =>{
                  if (res) {
                    this.props.getData();
                  }
                })
            }
         }
    render() {
        let { modal , mode ,edit , flag , count } = this.props;
        return (
            <div>
                <Modal title={'Form Pengeluaran Biaya'} modal={modal} mode={mode} idform={'pengeluaran'} action={this.save}>
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
                </Modal>   
            </div>
        )
    }
}
