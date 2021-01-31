import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';

import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    Content,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerText,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string
}

export interface AvailabilityItem {
    hour: number;
    available: boolean;
}

const CreateAppointment: React.FC = () =>{

    const route = useRoute();
    const routeParams = route.params as RouteParams;

    const { user } = useAuth();
    const { goBack, navigate } = useNavigation();

    const [ availability, setAvailability ] = useState<AvailabilityItem[]>([]);
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ providers, setProviders ] = useState<Provider[]>([]);
    const [ selectedHour, setSelectedHour ] = useState(0);
    const [ selectedProvider, setSelectedProvider ] = useState(routeParams.providerId);
    const [selectedDate, setSelectedDate ] = useState(new Date());

    useEffect(()=>{
        api.get('/providers')
        .then(response => {
            setProviders(response.data)
        });
    },[]);

    useEffect(()=>{
        api.get(`/providers/${selectedProvider}/day-availability`,{
            params: {
                year: selectedDate.getFullYear() ,
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(response => setAvailability(response.data))
    },[selectedDate, selectedProvider]);

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

    const handleSelectHour = useCallback((hour: number)=>{
        setSelectedHour(hour);
    },[])

    const morningAvailability = useMemo(()=>{
        return availability
            .filter(({hour})=>hour<12)
            .map(({hour, available}) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), 'HH:00')
                }
            })
    },[availability]);

    const afternoonAvailability = useMemo(()=>{
        return availability
            .filter(({hour})=>hour>=12)
            .map(({hour, available}) => {
                return {
                    hour,
                    available,
                    hourFormatted: format(new Date().setHours(hour), 'HH:00')
                }
            })
    },[availability]);

    const handleCreateAppointment = useCallback(async()=>{
        try{
            const date = new Date(selectedDate);

            date.setHours(selectedHour);
            date.setMinutes(0);

            await api.post('appointments', {
                provider_id: selectedProvider,
                date,
            });

            navigate('AppointmentCreated', {date: date.getTime()});

        }catch(err){
            Alert.alert(
                'Erro ao criar o agendamento',
                'Ocorreu um erro ao tentar criar um agendamento,  tente novamente.'
            )
        }
    },[navigate, selectedDate, selectedHour, selectedProvider]);

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
            <Content>
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

                <Schedule>
                    <Title>Escolha o horário</Title>
                    <Section>
                        <SectionTitle>Manhã</SectionTitle>
                        <SectionContent horizontal>
                            {morningAvailability.map(({hourFormatted, available, hour})=>(
                                <Hour
                                    enabled={available}
                                    selected={selectedHour===hour}
                                    available={available}
                                    key={hourFormatted}
                                    onPress={()=>handleSelectHour(hour)}
                                >
                                    <HourText
                                        selected={selectedHour===hour}
                                    >{hourFormatted}</HourText>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>
                        <SectionContent horizontal>
                        {afternoonAvailability.map(({hourFormatted, available, hour})=>(
                            <Hour
                                enabled={available}
                                selected={selectedHour===hour}
                                available={available}
                                key={hourFormatted}
                                onPress={()=>handleSelectHour(hour)}
                            >
                                <HourText
                                    selected={selectedHour===hour}
                                >{hourFormatted}</HourText>
                            </Hour>
                        ))}
                        </SectionContent>
                    </Section>
                </Schedule>
                <CreateAppointmentButton onPress={handleCreateAppointment}>
                  <CreateAppointmentButtonText>
                      Agendar
                  </CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    )
}

export default CreateAppointment;
