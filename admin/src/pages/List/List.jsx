import React, { useEffect, useState } from 'react'
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url = 'http://localhost:4000';
  const [List,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/item/list`);
    console.log(response.data);
    
    if (response.data.success) {
      setList(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList();
  
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Item List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b></b>
          <b></b>
          <b></b>
          <b></b>
          <b></b>
        </div>
      </div>
    </div>
  )
}

export default List
