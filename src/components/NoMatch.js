import React from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends React.Component {
    render() {
        return (
            <div>
                <Link to='/' style={{ textDecoration: 'none' }}>go to Main page</Link>
            </div>
        );
    }
}

export default NoMatch;