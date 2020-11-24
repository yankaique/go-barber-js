import React, {useCallback, useRef} from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import logoImg from '../../assets/logo.png';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountText  } from './styles';

const SignIn: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
    const inputPasswordRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    const handleSignIn = useCallback((data: Object) => {
        console.log(data);
    });

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
                        <Form style={{width:'100%'}} ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType="email-address"
                                name='mail'
                                icon='mail'
                                placeholder='E-mail'
                                returnKeyType='next'
                                onSubmitEditing={()=>{

                                }}
                                />
                            <Input
                                ref={inputPasswordRef}
                                secureTextEntry
                                name='password'
                                icon='lock'
                                placeholder='Senha'
                                returnKeyType='send'
                                onSubmitEditing={()=>{
                                    formRef.current?.submitForm();
                                }}
                            />

                            <Button onPress={()=>{
                                formRef.current?.submitForm();
                            }}>
                                Entrar
                            </Button>
                        </Form>

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
