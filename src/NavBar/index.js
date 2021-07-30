import React, { Component } from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavBarElements';

class Navbar extends Component {
    render() {
        return (
            <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to='/' activeStyle>
                        Home
                    </NavLink>
                    <NavLink to='/rexmat' activeStyle>
                        Rexmat
                    </NavLink>
                    <NavLink to='/puma' activeStyle>
                        Puma
                    </NavLink>
                </NavMenu>
            </Nav>
            </>
        );
    }
}

export default Navbar;