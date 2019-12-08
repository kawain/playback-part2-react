import React, { Component } from 'react'
import {
    Navbar,
    Container,
    NavDropdown,
    Nav
} from 'react-bootstrap';

class PageNav extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar fixed="top" variant="dark" bg="primary" expand="lg">
                    <Container>
                        <Navbar.Brand href="./"><img src="./img/logo.svg" width="64" height="30" alt="Guitar practice" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="./">Home</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="./playback.html">コード進行・編集・再生</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="./metronome.html">メトロノーム</NavDropdown.Item>
                                    <NavDropdown.Item href="./tuning.html">チューニング</NavDropdown.Item>
                                    <NavDropdown.Item href="./quiz.html">指板の音当てクイズ</NavDropdown.Item>
                                    <NavDropdown.Item href="./basic.html">ランダム指板の音</NavDropdown.Item>
                                    <NavDropdown.Item href="./triad.html">ランダム・トライアド</NavDropdown.Item>
                                    <NavDropdown.Item href="./chord.html">ランダム・コード＆コードトーン</NavDropdown.Item>
                                    <NavDropdown.Item href="./scale.html">スケール</NavDropdown.Item>
                                    <NavDropdown.Item href="./howtowrite.html">コード進行記入例と説明</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default PageNav;