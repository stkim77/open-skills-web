import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Article, SignIn, Main, NoMatch, Spinner } from '../components';
import { login, logout, showLoading, hideLoading } from '../actions';
import * as Util from '../common/Util';

class App extends React.Component {
    componentDidMount() {
        if (Util.getUserInfo()) {
            this.props.login();
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={()=>(<Redirect to="/main"/>)}/>
                        <Route path="/main" component={Main}/>
                        <Route path="/signin" component={SignIn}/>
                        <Route path="/article/:articleId" component={Article}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </BrowserRouter>
                {this.props.loading && <Spinner/>}
            </div>
        );
    }


}


App.propTypes = {
    login           : PropTypes.func.isRequired,
    logout          : PropTypes.func.isRequired,
    showLoading     : PropTypes.func.isRequired,
    hideLoading     : PropTypes.func.isRequired,
    loading         : PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        user    : state.user,
        loading : state.loading
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

export default connect(mapStateToProps, mapDispatchToProps)(App);