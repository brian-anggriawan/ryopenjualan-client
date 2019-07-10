import React from "react";
import Page from 'layouts/Page';
import Form from './form_user_login';
import Tabel from 'components/tabel';
import ButtonAction from 'components/ButtonAction';

class Listuserlogin extends React.Component {

  action(){
    return <ButtonAction />
  }

  render() {

    let data = [
      {
        user: 'BrianWahyu',
        userlebel: 'Administrator',
        pass: '1234',
        id: 1
      },
      {
        user: 'Ikbal',
        userlevel: 'Owner',
        pass: '4321',
        id: 2
      },
      {
        user: 'Firmansyah',
        userlebel: 'Kasir',
        pass: '23654',
        id: 3
      }
    ]

    return (
      <Page title={'User Login'}>
        <Form />
         <Tabel
          data ={data}
          keyField = {'id'}
          columns ={[
            {
                dataField: 'user',
                text: 'Username'
            },
            {
              dataField: 'userlevel',
              text: 'User Level'
            },
            {
                dataField: 'pass',
                text: 'Password'
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

export default Listuserlogin;
