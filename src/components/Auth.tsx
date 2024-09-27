import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  Input,
  Button,
  Heading,
  Box,
  IconButton,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Slide,
} from '@chakra-ui/react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000); // 3秒後にアラートを消す

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthSuccess();
      navigate('/', { state: { alert: 'Successfully logged in.' } });
    } catch (error) {
      console.error('Error signing in:', error);
      setAlert({ status: 'error', message: 'Login has failed.' });
    }
  };

  const bgColor = useColorModeValue('gray.800', 'gray.700');
  const buttonBgColor = useColorModeValue('white', 'gray.200');
  const buttonHoverBgColor = useColorModeValue('gray.200', 'gray.300');

  return (
    <Box height="100vh" bg="black" display="flex" justifyContent="center" alignItems="center">
      <Box
        bg={bgColor}
        p="8"
        borderRadius="12px"
        boxShadow="xl"
        maxWidth="400px"
        width="100%"
        color="white"
      >
        {alert && (
          <Slide direction="bottom" in={alert !== null} style={{ zIndex: 10 }}>
            <Alert
              status={alert.status}
              variant="solid"
              position="fixed"
              bottom="4"
              left="50%" // サイドバーの幅分（300pxの半分）を右に移動
              transform="translateX(-50%)"
              width="80%"
              maxWidth="800px"
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
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setAlert(null)}
              />
            </Alert>
          </Slide>
        )}
        <VStack gap="4" align="stretch">
          <Heading size="lg" textAlign="center">
            Log In
          </Heading>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            height="50px"
            width="100%"
            fontSize="md"
            color="white"
            bg="gray.700"
            border="none"
            _placeholder={{ color: 'gray.500' }}
            _focus={{ boxShadow: 'none', borderColor: 'gray.500' }}
          />
          <Box position="relative" width="100%">
            <Input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              height="50px"
              width="100%"
              fontSize="md"
              color="white"
              pr="40px"
              bg="gray.700"
              border="none"
              _placeholder={{ color: 'gray.500' }}
              _focus={{ boxShadow: 'none', borderColor: 'gray.500' }}
            />
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              onClick={() => setShowPassword(!showPassword)}
              bg="transparent"
              color="gray.500"
              _hover={{ bg: 'transparent', boxShadow: 'none', outline: 'none', border: 'none' }}
              _active={{ bg: 'transparent', boxShadow: 'none', outline: 'none', border: 'none' }}
              _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
              position="absolute"
              right="10px"
              top="55%"
              transform="translateY(-50%)"
              zIndex="1"
            />
          </Box>
          <Button
            onClick={handleSignIn}
            bg={buttonBgColor}
            color="black"
            size="lg"
            height="50px"
            fontSize="md"
            fontWeight="bold"
            _hover={{ bg: buttonHoverBgColor }}
            borderRadius="8px"
          >
            Log In
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Auth;
