import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_ico from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";

const Navbar = () => {
  const navref = useRef();
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY>=80){
        navref.current.classList.add('nav-dark')
      }else{
        navref.current.classList.remove('nav-dark')
        
      }
    })
  },[])
  return (
    <div ref={navref} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV-Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My list</li>
          <li>Browse by language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt=" " className="icons" />
        <p>children</p>
        <img src={bell_icon} alt=" " className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt=" " className="profile" />
          <img src={caret_ico} alt=" " />
          <div className="dropdown">
            <p onClick={()=>{
              {logout()}
            }}> Sign out of the netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

//3213
export default Navbar;
