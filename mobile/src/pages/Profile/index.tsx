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
import ImagePicker from 'react-native-image-picker';

import { Container, BackButton, Title, UserAvatarButton, UserAvatar } from './styles';

const SignUp: React.FC = () =>{

    const { user, updateUser } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const oldPasswordInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    interface ProfileFormData {
        name: string;
        email: string;
        old_password: string;
        password: string;
        password_confirmation: string;
    }

    const handleSignUp = useCallback(
        async (data: ProfileFormData): Promise<void> => {
          formRef.current?.setErrors({});
          try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                  .required('E-mail obrigatório')
                  .email('Digite um e-mail válido'),
                old_password: Yup.string(),
                password: Yup.string().when('old_password', {
                  is: val => !!val.length,
                  then: Yup.string().required('Campo obrigatório'),
                  otherwise: Yup.string(),
                }),
                password_confirmation: Yup.string()
                  .when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Campo obrigatório'),
                    otherwise: Yup.string(),
                  })
                  .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta.'),
              });

            await schema.validate(data, {
              abortEarly: false,
            });

            const {
                name,
                email,
                old_password,
                password,
                password_confirmation,
            } = data;

            const formData = {
            name,
            email,
            ...(old_password
                ? {
                    old_password,
                    password,
                    password_confirmation,
                }
                : {}),
            };

            const response = await api.put('/profile', formData);

            updateUser(response.data);

            navigation.goBack()
            Alert.alert('Perfil atualizado com sucesso!');
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
              formRef.current?.setErrors(errors);

              return;
            }

            Alert.alert('Erro na atualização do perfil','Ocorreu um erro ao atualizar seu perfil, tente novamente.')
          }
        },
        [navigation],
      );

    const handleUpdateAvatar = useCallback(()=>{
        ImagePicker.showImagePicker({
            title: 'Selecione um avatar',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Usar câmera',
            chooseFromLibraryButtonTitle: 'Escolhe da galeria'
        }, response => {
            if(response.didCancel){
                return;
            }
            if (response.error){
                console.log('Erro ao atualizar seu avatar.');
                return;
            }

            const source = { uri: response.uri };

            this.setState({
                avatarSource: source
            })

        });
    },[]);

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
                        <Form initialData={user} style={{width:'100%'}} ref={formRef} onSubmit={handleSignUp} >

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
