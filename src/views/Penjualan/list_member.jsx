import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Tabel from 'components/tabel_pick';
import { Button , Input } from 'reactstrap';

export default class list_member extends Component {
    constructor(){
        super()
        this.state = { value: ''}

        this.action = this.action.bind(this);
        this.proses = this.proses.bind(this);    
    }

    proses(id){
        let { setMember , member , mode} = this.props;

        let data = member.filter( x => x.id  === id)[0];
        setMember(data.kode_pelanggan , data.nama_pelanggan , data.alamat,data.jenis_pelanggan);
        this.setState({ value:''})
        mode();
    }
    


    action(id){
        return <Button type='button' color='success' size='sm' onClick={()=> this.proses(id)}>Pilih</Button>
    }
    render() {
        
        let { mode , modal , member } = this.props;
        let { value } = this.state;

        let filter = member.filter(x => {
            return x.kode_pelanggan.toLowerCase().includes(value.toLowerCase())
        });

        let pick = (e) =>{
           if (e === 13) {
               this.proses(filter[0].id)
           }
        }

        return (
            <Modal title={'List Member'} mode={mode} modal={modal}>
                <div className='mb-3'>
                    <Input autoFocus={true} type='text' placeholder='Kode Member' onKeyUp={(e)=> pick(e.keyCode)} onChange={(e)=> this.setState({ value: e.target.value  })} value={value} />
                </div>
                 <Tabel
                    data ={filter}
                    keyField = {'id'}
                    field={'nama_pelanggan'}
                    action={this.pick}
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
                />
            </Modal>
        )
    }
}
