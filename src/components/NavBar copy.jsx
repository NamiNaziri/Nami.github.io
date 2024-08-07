/* eslint-disable react/prop-types */
import {Navbar, NavbarContent, NavbarItem, Link,} from "@nextui-org/react";
import {useState } from 'react'

const navItems = [
    {
        name: 'Home',
        path:'/'
    },
    {
        name: 'CV',
        path:'cv'
    },
    {
        name: 'Contact',
        path:'contact'
    },
]


function NavBar({primary=0}) {

    const [currentPrimary, setCurrentPrimary]=useState(0)
    const handlePress = (id) => {
        //setCurrentPrimary(id)
    }

    return (
    <Navbar isBordered height="7vh">
      <NavbarContent justify="start">
            {
                navItems.map((item, i)=>
                {
                const color = primary === i ? 'primary' : 'foreground'
                // eslint-disable-next-line react/jsx-key
                return ( <NavbarItem ><Link onPressEnd={()=>{handlePress(i)}} color={color} href={item.path}>{item.name}</Link></NavbarItem >)
                })
            }
      </NavbarContent>
    </Navbar>
    );
}

export default NavBar