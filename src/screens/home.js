import React from 'react'
import {Alert, Button, Spinner} from 'react-bootstrap';
import styles from './../components/stylingModules/formContainer.module.css'
import wretch from 'wretch'
import Links from './../components/links/user'
import NavbarUtil from './../components/Navbar/Navbar'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : localStorage.getItem('name'),
            isLoading : false,
            token : localStorage.getItem('jwtToken'),
            email : localStorage.getItem('email'),
            data : localStorage.getItem('data'),
        }
    }

    getName = (email) => {
        let name = ''
        let i = 0;
        while (email[i] !== '@') {
            name += email[i]
            i += 1
        }
        localStorage.setItem('name', name)
        return name
    }

    fetchData = async () => {
        try {
            this.setState({
                isLoading : true
            })
            let { email, data } = await wretch(Links.requestData).auth(`Bearer ${this.state.token}`).get().json()
            this.setState({
                data,
                email,
                name : this.getName(email),
                isLoading: false
            })
            localStorage.setItem('email', email)
            localStorage.setItem('data', data)
        } catch (error) {
            this.handleLogout()        
        }
    }

    async componentDidMount() {
        if(localStorage.getItem('jwtToken')===null) {
            this.handleLogout();
        }
        console.log('Name : ', this.state.name, ' Token : ', this.state.token, ' EMAIL : ', this.state.email, ' DATA : ', this.state.data)
        if(this.state.name==='' || this.state.name===null || this.state.data==='' || this.state.email==='' || this.state.data === null) 
            await this.fetchData()
    }

    handleLogout = () => {
        this.setState({
            token : '',
            email : '',
            name : '',
            isLoading : true,
        })
        console.log(localStorage.getItem('rememberMe'), typeof (localStorage.getItem('rememberMe')))
        if (localStorage.getItem('rememberMe')==='true') {
            localStorage.removeItem('jwtToken')
        } else {
            localStorage.clear()
        }
        window.location = '/'
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className={styles.loading} style={{ height: window.innerHeight }}>
                    <Spinner animation="grow" />
                </div>
            )
        } else return(
            <div className='MainContainer' style={{display: 'flex', alignItems: 'center', alignContent: 'center',justifyContent: 'space-between', flexDirection: 'column'}}>
                {/* <Alert variant='success' style={{display:'flex' , flex: 2, justifyContent: 'space-between', alignItems: 'center', width: window.innerWidth}}>
                    <h4>Welcome  <b>{this.state.name}</b></h4>
                    <Button variant="outline-success" onClick={this.handleLogout}>LOGOUT</Button>
                </Alert> */}
                <NavbarUtil welcomeText={`Welcome ${this.state.name}`} logoutFn={this.handleLogout}/>
                <h1>HOME SCREEN</h1>
            </div>
        )
    }
}

export default Home