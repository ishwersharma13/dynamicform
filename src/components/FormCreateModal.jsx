import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addForm } from '../redux/reducer';
import slugify from 'slugify';

const FormCreateModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formName, setFormName] = useState('');

  const handleFormCreate = () => {
    if (formName.trim()) {
      const slug = slugify(formName, { lower: true });
      const newForm = {
        id: slug, // Using the slug as the unique ID
        name: formName,
        createdAt: Date.now(),
        questions: [],
      };
      dispatch(addForm(newForm));
      setFormName('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Form</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter Form Name"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleFormCreate}>
            Create Form
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormCreateModal;
