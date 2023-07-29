import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@chakra-ui/react';
import FormCreateModal from './FormCreateModal';

const FormBuilder = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCreateModalOpen = () => {
    setModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Button colorScheme="blue" onClick={handleCreateModalOpen}>
        Create Form
      </Button>
      <FormCreateModal isOpen={isModalOpen} onClose={handleCreateModalClose} />
    </div>
  );
};

export default FormBuilder;
