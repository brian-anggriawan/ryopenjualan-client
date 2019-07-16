import React from "react";
import Page from 'layouts/Page';
import Form from './form_jasa';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class Listtarif extends React.Component {

  action(){
    return <ButtonAction />
  }

  render() {
    let data = [
      {
        produk: 'Banner',
        kategori: 'a3',
        satuan: 'pcs',
        hpp:'10.000',
        harga1:'20.000',
        harga2:'30.000'
      },
      {
        produk: 'Baliho',
        kategori: 'a2',
        satuan: 'pcs',
        hpp:'10.000',
        harga1:'20.000',
        harga2:'30.000'
      },
      {
        produk: 'Papan Ucapan',
        kategori: 'a1',
        satuan: 'pcs',
        hpp:'10.000',
        harga1:'20.000',
        harga2:'30.000'
      }
    ]
    return (
      <Page title={'Harga Jasa'}>
        <Form />
        <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'produk',
                text: 'Jasa'
            },
            {
                dataField: 'kategori',
                text: 'Kategori'
            },
            {
              dataField: 'satuan',
              text: 'Satuan'
            },
            {
              dataField: 'hpp',
              text: 'HPP'
            },
            {
              dataField: 'harga1',
              text: 'Harga 1'
            },
            {
              dataField: 'harga2',
              text: 'Harga 2'
            },
            {
              dataField: 'id',
              formatter: this.action,
              text: 'Action'
            }
          ]}                            
            width={{ width:'300px'}}
          />
      </Page>
    );
  }
}

export default Listtarif;
