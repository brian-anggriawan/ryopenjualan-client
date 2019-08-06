import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import { Input , Table , Form , FormGroup , Label} from 'reactstrap';
import cuid from 'cuid';
import { apiGet } from 'app';
import Select from 'react-select';
import { Button } from 'semantic-ui-react';

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
                    <Table responsive style={{ width: '100%'}}>
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
                <Button color='success' type='button' size='sm' style={{ width: '100%'}}>Simpan</Button>
            </Modal>
        )
    }
}
