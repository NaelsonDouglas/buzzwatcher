import React from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { PageHeader, Button } from 'antd';


class Header extends React.Component {
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
                        <PageHeader
                        ghost={false}
                        title="Title"
                        extra={[
                                <Button key="3">Operation</Button>,
                                <Button key="2">Operation</Button>,
                                <Button key="1" type="primary">
                                Primary
                                </Button>,
                        ]}
                        >
                        </PageHeader>
                </div>
          );
        }
      }
export default Header