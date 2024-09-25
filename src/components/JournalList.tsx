import React from 'react';
import { Box, Text, Button } from '@yamada-ui/react';

interface Journal {
  id: string;
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
    <Box>
      {journals.map((journal) => (
        <Box key={journal.id} mb={4} p={2} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">{journal.date}</Text>
          <Text>{journal.content}</Text>
          <Button onClick={() => onEdit(journal.id)} mr={2}>
            編集
          </Button>
          <Button onClick={() => onDelete(journal.id)} colorScheme="red">
            削除
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default JournalList;
