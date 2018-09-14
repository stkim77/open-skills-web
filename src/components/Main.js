import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';
import {hideLoading, logout, showLoading} from "../actions";
import * as Util from '../common/Util';
import * as R from 'ramda';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles : []
        };

        this.fetchGetArticles = this.fetchGetArticles.bind(this);
    }

    componentDidMount() {
        this.fetchGetArticles();
    }

    render() {
        return (
            <div className='main'>
                <div className='header'>
                    <div onClick={()=>{Util.setUserInfo('');this.props.logout();}}>log-out</div>
                </div>
                <div className='contents'>
                    {R.addIndex(R.map)((article, index)=>{
                        return (
                            <div key={index} className='article_div'>
                                <Link to={'/article/'+article.id}>{article.title}</Link>
                            </div>
                        );
                    }, this.state.articles)}
                </div>
                {
                    !this.props.isLogged &&
                    <Route render={()=>(<Redirect to="/signin"/>)}/>
                }
            </div>
        );
    }

    fetchGetArticles = () => {
        const data = [
            {
                id : 'art_001',
                title : 'article001'
            },
            {
                id : 'art_002',
                title : 'article002'
            },
            {
                id : 'art_003',
                title : 'article003'
            },
            {
                id : 'art_004',
                title : 'article004'
            }
        ];

        this.setState({articles:data});
    };
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
