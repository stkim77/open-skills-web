import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { login, logout, showLoading, hideLoading } from "../actions";
import * as Util from '../common/Util';
import './SignIn.css';

const BASE_URL = "http://localhost:3000/";

const MODE = {
    SIGNIN          : 'SIGNIN',
    CREATE_ACCOUNT  : 'CREATE_ACCOUNT',
};

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode : MODE.SIGNIN
        };

        this.emailRef       = React.createRef();
        this.passwordRef    = React.createRef();

        this.createSingInFormHtml   = this.createSingInFormHtml.bind(this);
        this.clickSubmit            = this.clickSubmit.bind(this);
        this.fetchCreateAccount     = this.fetchCreateAccount.bind(this);
        this.fetchLogInAccount      = this.fetchLogInAccount.bind(this);
        this.clickCancelBtn         = this.clickCancelBtn.bind(this);
        this.changeMode             = this.changeMode.bind(this);
    }

    render() {
        return (
            <div className='singin'>
                {
                    !this.props.isLogged &&
                    this.createSingInFormHtml()
                }
                {
                    this.props.isLogged &&
                    <Route render={()=>(<Redirect to="/main"/>)}/>
                }
            </div>
        );
    }

    createSingInFormHtml = () => {
        const title     = this.state.mode===MODE.SIGNIN ? 'LOG-IN' : 'CREATE ACCOUNT';
        const btnLabel  = this.state.mode===MODE.SIGNIN ? 'Log-In' : 'CREATE';

        return (
            <div className='singin_main'>
                <div className='logo'>로고</div>
                <div className='signin_form'>
                    <div className='signin_title'>{title}</div>
                    <form onSubmit={this.clickSubmit}>
                        <div className='input_div'>
                            <div>{'E-mail :'}</div>
                            <input type='email' defaultValue='' ref={this.emailRef} placeholder='example@example.com' />
                        </div>
                        <div className='input_div'>
                            <div>{'Password :'}</div>
                            <input type='password' defaultValue='' ref={this.passwordRef} />
                        </div>
                        <div className='submit_div'>
                            {
                                this.state.mode===MODE.CREATE_ACCOUNT &&
                                <input type='button' value='Cancel' onClick={()=>this.changeMode(MODE.SIGNIN)}/>
                            }
                            <input type='submit' value={btnLabel}/>
                        </div>
                    </form>
                </div>
                {
                    this.state.mode===MODE.SIGNIN &&
                    <div className='createLabel' onClick={()=>this.changeMode(MODE.CREATE_ACCOUNT)}>
                        create account
                    </div>
                }
            </div>
        );
    };

    clickSubmit = (event) => {
        event.preventDefault();
        if (MODE.CREATE_ACCOUNT === this.state.mode ) {
            this.fetchCreateAccount(this.emailRef.current.value, this.passwordRef.current.value);
        } else {
            this.fetchLogInAccount(this.emailRef.current.value, this.passwordRef.current.value);
        }
    };

    clickCancelBtn = () => {};

    changeMode = (mode) => {
        this.setState({mode});
    };

    fetchCreateAccount = (id, pw) => {
        this.props.showLoading();
        const bodyJson = {id, pw};
        console.log(bodyJson);
        fetch(BASE_URL + 'user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode : 'cors',
            body : JSON.stringify(bodyJson)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(responseJson.result);
                this.props.hideLoading();
                Util.setUserInfo('true');
                this.props.login();
            })
            .catch(err=>{console.log(err);this.props.hideLoading();});
    };

    fetchLogInAccount = (id, pw) => {
        this.props.showLoading();
        const bodyJson = {id, pw};
        console.log(bodyJson);
        fetch(BASE_URL + 'user/login', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode : 'cors',
            body : JSON.stringify(bodyJson)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(responseJson.result);
                this.props.hideLoading();
                Util.setUserInfo('true');
                this.props.login();
            })
            .catch(err=>{console.log(err);this.props.hideLoading();});
    };

}

SignIn.propTypes = {
    isLogged        : PropTypes.bool.isRequired,
    showLoading     : PropTypes.func.isRequired,
    login           : PropTypes.func.isRequired,
    logout          : PropTypes.func.isRequired,
    hideLoading     : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        isLogged   : state.user.isLogged
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login           : (user) => dispatch(login(user)),
        logout          : () => dispatch(logout()),
        showLoading     : () => dispatch(showLoading()),
        hideLoading     : () => dispatch(hideLoading())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
