import React from "react";
import Page from 'layouts/Page';
import { Input , Row , Col , Container} from 'reactstrap';

class Dashboard extends React.Component {
  constructor(){
    super()
    this.state = {
      data:[],
      search:''
    }
  }


  componentWillMount(){
    fetch('http://ababilsoft.com/penjualanku/penjualan/data_barang_result' , {
      method:'get',
      headers: {
        'Content-Type' :'aplication/json'
      }
    })
    .then(res => res.json())
    .then( data =>{
      this.setState({ data: data})
    })
  }

  render() {
    let { data , search} = this.state;

    let filter = data.filter (x =>{
      return x.kode_barang.toLowerCase().includes(search.toLocaleLowerCase())
    })
    return (
      <Page title={'Dashboard'}>
        <Row className='mb-4'>
          <Col>
            <Input type='text' placeholder='Nama Barang' onChange={(e)=> this.setState({ search: e.target.value })} />
          </Col>
        </Row>
        <Container>
        <Row>
          <ul>
            {
              filter.map(x =>(
                <li key={x.id}>{`${x.kode_barang} - ${x.nama_barang} - ${x.harga_jual}`}</li>
              ))
            }
          </ul>
        </Row>
        </Container>
      </Page>
    );
  }
}

export default Dashboard;
