import React, { Component } from 'react';
import Modal from 'layouts/list_modal';

export default class form_hutang extends Component {
    render() {
        let { modal , mode , title } = this.props;
        return (
            <Modal modal={modal} mode={mode} title={title} >
                TEST
            </Modal>
        )
    }
}
