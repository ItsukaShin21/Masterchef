import Spinner from 'react-bootstrap/Spinner';

function Loader ({ text }) {
    return (
        <div className="container mt-5 recipe-list d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="info"/>
        <span className="loader-text">{ text }</span>
    </div>
    );
}

export default Loader;