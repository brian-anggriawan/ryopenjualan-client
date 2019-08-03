import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { optionTable } from 'app';
import {Input} from 'reactstrap';


class Table extends React.Component{
    constructor(){
        super()
        this.state = { value: ''}
    }

    test=(e)=>{
        this.setState({ value: e })
    }
    render(){
        let { value } = this.state;
        let HandleChange=(props)=>{
            let halo = (e)=>{
                this.test(e.target.value);
                props.onSearch(value);
            }
            return (
                <Input
                    className="form-control mb-3"
                    type="text"
                    onChange={(e)=> halo(e)}
                    value={value}
                    autoFocus
                    placeholder='Search'
                />
            )
        }
        return <ToolkitProvider
                    keyField={this.props.keyField}
                    data={ this.props.data }
                    columns={ this.props.columns }
                    search      
                >
                    {
                    props => (
                        <div>
                            <div className='float-right'>
                                <HandleChange { ...props.searchProps } style={this.props.width} />
                            </div>
                            <div className="table-responsive">
                                <BootstrapTable pagination ={paginationFactory(optionTable)}
                                    { ...props.baseProps }
                                    striped
                                
                                />   
                                
                            </div>
                        </div>
                    )
                    }
                </ToolkitProvider>
    }
}

export default Table