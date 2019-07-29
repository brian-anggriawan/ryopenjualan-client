import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel';
import { Button } from 'reactstrap';
import { formatRupiah } from 'app';

export default class list_jasa extends Component {

    constructor(){
        super()

        this.action = this.action.bind(this);
        this.proses = this.proses.bind(this);
    }

    proses(id){
        let { setJasa , mode , jasa} = this.props;
        let data = jasa.filter(x => x.id === id)[0];
        setJasa(data);
        mode();
    }

    action(id){
        return <Button type='button' color='success' size='sm' onClick={()=> this.proses(id)}>Pilih</Button>
    }

    rupiah(nilai){
        return formatRupiah(nilai ,'');
    }


    render() {
        let { mode , modal , jasa} = this.props;
        return (
            <Modal title={'List Jasa'} mode={mode} modal={modal}>
                 <Tabel
                    data ={jasa}
                    keyField = {'id'}
                    columns ={[
                    {
                        dataField: 'kode_jasa',
                        text: 'Kode Jasa'
                    },
                    {
                        dataField: 'nama_jasa',
                        text: 'Nama Jasa'
                    },
                    {
                        dataField: 'jenis',
                        text: 'Jenis'
                    },
                    {
                        dataField: 'satuan',
                        text: 'Satuan'
                    },
                    {
                        dataField: 'harga_jual1',
                        formatter: this.rupiah,
                        text: 'Harga 1'
                    },
                    {
                        dataField: 'harga_jual2',
                        formatter: this.rupiah,
                        text: 'Harga 2'
                    },
                    {
                        dataField: 'id',
                        formatter: this.action,
                        text: 'Action'
                    }
                    ]}                            
                    width={{ width:'300px'}}
                />
            </Modal>
        )
    }
}
