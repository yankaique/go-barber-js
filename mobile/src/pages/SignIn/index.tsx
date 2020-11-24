import React, {useCallback, useRef} from 'react';
import { Alert, Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountText  } from './styles';

const SignIn: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
    const inputPasswordRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    interface SignInFormData {
        email: string;
        password: string;
    }

    const handleSignIn = useCallback(
        async (data: SignInFormData): Promise<void> => {
          formRef.current?.setErrors({});
          try {
            const schema = Yup.object().shape({
              email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
              password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
              abortEarly: false,
            });
            // await signIn({
            //   email: data.email,
            //   password: data.password,
            // });
            // history.push('/dashboard');
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
              formRef.current?.setErrors(errors);

              return;
            }

            Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer Login, cheque as credenciais.')
          }
        },
        [],
      );

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
                                keyboardType='email-address'
                                name='email'
                                autoCorrect={false}
                                autoCapitalize='none' icon='mail'
                                placeholder='E-mail'
                                returnKeyType='next'
                                onSubmitEditing={()=>{
                                    inputPasswordRef.current?.focus()
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
