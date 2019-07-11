import React, { Component } from 'react';
import './main.css';
import './util.css';
import image from 'assets/img/img-01.png';
import { Button } from 'reactstrap';


class login extends Component {
    constructor(){
        super()
        this.state ={}
        this.Login = this.Login.bind(this);
    }
    

    Login(){
        let path = '/admin/dashboard';
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={image} alt="IMG" />
                    </div>
    
                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            Login
                        </span>
    
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="email" placeholder="Email"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
    
                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input className="input100" type="password" name="pass" placeholder="Password"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <Button className="login100-form-btn" onClick={this.Login}>
                                Login
                            </Button>
                        </div>
                        <div className="text-center p-t-136">
                            <p>
                                Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default login;
