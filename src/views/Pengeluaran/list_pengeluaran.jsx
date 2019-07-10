import React from "react";
import Page from 'layouts/Page';
import Form from './form_pengeluaran';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';;

class Listpengeluaran extends React.Component {
  
  action(){
    return <ButtonAction />
  }

  render() {

    let data = [
      {
        tanggal: '2019-06-23',
        kelompokbiaya: 'Biaya Lain-Lain',
        kasir: 'Kasir 1',
        pickasir: 'Brian',
        jumlah: '100.000'
      },
      {
        tanggal: '2019-06-24',
        kelompokbiaya: 'Biaya Lain-Lain',
        kasir: 'Kasir 2',
        pickasir: 'Ikbal',
        jumlah: '200.000'
      },
      {
        tanggal: '2019-06-25',
        kelompokbiaya: 'Biaya Lain-Lain',
        kasir: 'Kasir 3',
        pickasir: 'Firmansyah',
        jumlah: '300.000'
      }
    ]

    return (
      <Page title={'Pengeluaran'}>
        <Form />
         <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'tanggal',
                text: 'Tanggal'
            },
            {
                dataField: 'kelompokbiaya',
                text: 'Jenis Biaya'
            },
            {
              dataField: 'kasir',
              text: 'Kasir'
            },
            {
              dataField: 'pickasir',
              text: 'PIC Kasir'
            },
            {
              dataField: 'jumlah',
              text: 'Jumlah Nominal'
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

export default Listpengeluaran;
