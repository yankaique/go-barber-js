import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Platform } from 'react-native';

import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerText
} from './styles';

interface RouteParams {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string
}

const CreateAppointment: React.FC = () =>{

    const route = useRoute();
    const routeParams = route.params as RouteParams;

    const { user } = useAuth();
    const { goBack } = useNavigation();

    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ providers, setProviders ] = useState<Provider[]>([]);
    const [ selectedProvider, setSelectedProvider ] = useState(routeParams.providerId);
    const [selectedDate, setSelectedDate ] = useState(new Date());

    useEffect(()=>{
        api.get('/providers')
        .then(response => {
            setProviders(response.data)
        });
    },[]);

    const navigateBack = useCallback(()=>{
        goBack();
    },[goBack]);

    const handleSelectProvider = useCallback((providerId: string)=>{
        setSelectedProvider(providerId);
    },[setSelectedProvider]);

    const handleToggleDatePicker = useCallback(()=>{
        setShowDatePicker( state =>  !state);
    },[setShowDatePicker]);

    const handleDayChanged = useCallback((event: any, date: Date | undefined) => {
        if(Platform.OS === 'android'){
            setShowDatePicker(false);
        }

        if(date){
            setSelectedDate(date);
        }
    },[])

    return(
        <Container >
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>
                <HeaderTitle>
                    Cabeleireiros
                </HeaderTitle>
                <UserAvatar source={{uri: user.avatar_url}}/>
            </Header>
            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={(provider:Provider)=> provider.id}
                    renderItem = {({ item: provider })=>(
                        <ProviderContainer
                            onPress={() => handleSelectProvider(provider.id)}
                            selected={ provider.id === selectedProvider }
                        >
                            <ProviderAvatar source={{uri: provider.avatar_url}}/>
                            <ProviderName
                                selected={ provider.id === selectedProvider }
                            >{provider.name}</ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>
            <Calendar>
                <Title>Escolha a data</Title>
                <OpenDatePickerButton onPress={handleToggleDatePicker} >
                    <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
                </OpenDatePickerButton>
                {showDatePicker && <DateTimePicker
                    mode = "date"
                    onChange={handleDayChanged}
                    display = "calendar"
                    value = {selectedDate}
                />}
            </Calendar>
        </Container>
    )
}

export default CreateAppointment;
