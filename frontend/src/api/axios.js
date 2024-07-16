import axios from 'axios';
import ApplicationStore from '../utils/localStorageUtil';

const token = ApplicationStore().getStorage('token'); 
// const companyCode = ApplicationStore().getStorage('userCompany'); 
const empid= ApplicationStore().getStorage("empid");


export default axios.create({
    baseURL:'http://localhost:3006/api',
    headers: {
        'Content-Type':'application/json',
        "authorization" : `Bearer:${token}`,
        // "companycode":companyCode,
        "empid":empid
        
    } 
});




