import React from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountText  } from './styles';

const SignIn: React.FC = () =>{
    const navigation = useNavigation()
    return(
        <>
            <KeyboardAvoidingView
                style={{flex:1}}
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                <ScrollView
                    contentContainerStyle={{flex:1}}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg}/>

                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        <Input name='mail' icon='mail' placeholder='E-mail' />
                        <Input name='password' icon='lock' placeholder='Senha'/>

                        <Button onPress={()=>{console.log('Foi')}}>
                            Entrar
                        </Button>

                        <ForgotPassword>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={()=>navigation.navigate('SignUp')}>
                <Icon name='log-in' size={20} color='#ff9000'/>
                <CreateAccountText>Criar uma conta</CreateAccountText>
            </CreateAccountButton>
        </>
)}

export default SignIn;
