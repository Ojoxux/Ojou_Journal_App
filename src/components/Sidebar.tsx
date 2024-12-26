import React from 'react';
import { VStack, Box, Heading, Select, Button, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Journal } from '../types/journal';

interface SidebarProps {
  journals: Journal[];
  selectedDate: string | null;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onDateClick: (date: string) => void;
  onJournalClick: (journal: Journal) => void;
  onLogout: () => void;
  dates: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  journals,
  selectedDate,
  sortOrder,
  onSortOrderChange,
  onDateClick,
  onJournalClick,
  onLogout,
  dates,
}) => {
  return (
    <VStack
      width="300px"
      bg="gray.900"
      color="white"
      p="4"
      gap="4"
      align="stretch"
      boxShadow="md"
      position="fixed"
      height="100vh"
      overflowY="auto"
    >
      <Heading size="md">Daily Journal</Heading>
      <Select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
        colorScheme="whiteAlpha"
        borderRadius="md"
        size="sm"
        bg="gray.700"
        color="white"
        border="none"
        _focus={{ boxShadow: 'none', bg: 'gray.600' }}
      >
        <option value="asc">Oldest</option>
        <option value="desc">Newest</option>
      </Select>
      <VStack align="stretch" gap="2" overflowY="auto" flex="1">
        {dates.map((date) => (
          <Box
            key={date}
            p="2"
            bg="gray.700"
            borderRadius="md"
            onClick={() => onDateClick(date)}
            _hover={{ border: '1px solid', borderColor: 'white' }}
          >
            <Text fontWeight="bold">{format(new Date(date), 'MMMM dd, yyyy')}</Text>
            {selectedDate === date && (
              <VStack align="stretch" mt="2">
                {journals
                  .filter((journal) => journal.date.split('T')[0] === date)
                  .map((journal) => (
                    <Box
                      key={journal.id}
                      p="2"
                      bg="gray.800"
                      borderRadius="md"
                      onClick={() => onJournalClick(journal)}
                    >
                      <Text fontWeight="bold">{journal.title}</Text>
                      <Text fontSize="sm">{journal.content}</Text>
                    </Box>
                  ))}
              </VStack>
            )}
          </Box>
        ))}
      </VStack>
      <Button onClick={onLogout} colorScheme="whiteAlpha">
        Logout
      </Button>
    </VStack>
  );
};

export default Sidebar;
