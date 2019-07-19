import React from 'react';
import { HashLoader
} from 'react-spinners';

let Loading = ({ active }) =>{
    return(
        <div className='sweet-loading d-flex justify-content-center'>
            <HashLoader
            sizeUnit={"px"}
            size={200}
            color={'#2ca8ff'}
            loading={active}
            />
        </div> 
    )
}


export default Loading;