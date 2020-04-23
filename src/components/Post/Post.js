import React from 'react';
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
    console.log(props);
    return(
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    )
};

//this wrapper will add the router meta data to the post props router object
export default withRouter(post);