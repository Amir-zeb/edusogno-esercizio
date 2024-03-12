import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {headerLogo} from '../assets/index';

function Header() {
    return (
        <Navbar>
            <Container>
                <div className='navbar-brand'>
                    <img src={headerLogo} alt='logo.png' width={103} height={52} className="img-fluid" />
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;