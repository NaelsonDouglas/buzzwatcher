import React from 'react';

class Tweet extends React.Component {
        constructor(props) {
          super(props);
          this.state = { isToggleOn: true };
          this.state.text = this.props.tweet.Tweets
          this.state.likes = this.props.tweet.Likes
          this.state.sentiment = this.props.tweet.sentiment
          // Aqui utilizamos o `bind` para que o `this` funcione dentro da nossa callback
          this.handleClick = this.handleClick.bind(this);
        }
        handleClick() {
          this.setState(state => ({
            isToggleOn: !state.isToggleOn
          }));
        }
        render() {
          return (
                <div className="tweet">
                        <div>
                        {this.state.text}
                        </div>
                        <div>
                        {this.state.likes}
                        </div>
                        <div>
                        {this.state.sentiment}
                        </div>
                </div>
          );
        }
      }
export default Tweet