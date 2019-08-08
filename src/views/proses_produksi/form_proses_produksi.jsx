import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import { Input , Table , Form , FormGroup , Label} from 'reactstrap';
import cuid from 'cuid';
import { apiGet , apiPost , dataUser } from 'app';
import Select from 'react-select';
import { Button } from 'reactstrap';
import Serialize from 'form-serialize';

export default class form_proses_produksi extends Component {
    constructor(){
        super()
        this.state = {
            ket:'',
            row:[],
            bahan:[]
        }

        this.addRow = this.addRow.bind(this);
        this.dinamicRow = this.dinamicRow.bind(this);
        this.simpan = this.simpan.bind(this);
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

    dinamicRow(e ,id ){
        let index = this.state.row.findIndex( x => x.key === id) + 1;
        let count = this.state.row.length;

        if (e === 13 && index === count) {
            this.addRow();
        }
    }

    componentDidMount(){
       apiGet('operator_produksi/result_jenis_bahan')
            .then(res =>{
                this.setState({ bahan: res });
                this.addRow();
            })
       
    }

    simpan(){
        let { ket  , row } = this.state;
        let { mode , refresh , nonota } = this.props;

        let dt  = Serialize(document.getElementById('detail') , { hash : true });
        let data = {
            no_nota: nonota,
            operator:dataUser().username,
            area_cetak: ket
        };

        let arrayDetail = [];
        
        row.map(x => (
            arrayDetail.push({
                nama_jenis_bahan:dt[`bahan${x.key}`] || ''
            })
        ))

        let detail2 = arrayDetail.filter(x => x.nama_jenis_bahan !== '');
        data.detail = detail2;

        apiPost('operator_produksi/tambah' , data)
            .then(res =>{
                if (res) {
                    mode();
                    refresh();
                }
            })

    }

    render() {
        let { mode , modal , nonota } = this.props;
        let { row } = this.state;
        return (
            <Modal title={`Proses Produksi Nota ${nonota}`} modal={modal} mode={mode}>
                <FormGroup>
                    <Label for='area'>Area Cetak</Label>
                    <Input type='text' autoFocus={true} onChange={(e)=> this.setState({ ket: e.target.value })} />
                </FormGroup>
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
                <Button onClick={this.simpan} color='success' type='button' size='sm' style={{ width: '100%'}}>Simpan</Button>
            </Modal>
        )
    }
}
