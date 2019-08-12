import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import { Input , Table , Form , Row , Col } from 'reactstrap';
import cuid from 'cuid';
import { apiGet , apiPost , dataUser } from 'app';
import Select from 'react-select';
import { Button } from 'reactstrap';
import Serialize from 'form-serialize';
import Loading from 'components/Loading';

export default class form_proses_produksi extends Component {
    constructor(){
        super()
        this.state = {
            row:[],
            rowNota: [],
            rowCetak:[],
            bahan:[],
            loading: false
        }

        this.addRow = this.addRow.bind(this);
        this.dinamicRow = this.dinamicRow.bind(this);
        this.dinamicRowNota = this.dinamicRowNota.bind(this);
        this.simpan = this.simpan.bind(this);
        this.addRowNota = this.addRowNota.bind(this);
        this.addRowCetak = this.addRowCetak.bind(this);
        this.dinamicRowCetak = this.dinamicRowCetak.bind(this);
    }

    addRow(){
        let { row , bahan } = this.state;
        let id = cuid(10);
        let tanggal = new Date();
        let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;

        let copy = [ ...row];
            copy.push(
                <tr key={id}>
                    <td>
                        <Select options={bahan.map(x => ({
                            value: x.nama_jenis_bahan,
                            label: x.nama_jenis_bahan
                            }))}
                        name={`bahan${id}`} className='select' tabIndex={index + 1 } onKeyDown={(e)=> this.dinamicRow(e.keyCode , id)}/>
                    </td>
                </tr>
            )
        this.setState({ row: copy });
    }

    addRowNota(){
        let { rowNota } = this.state;
        let { nota } = this.props;
        let id = cuid(10);
        let tanggal = new Date();
        let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;

        let copy = [ ...rowNota];
            copy.push(
                <tr key={id}>
                    <td>
                        <Select options={nota.map(x => ({
                            value: x.no_nota,
                            label: x.no_nota
                            }))}
                        name={`nota${id}`} className='select' tabIndex={index + 1 } onKeyDown={(e)=> this.dinamicRowNota(e.keyCode , id)}/>
                    </td>
                </tr>
            )
        this.setState({ rowNota: copy });
    }

    addRowCetak(){
        let { rowCetak } = this.state;
        let id = cuid(10);
        let tanggal = new Date();
        let index = `${tanggal.getHours()}${tanggal.getMinutes()}${tanggal.getSeconds()}`;

        let copy = [ ...rowCetak];
            copy.push(
                <tr key={id}>
                    <td>
                        <Input type='text' name={`area${id}`} tabIndex={ index + 1} onKeyDown={(e)=> this.dinamicRowCetak(e.keyCode , id)}  />
                    </td>
                </tr>
            )
        this.setState({ rowCetak: copy });
    }

    dinamicRow(e ,id ){
        let index = this.state.row.findIndex( x => x.key === id) + 1;
        let count = this.state.row.length;

        if (e === 13 && index === count) {
            this.addRow();
        }
    }

    dinamicRowNota(e , id){
        let index = this.state.rowNota.findIndex( x => x.key === id) + 1;
        let count = this.state.rowNota.length;

        if (e === 13 && index === count) {
            this.addRowNota();
        }
    }

    dinamicRowCetak(e , id){
        let index = this.state.rowCetak.findIndex( x => x.key === id) + 1;
        let count = this.state.rowCetak.length;

        if (e === 13 && index === count) {
            this.addRowCetak();
        }
    }

    componentDidMount(){
       apiGet('operator_produksi/result_jenis_bahan')
            .then(res =>{
                this.setState({ bahan: res });
                this.addRow();
                this.addRowNota();
                this.addRowCetak();
            })
       
    }

    simpan(){
        let {  row , rowNota } = this.state;
        let { mode , refresh } = this.props;

        let header = Serialize(document.getElementById('nota') , { hash: true });
        let detail  = Serialize(document.getElementById('detail') , { hash : true });
        let area = Serialize(document.getElementById('area') , { hash : true });

        let arrayHd = [];
        let arrayDt = [];
        let arrayArea = [];

        row.map(x => (
            arrayDt.push({
                nama_jenis_bahan:detail[`bahan${x.key}`] || ''
            })
        ))

        let dt = arrayDt.filter(x => x.nama_jenis_bahan !== '');

        row.map(x => (
            arrayArea.push({
                area_cetak: area[`area${x.key}`]
            })
        ))

        let ar = arrayArea.filter(x => x.area !== '');


        rowNota.map(x =>(
            arrayHd.push({
                no_nota: header[`nota${x.key}`],
                operator: dataUser().username,
                produksi_area_detail: ar,
                produksi_bahan_detail: dt
            })  

        ))

        let data = {};
            data.header = arrayHd.filter(x => x.no_nota !== undefined);
        
        apiPost('operator_produksi/tambah' , data)
            .then(res =>{
                if (res) {
                    mode();
                    refresh();
                }
            })

    }

    render() {
        let { mode , modal } = this.props;
        let { row , rowNota , loading , rowCetak } = this.state;
        return (
            <Modal title={`Proses Produksi Nota`} modal={modal} mode={mode}>
                {
                    loading ? <Loading active={loading} />
                    :
                    <div>
                        <Form id='nota'>
                            <Table style={{ width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th>Nota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { rowNota }
                                </tbody>
                            </Table>
                        </Form>
                        <hr />
                        <Row>
                            <Col>
                                <Form id='area'>
                                    <Table style={{ width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th>Area Cetak</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { rowCetak }
                                        </tbody>
                                    </Table>
                                </Form>
                            </Col>
                            <Col>
                                <Form id='detail'>
                                    <Table style={{ width: '100%'}}>
                                        <thead>
                                            <tr>
                                                <th>Jenis Bahan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { row }
                                        </tbody>
                                    </Table>
                                </Form>
                            </Col>
                        </Row>
                        <Button onClick={this.simpan} color='success' type='button' size='sm' style={{ width: '100%'}}>Simpan</Button>
                    </div>
                }
            </Modal>
        )
    }
}
