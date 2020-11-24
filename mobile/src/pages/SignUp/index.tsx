import React, {useRef} from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignInButton, BackToSignInText  } from './styles';

const SignUp: React.FC = () =>{
    const formRef = useRef<FormHandles>(null)
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const navigation = useNavigation();
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
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form style={{width:'100%'}} ref={formRef} onSubmit={(data)=>{console.log(data)}} >
                            <Input
                                autoCapitalize='words'
                                name='name' icon='user'
                                placeholder='Nome'
                                returnKeyType='next'
                                onSubmitEditing={()=>{
                                    emailInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={emailInputRef}
                                keyboardType='email-address'
                                name='email' autoCorrect={false}
                                autoCapitalize='none' icon='mail'
                                placeholder='E-mail'
                                returnKeyType='next'
                                onSubmitEditing={()=>{
                                    passwordInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                textContentType='newPassword'
                                secureTextEntry
                                name='password'
                                icon='lock'
                                placeholder='Senha'
                                returnKeyType='send'
                                onSubmitEditing={()=>formRef.current?.submitForm()}
                            />

                            <Button onPress={()=>formRef.current?.submitForm()}>
                                Registrar
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignInButton onPress={()=>navigation.goBack()}>
                <Icon name='arrow-left' size={20} color='#fff'/>
                <BackToSignInText>Voltar para logon</BackToSignInText>
            </BackToSignInButton>
        </>
)}

export default SignUp;
