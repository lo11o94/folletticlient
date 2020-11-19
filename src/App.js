import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: "",
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    Redirect() {
        if (this.state.redirect) {
            window.history.pushState(this.state.username, 'FOLLETTI', '/estrazione/')
            return <Redirect to={{
                pathname: '/estrazione/',
                state: { username: this.state.username }
            }}/>
        }
    }

    handleSubmit(values) {
        if(values) {
            this.setState({
                redirect: true,
                username: values.username,
            })
        }
    }

    render() {
        document.title = 'FOLLETTI'
        return (
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 25}}>
                {this.Redirect()}
                <Form style={{width: 300}} onFinish={(values) => this.handleSubmit(values)}>
                    <Form.Item
                        id="username"
                        name="username"
                        rules={[{
                            required: true,
                            message: 'Immettere un username valido!',
                        }]}
                    >
                        <Input size="large" placeholder="Inserisci il tuo Username" prefix={<UserOutlined />} />
                    </Form.Item>

                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <Button type="primary" htmlType="submit">
                            Procedi
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default App;
