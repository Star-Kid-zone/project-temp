import React, { useEffect, useState } from "react";
import axios from "axios";
import Menuone from "../../Components/Menuone";
import Menutwo from "../../Components/Menutwo"; 
import Menuthree from "../../Components/Menuthree";
import { useParams } from 'react-router-dom';

export default function App() {
          const { id } = useParams(); // <-- get route param
    
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8082/api/menu/user/${id}`) // Replace with your actual API endpoint
      .then((response) => {
        setMenuItems(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return <Menuthree items={menuItems} />;
}
