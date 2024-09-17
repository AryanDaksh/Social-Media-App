import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Button,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    Textarea,
    FormControl,
    useDisclosure,
    useToast,
    Text,
} from '@chakra-ui/react';

import PostService from '../services/PostService'; // Match the exact file name casing
import PostImageService from '../services/PostImageService'; // Match the exact file name casing
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddPost() {
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const token = localStorage.getItem("token");
    const postService = new PostService();
    const postImageService = new PostImageService();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
            toast({
                title: "File too large",
                description: "Please upload an image less than 5MB.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setFile(selectedFile);
    };

    const formik = useFormik({
        initialValues: {
            description: ""
        },
        validate: values => {
            const errors = {};
            if (!values.description) {
                errors.description = 'Description is required';
            }
            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            const formData = new FormData();
            try {
                values.userId = user.id;
                const result = await postService.add(values, token);
                const postId = result.data;
                if (file) {
                    formData.append("postId", postId);
                    formData.append("image", file);
                    await postImageService.upload(formData, token);
                }
                toast({
                    title: "Post Shared",
                    description: "Your post has been shared successfully.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                navigate(`/profile/${user.id}`);
                onClose(); // Close the modal after successful submission
            } catch (error) {
                console.log("Error details:", error.response?.data); // For debugging

                const errorMessage = 
                    typeof error.response?.data === 'string'
                        ? error.response.data
                        : JSON.stringify(error.response?.data) || "An unexpected error occurred.";

                toast({
                    title: "Error sharing post",
                    description: errorMessage,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <Button onClick={onOpen} colorScheme={'pink'}>Share Post</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as={'form'} onSubmit={formik.handleSubmit}>
                    <ModalHeader>Share a Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={formik.errors.description && formik.touched.description}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder='Description'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='description'
                                value={formik.values.description}
                            />
                            {formik.errors.description && formik.touched.description && (
                                <Text color='red.500'>{formik.errors.description}</Text>
                            )}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Upload Image</FormLabel>
                            <Button colorScheme={'pink'} as={'label'}>
                                {file ? file.name : "Upload Image"}
                                <input hidden type={'file'} accept="image/*" onChange={handleImageChange} />
                            </Button>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' colorScheme='pink' mr={3} isLoading={loading}>
                            Share
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddPost;
