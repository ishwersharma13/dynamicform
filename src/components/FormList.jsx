import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import { deleteForm, addQuestion } from '../redux/reducer';
import FormQuestionList from './FormQuestionList';
import FormEditModal from './FormEditModal';

const FormList = () => {
    const forms = useSelector((state) => state.forms);
    const dispatch = useDispatch();
    const [selectedFormId, setSelectedFormId] = useState(null);
    const [isAddQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
    const [formVisibility, setFormVisibility] = useState({});

    // const handleEdit = (formId) => {
    //     setSelectedFormId(formId);
    //     // onOpen();
    // };
    useEffect(() => {
        localStorage.setItem('forms', JSON.stringify(forms));
    }, [forms]);

    const handleDelete = (formId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this form?');
        if (isConfirmed) {
            dispatch(deleteForm(formId));
        }
    };

    const handleViewForm = (formId) => {
        // 
        setFormVisibility((prevVisibility) => ({
            ...prevVisibility,
            [formId]: !prevVisibility[formId],

        }));
        //         if(formId){
        //       setSelectedFormId(formId)
        //   }else{

        //   }
    };

    const handleAddQuestion = (formId) => {
        setSelectedFormId(formId);
        setAddQuestionModalOpen(true);
    };

    const handleQuestionAdd = (newQuestion) => {
        dispatch(addQuestion({ formId: selectedFormId, question: newQuestion }));
    };

    return (
        <Box>
            <Heading m={" 2% 5%"}>List of Created Forms</Heading>
            <UnorderedList m={"2% 5%"}>
                {forms.map((form) => (
                    <ListItem key={form.id}>
                        <Heading m={"5px"} color={"#0e0e0d"} fontWeight={"600"} fontSize={"24px"}>{form.name}</Heading>
                        <Button m={"2px"} colorScheme="blue" onClick={() => handleViewForm(form.id)}>
                            {formVisibility[form.id] ? 'Hide Form' : 'View Form'}
                        </Button>
                        <Button m={"2px"} colorScheme="blue" onClick={() => handleAddQuestion(form.id)}>
                            Add Question
                        </Button>
                        {/* <Button colorScheme="blue" onClick={() => handleEdit(form.id)}>
              Edit
            </Button> */}
                        <Button m={"2px"} colorScheme="red" onClick={() => handleDelete(form.id)}>
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </UnorderedList>
            {selectedFormId && <FormQuestionList formId={selectedFormId} visible={formVisibility[selectedFormId]} onClose={() => setSelectedFormId(null)} />}

            {/* Add Question Modal */}
            {selectedFormId && (
                <FormEditModal
                    isOpen={isAddQuestionModalOpen}
                    onClose={() => setAddQuestionModalOpen(false)}
                    handleQuestionAdd={handleQuestionAdd}
                />
            )}
        </Box>
    );
};

export default FormList;
