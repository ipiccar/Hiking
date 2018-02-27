import React, { Component } from 'react';
import {View} from "react-native";
import { Header, Card, CardSection, Input, Button } from "./common/Index";

class LoginForm extends Component {

    state={name:'', address:''};

    render() {
        return (
            <View>
            <Header headerText='Login'/>
                <Card>
                    <CardSection>
                        <Input
                            label="Name"
                            value={this.state.email}
                            onChangeText={email => this.setState({email})}
                            placeholder="mail@mail.com" />
                    </CardSection>

                    <CardSection>
                        <Input
                            label='Address'
                            value={this.state.password}
                            onCHangeText={password => this.setState({password})}
                            placeholder='FunStreet, FunLand' />
                    </CardSection>
                    <CardSection>
                        <Button>
                            Log in

                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

export function postForm(path, form) {
    const base = options.baseUrl || "";
    const str = [];
    for (let p in form) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(form[p]));
    }
    const body = str.join("&");
    const req = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    };
    return fetch(base + path, req);
}

export default LoginForm;
