import React, { Component } from 'react';
import Page from 'layouts/Page';
import Tabel from 'components/tabel';
import { apiGet , formatRupiah } from 'app';
import { Button } from 'reactstrap';
import Form from './form_hutang';

export default class list_hutang extends Component {
    constructor(){
        super()
        this.state = {
            nota:[],
            modal: false,
            title:''
        }
        this.button = this.button.bind(this);
        this.mode = this.mode.bind(this);
        this.bayar = this.bayar.bind(this);
    }

    componentDidMount(){
        apiGet('pembayaran_hutang/result_data_pembayaran_hutang')
            .then(res =>{
                this.setState({ nota: res });
            })
    }

    mode(){
        this.setState({ modal: !this.state.modal });
    }

    bayar(id){
        let data = this.state.nota.filter( x => x.id === id)[0]; 
        this.setState({ title: data.no_nota});
        this.mode();
    }

    button(id){
        return <Button type='button' color='success' onClick={()=> this.bayar(id)} size='sm'>Bayar</Button>
    }

    formatUang(nilai){
        return formatRupiah(nilai,'');
    }

    render() {
        let { nota , modal , title} = this.state;
        return (
            <Page title='List Hutang'>
                <Form modal={modal} mode={this.mode} title={title} />
                 <Tabel
                    data ={nota}
                    keyField = {'id'}
                    columns ={[
                        {
                            dataField: 'tanggal',
                            text: 'Tanggal'
                        },
                        {
                            dataField: 'no_nota',
                            text: 'No Nota'
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
                            dataField: 'no_telepon',
                            text: 'No Telp'
                        },
                        {
                            dataField: 'total_harga',
                            text: 'Total Harga',
                            formatter: this.formatUang
                        },
                        {
                            dataField: 'bayar',
                            text: 'DP',
                            formatter: this.formatUang
                        },
                        {
                        dataField: 'id',
                        formatter: this.button,
                        text: 'Action'
                        }
                    ]}                            
                        width={{ width:'300px'}}
                    />
            </Page>
        )
    }
}
