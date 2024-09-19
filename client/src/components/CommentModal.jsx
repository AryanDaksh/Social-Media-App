import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Input,
    InputRightElement,
    InputGroup,
    Card,
    CardBody,
    Heading,
    VStack,
} from '@chakra-ui/react';
import CommentService from '../services/CommentService';
import { useFormik } from 'formik';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function CommentModal({ postId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getToken = () => localStorage.getItem("token");

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const commentService = new CommentService();
            const result = await commentService.getAllByPost(postId, getToken());
            setComments(result.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setError("Failed to load comments. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        getData();
    }, [getData]);

    const formik = useFormik({
        initialValues: {
            description: "",
            postId: postId,
            userId: user.id
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const commentService = new CommentService();
                await commentService.add(values, getToken());
                getData();
                resetForm();
            } catch (error) {
                console.error("Error adding comment:", error);
                setError("Failed to add comment. Please try again later.");
            }
        }
    });

    return (
        <>
            <Button flex='1' variant='ghost' onClick={onOpen}>
                Comment {comments.length}
            </Button>
            <Modal
                isCentered
                onClose={() => {
                    onClose();
                    formik.resetForm(); // Reset form on close
                }}
                isOpen={isOpen}
                scrollBehavior={'inside'}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent alignItems={'center'}>
                    <ModalHeader>
                        <Text>Comments</Text>
                        <InputGroup as={'form'} onSubmit={formik.handleSubmit} size='md'>
                            <Input
                                pr='4.5rem'
                                type={'text'}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name={'description'}
                                placeholder={'Share a Comment'}
                            />
                            <InputRightElement width='4.5rem'>
                            <Button type='submit' bg={'#00695c'} color={'white'} h='1.75rem' size='sm' _hover={{ bg: '#00695c' }}>
                                    Share
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width={"100%"}>
                        {loading ? (
                            <Text>Loading comments...</Text>
                        ) : error ? (
                            <Text color='red.500'>{error}</Text>
                        ) : (
                            <VStack spacing={2}>
                                {comments.map(comment => (
                                    <Card as={Link} to={`/profile/${comment.userId}`} key={comment.id} width={"100%"} size={'sm'}>
                                        <CardBody>
                                            <Heading size={'md'}>{comment.userName} {comment.userLastName}</Heading>
                                            <Text>{comment.description}</Text>
                                        </CardBody>
                                    </Card>
                                ))}
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CommentModal;
