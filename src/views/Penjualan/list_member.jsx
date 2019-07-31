import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel';
import { Button } from 'reactstrap';

export default class list_member extends Component {

    constructor(){
        super()

        this.action = this.action.bind(this);
        this.proses = this.proses.bind(this);
    }

    proses(id){
        let { setMember , member , mode} = this.props;

        let data = member.filter( x => x.id  === id)[0];
        setMember(data.kode_pelanggan , data.nama_pelanggan , data.alamat,data.jenis_pelanggan);
        mode();
    }

    action(id){
        return <Button type='button' color='success' size='sm' onClick={()=> this.proses(id)}>Pilih</Button>
    }
    render() {
        let { mode , modal , member} = this.props;
        return (
            <Modal title={'List Member'} mode={mode} modal={modal}>
                 <Tabel
                    data ={member}
                    keyField = {'id'}
                    columns ={[
                    {
                        dataField: 'kode_pelanggan',
                        text: 'Kode Pelanggan'
                    },
                    {
                        dataField: 'nama_pelanggan',
                        text: 'Nama Pelanggan'
                    },
                    {
                        dataField: 'alamat',
                        text: 'Alamat'
                    },
                    {
                        dataField: 'jenis_pelanggan',
                        text: 'Jenis'
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
