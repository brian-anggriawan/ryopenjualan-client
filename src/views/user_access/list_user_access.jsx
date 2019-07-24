import React from "react";
import Page from 'layouts/Page';
import { Button , Row ,Col} from 'reactstrap';
import Tabel from 'components/tabel';
import { IoMdTrash } from 'react-icons/io';
import List from './list_menu';
import { apiGet , apiPostGet , msgdialog , apiPost } from 'app';
import Select from 'react-select';
import Loading from 'components/Loading';


class Listuseraccess extends React.Component {
  constructor(){
    super()
    this.state = {
      modal: false,
      userlevel:[],
      access:[],
      loading: false,
      iduser:''
    }

    this.mode = this.mode.bind(this);
    this.handleChane = this.handleChane.bind(this);
    this.button = this.button.bind(this);
    this.delete = this.delete.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
      apiGet('user_level/result_data_user_level')
      .then(res =>{
        this.setState({ userlevel : res});
      })
  }

  button(id){
    return <Button color='danger' onClick={()=> this.delete(id)} size='sm'><IoMdTrash /></Button>
  }


  mode(){
    this.setState({ modal : !this.state.modal})
  }

  delete(id){
    let { iduser } = this.state;
    msgdialog('Hapus')
      .then(res =>{
        if (res) {
          this.setState({ loading: true });
          apiPost('list_menu/hapus' , { id: id })
          .then( res =>{
            if (res) {
              apiPostGet('list_menu/row_list_menu' ,{ id_user: iduser})
                .then(res =>{
                  this.setState({ access: res.data , loading: false })
                })
            }
          })
        }
      })
  }

  handleChane(e){
    this.setState({ loading : true});
    apiPostGet('list_menu/row_list_menu' ,{ id_user: e.value})
      .then(res =>{
        this.setState({ access: res.data , loading: false , iduser: e.value})
      })
  }

  refresh(){
    let { iduser } = this.state;
    this.setState({ loading : true , modal: false});

    this.setState({ loading : true});
    apiPostGet('list_menu/row_list_menu' ,{ id_user: iduser})
      .then(res =>{
        this.setState({ access: res.data , loading: false , iduser: iduser})
      }) 
  }

  render() {
    let { userlevel , access ,loading , modal , iduser } = this.state;
    return (
      <Page title={'User Access'}>
        <List mode={this.mode} modal={modal} iduser={iduser} refresh={this.refresh}/>
        <Row className='mb-3'>
          <Col className='mt-3'>
            <Select 
              className='select'
              options ={ userlevel.map(x =>({
                value: x.id,
                label: x.user_level
              }))}
              onChange={this.handleChane}
            />
          </Col>
          <Col>
            <Button color='success' onClick={this.mode}> Tambah</Button>
          </Col>
        </Row>
        {
          loading ? <Loading active={loading} />
          :
          <Tabel
            data ={access}
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
                dataField: 'id',
                formatter: this.button,
                text: 'Action'
              }
            ]}                            
              width={{ width:'300px'}}
          />
        }
      </Page>
    );
  }
}

export default Listuseraccess;
