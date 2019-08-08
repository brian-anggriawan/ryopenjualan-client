import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Table from 'components/tabel_pick';

export default class list_nota extends Component {
    render() {
        let { mode , modal } = this.props;
        return (
            <Modal title={'List Jasa'} mode={mode} modal={modal}>

            </Modal>
        )
    }
}
