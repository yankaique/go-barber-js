import React, {useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef} from 'react';
import { TextInputProps } from 'react-native';
import { Container,TextInput,Icon } from './styles';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

interface inputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<inputRef,InputProps> = ({name, icon, ...rest}, ref) =>{
    const inputElementRef = useRef<any>(null)
    const { registerField, defaultValue = '', fieldName, error} = useField(name);
    const inputValueRef = useRef<InputValueReference>({value: defaultValue})

    useImperativeHandle(ref, ()=> ({
        focus(){
            inputElementRef.current?.focus()
        }
    }))

    const [isFocused, setIsFocused ] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(()=>{
        setIsFocused(true);
    },[])

    const handleInputBlur = useCallback(()=>{
    setIsFocused(false);

    setIsFilled(!!inputValueRef);
    },[])

    useEffect(()=>{
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref:any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({text:value});
            },
            clearValue(){
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    },[fieldName, registerField]);

    return (
        <Container isFocused={isFocused} isErrored={!!error}>
            <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'}/>
            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                onChangeText={(value) => inputValueRef.current.value = value}
                {...rest}
            />
        </Container>
    )
};

export default forwardRef(Input);
