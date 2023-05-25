import React from 'react'
import './style/HomePage.css'
// import { NavLink } from 'react-router-dom'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
const HomePage = () => {
  const searchTrains=()=>{

  }
  return (
    <>
    <div className="header-fix">
  
   < img className="header-logo" src="download.jpeg" alt="train-logo"/>
   <span className="apni-yatra">Apni Yatra</span>
   <div className='header_search'>
          <input className='header_searchbox' type="text" placeholder="Search Your Trains"/>
          </div>
          <div>
          <SearchIcon className='header_searchIcon'/>
        </div>
 
    <AccountBoxIcon className="iconlagaya"/>
  

  
      </div>
    <div className='main-container'>
       <div className="booking">
        <div className="booking-ticket col-12">
         <span className="left-logo">
          <img className="img-left" src="https://www.irctc.co.in/nget/assets/images/logo_top_eng.jpg" alt="Azadi kaAmrit Mahotsav"/>
         </span>
         <label className="heading-font" >BOOK TICKET</label>
         <span className="pull-right">
          <img src="https://www.irctc.co.in/nget/assets/images/G20_Logo.png" alt="g-2 logo" className="h-logo"/>
         </span>
         <div className="search-from">
          <slect id="source-slect">
            <option value="disabled selected">Select Source Station</option>
          </slect>
          <select id="destination-select">
      <option value="disabled selected">Select destination station</option>
          </select>
          <button onClick={searchTrains}>Search</button>
         </div>
         <div className="input-enter">
        <div claasName="train-name">
          <label>Train Name </label>
          <input type="text" placeholder="Enter Your Train Name" />

        </div>
        <div className="Dep-time">
          <label>Departure Time</label>
          <input type="text" placeholder="Departure time is"/>
        </div>
        <div className="arr-time">
          <label>Arrival Time</label>
          <input type="text" placeholder="Arrival time is"/>
        </div>
        <div className="price">
          <label>Ticket Price</label>
          <input type="text" placeholder="Ticket price is"/>
        </div>


          
         </div>
        </div>
        </div> 
      
      
    </div>
   
    </>
  )
}

export default HomePage
