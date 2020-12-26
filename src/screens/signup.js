import React from 'react'
import wretch from 'wretch'
import { Form, Button, FormGroup, FormControl, FormLabel, Spinner } from 'react-bootstrap'
import { SignupRoute } from './../components/links/user'
import styles from './../components/stylingModules/formContainer.module.css'


class Signup extends React.Component {
            constructor(props){
            super(props);
            this.state = {
                token: '',
                email: '',
                password: '',
                confirmpass: '',
                isLoading: false,
            }
        }


        emailHandler = e => {
            this.setState({
                email: e.target.value
            })
        }

        passwordHandler = e => {
            this.setState({
                password: e.target.value
            })
        }

        confirmpasshandler = e => {
            this.setState({
                confirmpass: e.target.value
            })
        }

        onSubmit = async (event) => {
            console.log('START')
            try {
                const { email, password } = this.state
                this.setState({
                    isLoading: true
                })
                console.log({ email, password })
                let { token } = await wretch(SignupRoute).post({ email, password }).json()
                this.setState({
                    isLoading: false,
                    token
                })
                console.log(token)
            } catch (error) {
                alert(error)
                this.setState({
                    isLoading: false
                })
            }

        }

        render() {
            if (this.state.isLoading) {
                return (
                    <div className={styles.loading} style={{ height: window.innerHeight }}>
                        <Spinner animation="grow" />
                    </div>
                )
            } else return (
                <div className={styles.MainContainer} style={{ height: window.innerHeight }}>
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

                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                onChange={this.confirmpasshandler}
                                value={this.state.confirmpass}
                            />
                        </FormGroup>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Register
  </Button>
                    </Form>
                </div>
            );
        }
}

export default Signup