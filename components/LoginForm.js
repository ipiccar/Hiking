import React, { Component } from 'react';
import {Card, Header, CardSection, Input, Button} from "./common";

class LoginForm extends Component {

    state={email:'', password:''};

    render() {
        return (
            <Header headerText='Login'/>
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        value={this.state.email}
                        onCHangeText={email => this.setState({email})}
                        autoCorrect=false
                        placeholder='mail@mail.com' />
                </CardSection>

                <CardSection>
                    <Input
                        label='Password'
                        value={this.state.password}
                        onCHangeText={email => this.setState({password})}
                        autoCorrect=false
                        placeholder='mail@mail.com' />
                </CardSection>
                <CardSection>
                    <Button>
                        Log in
                    </Button>
                </CardSection>
            </Card>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginForm;
