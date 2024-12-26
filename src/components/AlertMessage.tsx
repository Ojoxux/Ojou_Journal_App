import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  Slide,
} from '@chakra-ui/react';

interface AlertMessageProps {
  alert: { status: 'success' | 'error'; message: string } | null;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <Slide direction="bottom" in={alert !== null} style={{ zIndex: 10 }}>
      <Alert
        status={alert.status}
        variant="solid"
        position="fixed"
        bottom="4"
        left="calc(50% + 150px)"
        transform="translateX(-50%)"
        width="80%"
        maxWidth="900px"
        borderRadius="md"
        boxShadow="lg"
        p="4"
        textAlign="center"
        zIndex="9999"
      >
        <AlertIcon />
        <Box flex="1">
          <AlertTitle>{alert.status === 'success' ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Box>
        <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
      </Alert>
    </Slide>
  );
};

export default AlertMessage;
