import React from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import Header from './header'
import TwitterList from './tweets_list'


class Tweet extends React.Component {
        constructor(props) {
          super(props);
          this.state = { isToggleOn: true };
          this.handleClick = this.handleClick.bind(this);
        }
        handleClick() {
          this.setState(state => ({
            isToggleOn: !state.isToggleOn
          }));
        }
        render() {
          return (
                <div>
                        <Header></Header>
                        <TwitterList></TwitterList>
                </div>
          );
        }
      }
export default Tweet