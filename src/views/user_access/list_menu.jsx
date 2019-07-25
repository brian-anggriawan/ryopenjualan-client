import React, { Component } from 'react';
import Modal from'layouts/list_modal';
import Tabel from 'components/tabel';
import { Button , Form  , Input} from 'reactstrap';
import menu from './menu';
import serialize from 'form-serialize';
import { apiPost } from 'app';

export default class list_menu extends Component {
    constructor(){
        super();
        this.state={}

        this.save = this.save.bind(this);
    }

    action(path){
        return <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                    <Input
                    className="custom-control-input"
                    id={path}
                    type="checkbox"
                    name='data'
                    value={path}
                    />
                    <label className="custom-control-label" htmlFor={path}>
                    Tambah
                    </label>
                </div>
    }

    save(){
        let data = serialize(document.getElementById('menu') , {hash: true}).data;
        let cek = typeof(data);
        if (cek === 'string') {
           let filter = menu.filter(x => x.path === data)[0];
           filter.id_user = this.props.iduser

           apiPost('list_menu/tambah',filter)
                .then(res =>{
                    if (res) {
                        this.props.refresh();
                    }
                })
        }else{
            let count = data.length;

            for (let i = 0; i < count; i++) {
               let hasil = menu.filter(x => x.path === data[i])[0];
               hasil.id_user = this.props.iduser

               apiPost('list_menu/tambah',hasil);
            }

            setTimeout(()=>{
                this.props.refresh();
            } , 3000)
        }
    }

    render() {
        let { modal , mode } = this.props;
        return (
            <Modal title={'List Menu'} mode={mode} modal={modal}>
                <Button color='success' type='button' onClick={this.save}>Tambah Menu</Button>
                <Form id='menu'>
                    <Tabel
                        data ={menu}
                        keyField = {'path'}
                        columns ={[
                            {
                                dataField: 'name',
                                text: 'Menu'
                            },
                            {
                                dataField: 'group',
                                text: 'Group Menu'
                            },
                            {
                                dataField: 'path',
                                formatter: this.action,
                                text: 'Action'
                            }
                        ]}                            
                            width={{ width:'300px'}}
                    />
                </Form>
            </Modal>
        )
    }
}
