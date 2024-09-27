import React, { useState, useEffect } from 'react';
import { Button, Textarea, VStack, Input } from '@chakra-ui/react';

interface JournalEntryProps {
  onSave: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({
  onSave,
  initialTitle = '',
  initialContent = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSave = () => {
    onSave(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <VStack gap="4" align="stretch" bg="gray.800" p="4" borderRadius="md" boxShadow="lg">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title..."
        size="lg"
        bg="gray.700"
        color="white"
        border="none"
        _placeholder={{ color: 'gray.400' }}
        _focus={{ boxShadow: 'none', bg: 'gray.600' }}
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write about what happened today...."
        size="lg"
        minHeight="200px"
        bg="gray.700"
        color="white"
        border="none"
        _placeholder={{ color: 'gray.400' }}
        _focus={{ boxShadow: 'none', bg: 'gray.600' }}
      />
      <Button onClick={handleSave} colorScheme="whiteAlpha" size="lg">
        Save
      </Button>
    </VStack>
  );
};

export default JournalEntry;
