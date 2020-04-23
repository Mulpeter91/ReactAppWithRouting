import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'; //replaced Link, with NavLink. Adds some more properties

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent'; 
//import NewPost from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost';

//This is code splitting or lazy loading.
//It only loads that javaScript when it's actually needed
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

//In React 16.6+ it's looks something like this: //see lecture 216 for more on this
//const NewPost = React.lazy(() => import ('./NewPost/NewPost'));
//you'd also need to include the { Suspense } object from React
//then the route would look something like:
//<Route path="/newPost" render={() => <Suspense fallback={<div>Loading...</div>}><NewPost</Suspense>} />

class Blog extends Component {

    state = {
        auth: true
    }

    render () {      
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* Use Link with React Router over anchor tags to stop a page refresh thereby reloading all our javaScript */}
                            {/* to can also take a dynamic content: to={} */}
                            <li><NavLink 
                                to="/posts/" 
                                exact
                                activeClassName="active"
                                activeStyle={{
                                    color: '#FA923F',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post', //adding this.props.match.url + 'path' makes the path relative, as 'to' will by default append the vale to your root domain
                                hash: '#exampleLocation', 
                                search: '?quick-submit-example=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* Switch only allows one route to be rendered OR always make unique urls */}
                <Switch>                    
                    {/* The path checks the PREFIX of the route, adding 'exact' requires an exact match */}
                    {/* <Route path="/home" exact render={() => <h1>Home</h1>}/> */}                         
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null} 
                    <Route path="/posts" component={Posts} />  
                    <Redirect from="/" to="/posts" />   
                    {/* <id is a placeholder and is replaced when routed to /something. This is why new-post is ahead, because they're rendered in order> */}
                    {/* <Route path="/:postId" exact component={FullPost} />       */}
                    {/* <Route render={() => <h1>Not Found</h1>} /> */} 
                </Switch> 
            </div>
        );        
    }
}

export default Blog;