//import React, { useContext } from 'react';

//import { Link } from "react-router"
import Navbar from "./Navbar"

//import { useNavigate } from 'react-router-dom';

const Header = ()=>{
    
    //let navigate = useNavigate();
    
    return (
        <header className="barra col-12">
            <div className="">
               <Navbar></Navbar>
                   
                
            </div>
        </header>
    )
}

export default Header