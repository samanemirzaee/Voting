
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap"
import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Connect from "../connect/connect";
import './navbar.css';
import { Web3Context } from "../context";
import { propTypes } from "react-bootstrap/esm/Image";


const NavbarComponent = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [listWinner, setListWinner] = useState([])


    useEffect(() => {
        console.log('1')
        if (web3States.contract) {
            console.log('2')
            web3States.contract.methods.condidateList().call({ from: web3States.account }).then(res => {
                let voteCount = 0
                res.map(i => {
                    if ((i['voteCount']) > voteCount) { voteCount = (i['voteCount']) }
                })
                setListWinner(res.map(i => {
                    if(i['voteCount']===voteCount) return i.name + " : " + i.voteCount + " " +"رای" +" * "
                }))
            })
        }
    }, [web3States.contract])


    return (
        <>
            <Navbar className='class-div fs-6 ' dir='rtl'>
                <Container>
                    <Navbar.Brand href="#home">رای گیری</Navbar.Brand>
                    <Nav className="me-5 ms-auto fst-normal ">
                        <Link className="nav-link" to="/">رای دادن</Link>
                        {web3States.isOwner ?
                            <NavDropdown title="مدیر" id="collasible-nav-dropdown">
                                <Link className="nav-link class-drop" to="/AddCondidate">کاندید جدید</Link>

                            </NavDropdown>
                            :
                            null
                        }

                    </Nav>
                    <Nav className="mx-auto">
                        <Nav.Link>
                            <Button  value="success">
                                {listWinner.length > 0 ? 
                                    listWinner
                                    : "منتخب"
                                }
                            </Button>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Connect />
                        </Nav.Link>
                    </Nav>

                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent