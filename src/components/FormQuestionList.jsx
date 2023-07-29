import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, ListItem, UnorderedList, Input, Radio, RadioGroup, Stack, Select, Button } from '@chakra-ui/react';

const FormQuestionList = ({ formId, visible, onClose }) => {
  const forms = useSelector((state) => state.forms);
  const form = forms.find((form) => form.id === formId);

  if (!form || !visible) {
    return null;
  }

  return (
    <Box>
      <Heading fontWeight={"400"}>Form: {form.name}</Heading>
      <form>
        <UnorderedList boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} w={"60%"} m={"auto"} p={"5%"}>
          {form.questions.map((question) => (
            <ListItem key={question.id} textDecor={"none"}>
              <Heading textAlign={"left"} fontSize={"20px"} m={"2% auto"}>
                {question.question}
              </Heading>
              {question.answerType === 'Text' && <Input type="text" />}
              {question.answerType === 'Single Select radio' && (
                <RadioGroup>
                  <Stack direction="row">
                    {question.answerChoices.map((choice) => (
                      <Radio key={choice} value={choice}>
                        {choice}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              )}
              {question.answerType === 'Multichoice Checkbox' && (
                <Select>
                  {question.answerChoices.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </Select>
              )}
            </ListItem>
          ))}
        </UnorderedList>
        {/* <Button colorScheme="blue" type="submit" mt={"5%"} onClick={onClose}>
          Form Submit
        </Button> */}
      </form>
    </Box>
  );
};

export default FormQuestionList;
