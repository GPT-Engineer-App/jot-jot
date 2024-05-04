import { useState } from 'react';
import { Container, SimpleGrid, Box, Input, Textarea, IconButton, useToast, Flex, Heading } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="lg" bg="white">
    <Flex justifyContent="space-between" alignItems="center">
      <Input variant="unstyled" defaultValue={note.title} placeholder="Title" fontWeight="bold" mb={2}
        onBlur={(e) => onEdit({ ...note, title: e.target.value })} />
      <IconButton aria-label="Edit note" icon={<FaEdit />} size="sm" onClick={() => onEdit(note)} />
      <IconButton aria-label="Delete note" icon={<FaTrash />} size="sm" onClick={() => onDelete(note.id)} />
    </Flex>
    <Textarea variant="unstyled" defaultValue={note.content} placeholder="Take a note..."
      onBlur={(e) => onEdit({ ...note, content: e.target.value })} />
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
      description: "A new note has been added to your board.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      description: "The note has been removed.",
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
      <Heading mb={6}>My Notes</Heading>
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