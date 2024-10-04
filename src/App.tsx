import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Slide,
  Select,
} from '@chakra-ui/react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import JournalEntry from './components/JournalEntry';
import Auth from './components/Auth';
import {
  saveJournal,
  editJournal,
  deleteJournal,
  fetchJournals,
} from './components/services/JournalService';
import JournalModal from './components/JournalModal';
import { format } from 'date-fns';

interface Journal {
  id: string;
  title: string;
  content: string;
  date: string;
  feedback?: string;
}

function AppContent({
  user,
  loadJournals,
  journals,
}: {
  user: User | null;
  loadJournals: () => void;
  journals: Journal[];
}) {
  const [localJournals, setLocalJournals] = useState<Journal[]>(journals);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { isOpen, onOpen, onClose: originalOnClose } = useDisclosure();
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [alert, setAlert] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (location.state?.alert) {
      setAlert({ status: 'success', message: location.state.alert });
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      loadJournals();
    }
  }, [user, loadJournals]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000); // 3秒後にアラートを消す

      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    const uniqueDates = Array.from(new Set(journals.map((journal) => journal.date.split('T')[0])));
    uniqueDates.sort((a, b) => {
      return sortOrder === 'asc'
        ? new Date(a).getTime() - new Date(b).getTime()
        : new Date(b).getTime() - new Date(a).getTime();
    });
    setDates(uniqueDates);
    setLocalJournals(journals);
  }, [journals, sortOrder]); // sortOrderを依存配列に追加

  const handleSave = async (title: string, content: string) => {
    try {
      const newJournal = await saveJournal(title, content);
      setLocalJournals([...localJournals, { ...newJournal, title }]);
      setAlert({ status: 'success', message: 'Journal saved successfully!' });
    } catch (error) {
      console.error('Error saving journal:', error);
      setAlert({ status: 'error', message: 'Failed to save journal.' });
    }
  };

  const handleUpdate = async (id: string, title: string, content: string) => {
    try {
      await editJournal(id, title, content);
      setLocalJournals(
        localJournals.map((journal) =>
          journal.id === id ? { ...journal, title, content } : journal
        )
      );
      setAlert({ status: 'success', message: 'Journal updated successfully!' });
    } catch (error) {
      console.error('Error updating journal:', error);
      setAlert({ status: 'error', message: 'Failed to update journal.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJournal(id);
      setLocalJournals(localJournals.filter((journal) => journal.id !== id));
      setAlert({ status: 'success', message: 'Journal deleted successfully!' });
    } catch (error) {
      console.error('Error deleting journal:', error);
      setAlert({ status: 'error', message: 'Failed to delete journal.' });
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const handleJournalClick = (journal: Journal) => {
    setSelectedJournal(journal);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedJournal(null);
    originalOnClose();
  };

  return (
    <HStack gap="0" align="stretch" height="100vh">
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
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
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
              onClick={() => handleDateClick(date)}
              _hover={{ border: '1px solid', borderColor: 'white' }}
            >
              <Text fontWeight="bold">{format(new Date(date), 'MMMM dd, yyyy')}</Text>
              {selectedDate === date && (
                <VStack align="stretch" mt="2">
                  {localJournals
                    .filter((journal) => journal.date.split('T')[0] === date)
                    .map((journal) => (
                      <Box
                        key={journal.id}
                        p="2"
                        bg="gray.800"
                        borderRadius="md"
                        onClick={() => handleJournalClick(journal)}
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
        <Button onClick={handleLogout} colorScheme="whiteAlpha">
          Logout
        </Button>
      </VStack>
      <Box
        flex="1"
        margin="auto"
        p="4"
        bg="gray.800"
        borderRadius="md"
        boxShadow="md"
        color="white"
        ml="300px" // サイドバーの幅分のマージンを追加
        height="100vh"
        overflowY="auto"
      >
        {alert && (
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
              zIndex="9999" // アラートを前面に表示
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
          <Heading>Daily Diary</Heading>
          <JournalEntry onSave={handleSave} />
        </VStack>
      </Box>
      <JournalModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        journal={selectedJournal}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </HStack>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [journals, setJournals] = useState<Journal[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const loadJournals = useCallback(async () => {
    try {
      const fetchedJournals = await fetchJournals();
      console.log('Loaded Journals:', fetchedJournals);
      setJournals(fetchedJournals);
    } catch (error) {
      console.error('Error loading journals:', error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <AppContent user={user} loadJournals={loadJournals} journals={journals} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/auth" element={<Auth onAuthSuccess={loadJournals} />} />
      </Routes>
    </Router>
  );
}

export default App;
