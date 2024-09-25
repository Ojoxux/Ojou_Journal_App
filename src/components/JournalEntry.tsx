import React, { useState } from 'react';
import { Box, Button, Textarea } from '@yamada-ui/react';

interface JournalEntryProps {
  onSave: (content: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ onSave }) => {
  const [content, setContent] = useState('');

  const handleSave = () => {
    onSave(content);
    setContent('');
  };

  return (
    <Box>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="今日の出来事を書いてください..."
      />
      <Button onClick={handleSave} mt={2}>
        保存
      </Button>
    </Box>
  );
};

export default JournalEntry;
