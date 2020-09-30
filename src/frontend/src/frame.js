import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import Header from './header'
import TwitterList from './tweets_list'
import { Button } from 'antd';


class Tweet extends React.Component {
        constructor(props) {
          super(props);
          this.state = { isToggleOn: true, tweets:[] };
          this.handleClick = this.handleClick.bind(this);
          this.listRef = React.createRef();
        }

        makeRequest() {
          axios.get(`http://127.0.0.1:8080?query_text=ps4&amount=5`)
            .then(res => {
                  //const res = res.data;
                  this.setState({ tweets:res.data });
                  //console.log('ok boy');
                  //console.log(this.state.tweets);
            })
        }

        handleClick(){
          this.listRef.current.makeRequest();
        }

        componentDidMount() {
          this.makeRequest()
        }

        render() {
          return (
                <div>
                        <Header></Header>
                        <TwitterList tweets={this.state.tweets} ref={this.listRef}></TwitterList>
                        <Button onClick={this.handleClick}>asdasdasd</Button>
                </div>
          );
        }
      }
export default Tweet