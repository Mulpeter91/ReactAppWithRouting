import React, { Component } from 'react';
import axios from '../../../axios';
//import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        //you can see in this logged object the react router adds useful meta data
        console.log(this.props);
        axios.get('/posts') 
            .then(  response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post, 
                        author: 'Rob'
                    }
                });
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log(error);
            });
    }

    postSelectedHandlder = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                //<Link to={'/posts/' + post.id} key={post.id} >
                    <Post 
                    title={post.title}
                    author={post.author}
                    key={post.id}
                    clicked={() => this.postSelectedHandlder(post.id)} />
                //</Link> 
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:postId'} exact component={FullPost}/>
            </div>           
        );
    }
}

export default Posts;