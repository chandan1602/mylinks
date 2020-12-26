import React from 'react'
// import axios from 'axios'
import wretch from 'wretch'
import { Form, Button, FormGroup, FormControl, FormLabel, Spinner } from 'react-bootstrap'
import {loginRoute} from './../components/links/user'
import styles from './../components/stylingModules/formContainer.module.css'
import Paths from '../paths'
import TextButton from './../components/TextButton/button'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            token: '',
            email: '',
            password: '',
            rememberMe: false,
            isLoading : false,
        }    
        if(localStorage.getItem('rememberMe')==='true') {
            this.setState({
                email : localStorage.getItem('email'),
            }) 
        } else {
            this.setState({
                email : '',
                password : ''
            })
        }
    }

    emailHandler = e => {
        this.setState({
            email : e.target.value
        })
    }

    passwordHandler = e => {
        this.setState({
            password : e.target.value
        })
    }

    checkHandle = () => {
        this.setState({
            rememberMe: !this.state.rememberMe
        })
    }

    onSubmit = async (event) => {
        console.log('START')        
        try {            
            const {email, password} = this.state
            this.setState({
                isLoading : true
            })
            localStorage.setItem('rememberMe', this.state.rememberMe)
            localStorage.setItem('email', email)
            console.log({email, password})
            let {token} = await wretch(loginRoute).post({email, password}).json()
            this.setState({
                isLoading : false,
                token
            })
            localStorage.setItem('jwtToken', token)
            this.props.history.push('/home'/*, { some: 'state' }*/)
        } catch (error) {
            alert(error)
            this.setState({
                isLoading : false
            })
        }
        
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div className={styles.loading} style={{ height: window.innerHeight }}>
                    <Spinner animation="grow" />
                </div>
            )
        } else return (
            <div className={styles.MainContainer} style={{height: window.innerHeight}}>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup controlId="formBasicEmail">
                        <FormLabel>Email address</FormLabel>
                        <FormControl 
                            type="email" 
                            placeholder="Enter email"
                            onChange={this.emailHandler}
                            value={this.state.email}
                            />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
    </Form.Text>
                    </FormGroup>

                    <FormGroup controlId="formBasicPassword">
                        <FormLabel>Password</FormLabel>
                        <FormControl 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.passwordHandler}
                            value={this.state.password}
                            />
                    </FormGroup>
                    <FormGroup controlId="formBasicCheckbox">
                        <Form.Check 
                            type="checkbox" 
                            label="Remember me" 
                            onClick={this.checkHandle}
                            />
                    </FormGroup>
                    <Button 
                        variant="primary" 
                        type="submit"
                        >
                        Submit
  </Button>
                </Form>
                <div><p></p></div>
                <div className="buttonGroups">
                    <TextButton path={Paths.Signup} Name={'REGISTER NOW'} />
                    <TextButton path={Paths.ForgotPassword} Name={'RESET PASSWORD'} />
                </div>
            </div>
        );
    }
}

export default Login