import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  data: ToastMessage;
  style: Object;
}

const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
};

const Toast: React.FC<ToastProps> = ({ data, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(data.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, data.id]);

  return (
    <Container
      type={data.type}
      hasDescription={!!data.description}
      style={style}
    >
      {icons[data.type || 'info']}
      <div>
        <strong>{data.title}</strong>
        {data.description && <p>{data.description}</p>}
      </div>
      <button onClick={() => removeToast(data.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
