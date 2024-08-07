/* eslint-disable react/prop-types */
import {Navbar, NavbarContent, NavbarItem, Link,} from "@nextui-org/react";

const navItems = [
    {
        name: 'Home',
        path:'/'
    },
    {
        name: 'CV',
        path:'cv'
    },
    // {
    //     name: 'Contact',
    //     path:'contact'
    // },
]


function NavBar({primary=0}) {


    return (
    <Navbar isBordered >
      <NavbarContent >
            {
                navItems.map((item, i)=>
                {
                const color = primary === i ? 'primary' : 'foreground'
                // eslint-disable-next-line react/jsx-key
                return ( <NavbarItem key={i} className={'items-center mt-3'}><Link color={color} href={item.path}>{item.name}</Link></NavbarItem >)
                })
            }
      </NavbarContent>
    </Navbar>
    );
}

export default NavBar