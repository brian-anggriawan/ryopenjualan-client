import React, { Component } from 'react';
import Page from 'layouts/Page';
import { Input , Card , CardBody , CardTitle, Button} from 'reactstrap';
import { dataMenu } from 'app';
import './report.css';

export default class list_report extends Component {
    constructor(){
        super()
        this.state ={
            report:[],
            filter:''
        }
    }
    componentDidMount(){
        let data = dataMenu();
        let menu = data.filter( x=> x.group === 'report');

        this.setState({ report: menu });
    }

    render() {
        let { report , filter } =  this.state;
        let list = report.filter( x =>{
            return  x.name.toLowerCase().includes(filter.toLocaleLowerCase());
        })
        return (
            <Page title={'List Report'}>
                <Input type='text' placeholder='Cari Laporan' className='mb-4' onChange={(e)=> this.setState({ filter: e.target.value })} />
                <hr />
                {
                    list.map(x => (
                        <Card id='card' key={x.id}>
                            <CardBody >
                                <CardTitle id='title'>{x.name}</CardTitle>
                                <Button color='primary' type='button' size='sm'>Show Report</Button>
                            </CardBody>
                        </Card>
                    ))
                }
            </Page>
        )
    }
}
