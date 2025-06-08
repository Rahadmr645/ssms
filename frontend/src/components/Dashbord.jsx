import React, { useState } from 'react'
import { IoMdPersonAdd, IoIosChatbubbles } from "react-icons/io";
import { TbPhoneCalling } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";

const Dashbord = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFriend, setAddFriend] = useState('')
  return (
    <div style={{ position: 'relative' }}>
      {showAddForm ?
        <div className="parent-container">
          <form className='addForm'>
            <div className='adding-input'>
              <label htmlFor="email">
                Eamil
              </label>
              <input className='border-0 rounded p-1' type="email" placeholder='enter email' id='email' />
              <button style={{height:'25px',fontSize:'12px',display:'flex',alignItems:'center',justifyContent:'center'}} className='btn btn-outline-success '>Add</button>
            </div>
            <GiCancel onClick={() => setShowAddForm(false)} style={{ cursor: 'pointer' }} />
          </form>
        </div> : <></>
      }
      <nav className='d-flex justify-content-center gap-5 border border-danger ' style={{ height: '40vh' }}>
        profile
        <div className='d-flex gap-3'>
          <TbPhoneCalling style={{ cursor: 'pointer' }} />
          <IoIosChatbubbles style={{ cursor: 'pointer' }} />
          <IoMdPersonAdd  style={{ cursor: 'pointer' }} onClick={() => setShowAddForm(true)} />
        </div>
      </nav>
    </div>
  )
}

export default Dashbord