import React, { Component } from 'react';
import Page from 'layouts/Page';
import Tabel from 'components/tabel';
import { apiGet , formatRupiah , apiGet1 } from 'app';
import { Button} from 'reactstrap';
import Form from './form_hutang';
//import classnames from 'classnames';

export default class list_hutang extends Component {
    constructor(){
        super()
        this.state = {
            nota:[],
            modal: false,
            title:'',
            tab: '1',
            dataNota:[],
            dataBayar:[],
            loading: false
        }
        this.button = this.button.bind(this);
        this.mode = this.mode.bind(this);
        this.bayar = this.bayar.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.refreshnota = this.refreshnota.bind(this);
    }

    componentDidMount(){
        apiGet('pembayaran_hutang/result_data_pembayaran_hutang')
            .then(res =>{
                this.setState({ nota: res });
            })
    }

    toggle(value){
        let { tab } = this.state;

        if (tab !== value) {
            this.setState({ tab: value });
        }

    }

    mode(){
        this.setState({ modal: !this.state.modal });
    }

    bayar(id){
        let data = this.state.nota.filter( x => x.id === id)[0]; 
        apiGet1('pembayaran_hutang/row_data_pembayaran_hutang' , id)
            .then(res =>{
                this.setState({ title: data.no_nota , dataNota: data , dataBayar: res });
                this.mode();  
            });
        
    }

    refreshnota(data){
        this.setState({ dataBayar: data });
    }

    button(id){
        return <Button type='button' color='success' onClick={()=> this.bayar(id)} size='sm'>Bayar</Button>
    }

    formatUang(nilai){
        return formatRupiah(nilai,'');
    }

    setLoading(){
        this.setState({ loading: !this.state.loading });
    }

    render() {
        let { nota , modal , title , dataBayar , dataNota , loading } = this.state;
        return (
            <Page title='List Hutang'>
                <Form modal={modal} mode={this.mode} title={title} dataBayar={dataBayar} nota={dataNota} loading={loading} setloading={this.setLoading} refresh={this.refreshnota} />
                {/* <Nav tabs className='mb-3'>
                    <NavItem>
                        <NavLink
                             className={classnames({ active: tab === '1' })}
                             onClick={() => { this.toggle('1'); }}
                        >
                            Kredit
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                             className={classnames({ active: tab === '2' })}
                             onClick={() => { this.toggle('2'); }}
                        >
                            Lunas
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={tab}>
                    <TabPane tabId='1'>
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
                    </TabPane>
                    <TabPane tabId='2'>
                        Haloo
                    </TabPane>
                </TabContent> */}
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
