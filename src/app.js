import sw from 'sweetalert2';
import axios from 'axios';

export let optionTable = {
    paginationSize: 5,
    pageStartIndex: 1,
    sizePerPage: 10,
    hideSizePerPage: true,
    prePage: 'Back',
    nextPageText: 'Next',
    prePageText: 'Back',
    showTotal: true
};

export let formatRupiah = (angka, prefix)=>{
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

/* Sweet Alert */
export let msgerror = (msg) =>{
    sw.fire({
    type: 'error',
    title: 'Oops...',
    text: msg
    })
}

export let msggagal = ()=>{
    sw.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Gagal'
        }) 
}

export let msgok =(msg , url)=>{
    sw.fire({
        type: "success",
        title: "Berhasil",
        text: msg  
    }).then(()=>{
        window.location.href = url
    })
}


export let msgdialog = (msg)=>{
   return sw.fire({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: msg
      }).then((result) => {
        return result.value
      })
}
/* Sweet Alert */

/* API Back end */

let urlServer = 'http://ababilsoft.com/ryoad/ryoad_api';

export let apiGet = (url) =>{
    return axios.get(`${urlServer}/${url}`)
         .then( res =>{
             return res.data.data
         })
}

export let apiGet1 = (url , param1) =>{
    return axios.get(`${urlServer}/${url}/${param1}`)
        .then( res =>{
            return res.data.data
        })
}

export let apiPost = (url , data) =>{

    return axios({
        method: 'POST',
        url: `${urlServer}/${url}`,
        data: JSON.stringify(data)
    })
    .then(res =>{
        return res.data.result
    })
}


/* API Back end */


