import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import Header from './header'
import TwitterList from './tweets_list'
import { Button } from 'antd';


class Tweet extends React.Component {
        constructor(props) {
          super(props);
          this.handleClick = this.handleClick.bind(this);
          this.listRef = React.createRef();
          this.headerRef = React.createRef();
        }

        handleClick(){
          this.headerRef.current.handleClick();
          this.listRef.current.setTweets(this.headerRef.current.state);
          //this.makeRequest()
        }

        makeRequest(){
          this.listRef.current.makeRequest(this.headerRef.current.state);
        }

        componentDidMount() {
          this.handleClick()
        }

        render() {
          return (
                <div>
                        <Header ref={this.headerRef}></Header>
                        <Button onClick={this.handleClick}>Search</Button>
                        <TwitterList ref={this.listRef}></TwitterList>
                </div>
          );
        }
      }
export default Tweet