import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';
import {hideLoading, logout, showLoading} from "../actions";
import * as Util from '../common/Util';
import * as R from 'ramda';
import './Main.css';

const BASE_URL = "http://localhost:3000/";

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
                                <Link to={'/article/'+article[3]+"|"+index}>{article[0]+" By "+article[2]}</Link>
                            </div>
                        );
                    }, this.state.articles)}
                </div>
                <div className='new-article'>   
                    <Link to={'/article/editor'}>New Article</Link>
                </div>
                {
                    !this.props.isLogged &&
                    <Route render={()=>(<Redirect to="/signin"/>)}/>
                }
            </div>
        );
    }
//<input type='button' value='NEW ARTICLE'></input>
    fetchGetArticles = () => {
        this.props.showLoading();
        fetch(BASE_URL + 'articles', {
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode : 'cors',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.props.hideLoading();
                const data = responseJson;
                data.map((x,i)=>{
                    Util.setArticleInfo(x[3]+"|"+i, x);
                })
                this.setState({articles:data});  
            })
            .catch(err=>{console.log(err);this.props.hideLoading();});



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
