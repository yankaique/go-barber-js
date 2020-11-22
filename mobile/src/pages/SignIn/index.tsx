import React from 'react';
import { Image } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';


import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () =>{
    return(
        <Container>
            <Image source={logoImg}/>
            <Title>Faça seu logon</Title>

            <Input name='mail' icon='mail' placeholder='E-mail' />
            <Input name='password' icon='lock' placeholder='Senha'/>

            <Button onPress={()=>{console.log('Foi')}}>
                Entrar
            </Button>
        </Container>
)}

export default SignIn;
