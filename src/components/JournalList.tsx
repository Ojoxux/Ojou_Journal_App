import React from 'react';
import { Box, Text, Button, VStack } from '@chakra-ui/react';

interface Journal {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface JournalListProps {
  journals: Journal[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const JournalList: React.FC<JournalListProps> = ({ journals, onEdit, onDelete }) => {
  return (
    <VStack gap="4" align="stretch">
      {journals.map((journal) => (
        <Box key={journal.id} p="4" borderWidth="1px" borderRadius="md" bg="gray.800" color="white">
          <Text fontWeight="bold" mb="2">
            {journal.title}
          </Text>
          <Text fontWeight="bold" mb="2">
            {journal.date}
          </Text>
          <Text mb="4">{journal.content}</Text>
          <Button onClick={() => onEdit(journal.id)} mr="2" colorScheme="whiteAlpha" size="sm">
            編集
          </Button>
          <Button onClick={() => onDelete(journal.id)} colorScheme="whiteAlpha" size="sm">
            削除
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default JournalList;
