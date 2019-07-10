import React, { Component } from 'react';
import Modal from'layouts/list_modal';
import Tabel from 'components/tabel';
import { Button } from 'reactstrap';

export default class list_menu extends Component {

    action(){
        return <Button color='success' size='sm'>Tambah</Button>
    }
    render() {
        let { modal , mode , data } = this.props;
        return (
            <Modal title={'List Menu'} mode={mode} modal={modal}>
                <Tabel
                    data ={data}
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
            </Modal>
        )
    }
}
