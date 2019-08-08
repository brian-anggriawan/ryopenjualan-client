import React, { Component } from 'react';
import Modal from 'layouts/list_modal';

export default class form_pembayaran extends Component {
    render() {
        let { mode , modal } = this.props;
        return (
            <Modal title={'List Jasa'} mode={mode} modal={modal}>

            </Modal>
        )
    }
}
