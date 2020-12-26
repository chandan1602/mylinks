import React from 'react'
import NavbarUtil from './../components/Navbar/Navbar'

class Attendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            token: localStorage.getItem('jwtToken'),
            email: localStorage.getItem('email'),
            data: null,
        }
    }

    handleLogout = () => {
        this.setState({
            token: '',
            email: '',
            isLoading: true,
        })
        console.log(localStorage.getItem('rememberMe'), typeof (localStorage.getItem('rememberMe')))
        if (localStorage.getItem('rememberMe') === 'true') {
            localStorage.removeItem('jwtToken')
        } else {
            localStorage.clear()
        }
        window.location = '/'
    }

    async componentDidMount() {
        if (localStorage.getItem('jwtToken') === null) {
            this.handleLogout();
        }
        if (this.state.email === '' || this.state.email===null)
            await this.fetchData()
    }

    render() {
        return(
            <div className="MainContainer">
                <NavbarUtil welcomeText={`Welcome ${localStorage.getItem('name')}`} logoutFn={this.handleLogout} />
                <h1>ATTENDANCE SCREEN</h1>
            </div>
        )
    }
}

export default Attendance