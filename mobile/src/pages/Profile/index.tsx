import React, {useRef, useCallback} from 'react';
import { Alert, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import api from '../../services/api'

import { useAuth } from '../../hooks/auth';
import Input from '../../components/input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';

import { Container, BackButton, Title, UserAvatarButton, UserAvatar } from './styles';

const SignUp: React.FC = () =>{

    const { user } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const oldPasswordInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    interface SignUpFormData {
        name: string;
        email: string;
        password: string;
    }

    const handleSignUp = useCallback(
        async (data: SignUpFormData): Promise<void> => {
          formRef.current?.setErrors({});
          try {
            const schema = Yup.object().shape({
              name: Yup.string().required('Nome obrigatório'),
              email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
              password: Yup.string().min(
                6,
                'Senha deve conter no mínimo 6 dígitos',
              ),
            });

            await schema.validate(data, {
              abortEarly: false,
            });

            await api.post('/users', data);
            navigation.goBack()
            Alert.alert('Cadastro realizado com sucesso!','Você já pode fazer seu logon no GoBarber!!!')
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
              formRef.current?.setErrors(errors);

              return;
            }

            Alert.alert('Erro no cadastro','Ocorreu um erro ao fazer o cadastro, tente novamente.')
          }
        },
        [navigation],
      );

    const handleGoBack = useCallback(()=>{
        navigation.goBack();
    },[navigation]);

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
                        <BackButton onPress={handleGoBack}>
                            <Icon name="chevron-leftt" size={24} color="#999591" />
                        </BackButton>

                        <UserAvatarButton onPress={()=>{}}>
                          <UserAvatar source={{ uri: user.avatar_url}} />
                        </UserAvatarButton>
                        <View>
                            <Title>Meu perfil</Title>
                        </View>
                        <Form style={{width:'100%'}} ref={formRef} onSubmit={handleSignUp} >

                            <Input
                                ref={emailInputRef}
                                keyboardType='email-address'
                                name='email'
                                autoCorrect={false}
                                autoCapitalize='none' icon='mail'
                                placeholder='E-mail'
                                returnKeyType='next'
                                onSubmitEditing={()=>{
                                    oldPasswordInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={oldPasswordInputRef}
                                textContentType='newPassword'
                                secureTextEntry
                                name='old_password'
                                icon='lock'
                                placeholder='Senha atual'
                                returnKeyType='next'
                                containerStyle={{ marginTop: 16}}
                                onSubmitEditing={()=>passwordInputRef.current?.focus()}
                            />

                            <Input
                                ref={passwordInputRef}
                                textContentType='newPassword'
                                secureTextEntry
                                name='password'
                                icon='lock'
                                placeholder='Nova senha'
                                returnKeyType='next'
                                onSubmitEditing={()=>confirmPasswordInputRef.current?.focus()}
                            />

                            <Input
                                ref={confirmPasswordInputRef}
                                textContentType='newPassword'
                                secureTextEntry
                                name='password_confirmation'
                                icon='lock'
                                placeholder='Confirmar senha'
                                returnKeyType='send'
                                onSubmitEditing={()=>formRef.current?.submitForm()}
                            />

                            <Button onPress={()=>formRef.current?.submitForm()}>
                                Confirmar mudanças
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
)}

export default SignUp;
