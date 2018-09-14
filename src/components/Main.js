import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import './Main.css';
import {hideLoading, logout, showLoading} from "../actions";
import * as Util from '../common/Util';

class Main extends React.Component {
    render() {
        return (
            <div className='main'>
                <div className='header'>
                    <div onClick={()=>{Util.setUserInfo('');this.props.logout();}}>log-out</div>
                </div>
                <div className='contents'>
                    main
                </div>
                {
                    !this.props.isLogged &&
                    <Route render={()=>(<Redirect to="/signin"/>)}/>
                }
            </div>
        );
    }
}

Main.propTypes = {
    isLogged        : PropTypes.bool.isRequired,
    logout          : PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        isLogged   : state.user.isLogged
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout          : () => dispatch(logout()),
        showLoading     : () => dispatch(showLoading()),
        hideLoading     : () => dispatch(hideLoading())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
