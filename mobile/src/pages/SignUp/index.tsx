import React from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignInButton, BackToSignInText  } from './styles';

const SignUp: React.FC = () =>{
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
                        <Input name='name' icon='user' placeholder='Nome' />
                        <Input name='mail' icon='mail' placeholder='E-mail' />
                        <Input name='password' icon='lock' placeholder='Senha'/>

                        <Button onPress={()=>{console.log('Foi')}}>
                            Entrar
                        </Button>
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
