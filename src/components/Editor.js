import React from 'react';
import * as Util from "../common/Util";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { hideLoading, logout, showLoading } from "../actions";
import { Link, Redirect, Route } from "react-router-dom";
import './Editor.css';
const BASE_URL = "http://localhost:3000/";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdated :false
        };
        this.titleRef   = React.createRef();
        this.bodyRef    = React.createRef();
        this.fetchCreateArticle = this.fetchCreateArticle.bind(this);
    }
    
    fetchCreateArticle = () =>{
        this.props.showLoading();
        let user = Util.getUserInfo();
        const bodyJson = {
            id: user.id,
            pw: user.pw,
            title : this.titleRef.current.value,
            body: this.bodyRef.current.value
        };
        console.log(bodyJson);
        fetch(BASE_URL + 'article', {
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
                this.props.hideLoading();
                window.location = "/main"                
            })
            .catch(err=>{console.log(err);this.props.hideLoading();});
    }

    render() {
        return (
            <div className='article'>
                <div className='header'>
                    <div>
                        <Link to={'/main'}>Main</Link>
                    </div>
                    <div onClick={()=>{Util.setUserInfo('');this.props.logout();}}>log-out</div>
                </div>
                <div className='contents'>
                    <label for='titleInput'>Title</label><br/>
                    <input id="titleInput" type='text' className='title-area' defaultValue='' ref={this.titleRef} placeholder='Please Input Title' ></input><br/>
                    <label for='bodyInput'>Body</label><br/>
                    <textarea id="bodyInput" className='input-area' defaultValue='' ref={this.bodyRef}/><br/>
                    <input type='button' value="Create Article" onClick={()=>this.fetchCreateArticle()}></input>
                </div>
                {
                    !this.props.isLogged &&
                    <Route render={()=>(<Redirect to="/signin"/>)}/>
                }
            </div>
        );
    }
}


Editor.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
