import { useState, useEffect, useCallback } from 'react';
import { HStack, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import JournalModal from './JournalModal';
import { saveJournal, fetchJournals, editJournal, deleteJournal } from './services/JournalService';
import { Journal } from '../types/journal';

const Home: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [alert, setAlert] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const location = useLocation();
  const { isOpen, onOpen, onClose: originalOnClose } = useDisclosure();
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  const loadJournals = useCallback(async () => {
    try {
      const fetchedJournals = await fetchJournals();
      setJournals(fetchedJournals);
    } catch (error) {
      console.error('Error loading journals:', error);
      setAlert({ status: 'error', message: '日記の読み込みに失敗しました。' });
    }
  }, []);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert({ status: 'success', message: location.state.alert });
    }
  }, [location]);

  useEffect(() => {
    loadJournals();
  }, [loadJournals]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
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
  }, [journals, sortOrder]);

  const handleSave = async (title: string, content: string) => {
    try {
      await saveJournal(title, content);
      await loadJournals();
      setAlert({ status: 'success', message: '日記が保存されました！' });
    } catch (error) {
      console.error('Error saving journal:', error);
      setAlert({ status: 'error', message: '日記の保存に失敗しました。' });
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleDateClick = (date: string) => {
    setSelectedDates((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  const handleJournalClick = (journal: Journal) => {
    setSelectedJournal(journal);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedJournal(null);
    originalOnClose();
  };

  const handleUpdate = async (id: string, title: string, content: string) => {
    try {
      await editJournal(id, title, content);
      await loadJournals();
      setAlert({ status: 'success', message: '日記が更新されました！' });
      handleCloseModal();
    } catch (error) {
      console.error('Error updating journal:', error);
      setAlert({ status: 'error', message: '日記の更新に失敗しました。' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJournal(id);
      await loadJournals();
      setAlert({ status: 'success', message: '日記が削除されました！' });
    } catch (error) {
      console.error('Error deleting journal:', error);
      setAlert({ status: 'error', message: '日記の削除に失敗しました。' });
    }
  };

  return (
    <HStack gap="0" align="stretch" height="100vh">
      <Sidebar
        journals={journals}
        selectedDates={selectedDates}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onDateClick={handleDateClick}
        onJournalClick={handleJournalClick}
        onLogout={handleLogout}
        dates={dates}
      />
      <MainContent alert={alert} onAlertClose={() => setAlert(null)} onSave={handleSave} />
      <JournalModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        journal={selectedJournal}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </HStack>
  );
};

export default Home;
