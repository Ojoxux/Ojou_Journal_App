import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Input,
  Textarea,
  HStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';

interface Journal {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  journal: Journal | null;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
}

const JournalModal: React.FC<JournalModalProps> = ({
  isOpen,
  onClose,
  journal,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(journal?.title || '');
  const [content, setContent] = useState(journal?.content || '');

  useEffect(() => {
    if (journal) {
      setTitle(journal.title);
      setContent(journal.content);
    }
  }, [journal]);

  if (!journal) return null;

  const formattedDate = format(new Date(journal.date), 'MMMM dd, yyyy HH:mm');

  const handleSave = () => {
    onUpdate(journal.id, title, content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(journal.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInTop"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" borderRadius="lg" boxShadow="xl">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
          {isEditing ? 'Edit Journal' : journal.title}
        </ModalHeader>
        <ModalCloseButton border="none" />
        <ModalBody>
          <VStack align="stretch" gap="4">
            {isEditing ? (
              <>
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
                  placeholder="Write about what happened today..."
                  size="lg"
                  minHeight="200px"
                  bg="gray.700"
                  color="white"
                  border="none"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ boxShadow: 'none', bg: 'gray.600' }}
                />
              </>
            ) : (
              <>
                <Text fontWeight="bold" fontSize="lg" color="gray.400">
                  {formattedDate}
                </Text>
                <Text fontSize="md" lineHeight="tall">
                  {journal.content}
                </Text>
              </>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor="gray.700">
          {isEditing ? (
            <HStack spacing="4">
              <Button colorScheme="grey" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outline" colorScheme="grey" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </HStack>
          ) : (
            <HStack spacing="4">
              <Button colorScheme="grey" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button colorScheme="grey" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outline" colorScheme="grey" onClick={onClose}>
                Close
              </Button>
            </HStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JournalModal;
