import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import JournalEntry from './JournalEntry';
import AlertMessage from './AlertMessage';

interface MainContentProps {
  alert: { status: 'success' | 'error'; message: string } | null;
  onAlertClose: () => void;
  onSave: (title: string, content: string) => Promise<void>;
}

const MainContent: React.FC<MainContentProps> = ({ alert, onAlertClose, onSave }) => {
  return (
    <Box
      flex="1"
      margin="auto"
      p="4"
      bg="gray.800"
      borderRadius="md"
      boxShadow="md"
      color="white"
      ml="300px"
      height="100vh"
      overflowY="auto"
    >
      <AlertMessage alert={alert} onClose={onAlertClose} />
      <VStack gap="4" align="stretch">
        <Heading>Daily Diary</Heading>
        <JournalEntry onSave={onSave} />
      </VStack>
    </Box>
  );
};

export default MainContent;
