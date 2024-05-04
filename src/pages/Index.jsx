import { useState } from 'react';
import { Container, SimpleGrid, Box, Input, Textarea, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="lg">
    <Input variant="unstyled" defaultValue={note.title} placeholder="Title" fontWeight="bold" mb={2}
      onBlur={(e) => onEdit({ ...note, title: e.target.value })} />
    <Textarea variant="unstyled" defaultValue={note.content} placeholder="Take a note..."
      onBlur={(e) => onEdit({ ...note, content: e.target.value })} />
    <IconButton aria-label="Delete note" icon={<FaTrash />} size="sm" onClick={() => onDelete(note.id)} />
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const toast = useToast();

  const addNote = () => {
    const newNote = { id: Date.now(), title: '', content: '' };
    setNotes([...notes, newNote]);
    toast({
      title: "Note added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const editNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  return (
    <Container maxW="container.xl" p={5}>
      <IconButton aria-label="Add new note" icon={<FaPlus />} size="lg" onClick={addNote} isRound='true' mb={4} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;