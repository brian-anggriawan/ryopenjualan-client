import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { optionTable } from 'app';


class Table extends React.Component{

    render(){
        let { data , keyField , columns } = this.props;
        return <ToolkitProvider
                    keyField={keyField}
                    data={ data }
                    columns={ columns }    
                >
                    {
                    props => (
                        <div>
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