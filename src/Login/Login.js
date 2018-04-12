import React,{ Component } from 'react';

export class Login extends Component{
    state = {
        email:'',
        password:'',
        validEmail:true,
        loginFailed:false
    };

    constructor(props){
        super(props);
    }

    emailChanged = (event)=>{
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            email:event.target.value,
            validEmail:pattern.test(event.target.value)
        });
    }

    passwordChanged = (event)=>{
        this.setState({
            password:event.target.value
        });
    }

    submitForm = (event) =>{
        event.preventDefault();
        if(this.state.email == "taj.razak@gmail.com" && this.state.password == "asdf"){
            this.props.history.push('/home');
        }else{
            this.setState({
                loginFailed:true
            });
        }
    }

    render(){
        return(
            <div className="container">
                <form className="form-horizontal" onSubmit={this.submitForm}>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <h2>Please Login</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="form-group has-danger">
                                <label className="sr-only" htmlFor="email">E-Mail Address</label>
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon" style={{"width":"2.6rem"}}><i className="fa fa-at"></i></div>
                                    <input type="text" name="email" className="form-control" id="email"
                                        placeholder="you@example.com" onChange={this.emailChanged} required autoFocus/>
                                </div>
                            </div>
                        </div>
                        {this.state.validEmail?'':<div className="col-md-3">
                            <div className="form-control-feedback">
                                <span className="text-danger align-middle">
                                    <i className="fa fa-close"></i> Email is invalid
                                </span>
                            </div>
                        </div>}
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="password">Password</label>
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon" style={{"width":"2.6rem"}}><i className="fa fa-key"></i></div>
                                    <input type="password" name="password" className="form-control" id="password"
                                        placeholder="Password" onChange={this.passwordChanged} required />
                                </div>
                            </div>
                        </div>
                        {this.state.loginFailed?<div className="col-md-3">
                            <div className="form-control-feedback">
                                <span className="text-danger align-middle">
                                    <i className="fa fa-close"></i> Email or password incorrect.
                                </span>
                            </div>
                        </div>:''}
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6" style={{"paddingTop":".35rem"}}>
                            <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                                <label className="form-check-label">
                                    <input className="form-check-input" name="remember"
                                        type="checkbox" />
                                    <span style={{"paddingBottom": ".15rem"}}>Remember me</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{"paddingTop":"1rem"}}>
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-success"><i className="fa fa-sign-in"></i> Login</button>
                            {/* <a className="btn btn-link" href="/password/reset">Forgot Your Password?</a> */}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}