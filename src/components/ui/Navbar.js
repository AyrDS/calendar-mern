

const Navbar = () => {
    return (
        <div className='navbar navbar-dark bg-dark mb-4' >
            <span className='navbar-brand ms-3'>
                Javier
            </span>

            <button className='btn btn-outline-danger me-3' >
                <i className='fas fa-sign-out-alt me-2' ></i>
                <span>
                    Salir
                </span>
            </button>
        </div>
    )
}

export default Navbar;