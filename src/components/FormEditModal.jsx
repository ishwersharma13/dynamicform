// FormEditModal.js
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, Textarea } from '@chakra-ui/react';

const FormEditModal = ({ isOpen, onClose, handleQuestionAdd }) => {
  const [question, setQuestion] = useState('');
  const [answerType, setAnswerType] = useState('Text');
  const [answerChoices, setAnswerChoices] = useState('');

  const handleAdd = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question,
      answerType,
      answerChoices: answerChoices.split('\n').map((choice) => choice.trim()),
    };
    handleQuestionAdd(newQuestion);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Question</ModalHeader>
        <ModalBody>
          <div>
            <label>Question / Title:</label>
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter Question"
            />
          </div>
          <div>
            <label>Answer Type:</label>
            <Select value={answerType} onChange={(e) => setAnswerType(e.target.value)}>
              <option value="Text">Text</option>
              <option value="Multichoice Checkbox">Multichoice Checkbox</option>
              <option value="Single Select radio">Single Select radio</option>
            </Select>
          </div>
          {answerType === 'Multichoice Checkbox' || answerType === 'Single Select radio' ? (
            <div>
              <label>Answer Choices (one per line):</label>
              <Textarea
                value={answerChoices}
                onChange={(e) => setAnswerChoices(e.target.value)}
                placeholder="Enter Answer Choices"
              />
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleAdd}>
            Add
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormEditModal;
