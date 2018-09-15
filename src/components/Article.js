import React from 'react';
import * as Util from "../common/Util";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { hideLoading, logout, showLoading } from "../actions";
import { Link, Redirect, Route } from "react-router-dom";
import './Article.css';

class Article extends React.Component {

    render() {

        let data = Util.getArticleInfo(this.props.match.params.articleId);
        return (
            <div className='article'>
                <div className='header'>
                    <div>
                        <Link to={'/main'}>Main</Link>
                    </div>
                    <div onClick={()=>{Util.setUserInfo({});this.props.logout();}}>log-out</div>
                </div>
                <div className='contents'>
                    <h1>{data[0]}</h1>
                    <h6>{data[2]}</h6>
                    <p>{data[1]}</p>
                    
                </div>
                {
                    !this.props.isLogged &&
                    <Route render={()=>(<Redirect to="/signin"/>)}/>
                }
            </div>
        );
    }
}

Article.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);
