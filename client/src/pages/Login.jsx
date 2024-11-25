import React, { useContext, useState } from 'react';
import {
    Button, Container, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, Text,
    useBreakpointValue, useToast, VStack
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import svg from '../svgs/main.svg';

function Login() {
    const { login } = useContext(AuthContext);
    const authService = new AuthService();
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const result = await authService.login(values);
                login(result.data);  // Assuming result.data contains the JWT token
                toast({
                    title: "Login Successful",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/home");  // Navigate to home page on success
            } catch (error) {
                console.error("Login failed: ", error);
                toast({
                    title: "Login Failed",
                    description: error.response?.data?.message || "Invalid email or password. Please try again.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <Stack direction={'row'} spacing={0} minH={'100vh'}>
            <Flex alignItems={'center'} justifyContent={'center'} width={{ base: 0, md: '100%', lg: '100%' }}>
                <VStack p={10} spacing={5}>
                    <Stack spacing={6} w={'full'} maxW={'lg'}>
                        <Heading fontSize={{ base: '0', md: '5xl', lg: '6xl' }}>
                            <Text
                                as={'span'}
                                position={'relative'}
                                _after={{
                                    content: "''",
                                    width: 'full',
                                    height: useBreakpointValue({ base: '20%', md: '30%' }),
                                    position: 'absolute',
                                    bottom: 1,
                                    left: 0,
                                    bg: '#00695c',
                                    zIndex: -1,
                                }}>
                                Spring-React
                            </Text>
                            <br />{' '}
                            <Text color={'#00695c'} as={'span'}>
                                Social Media App
                            </Text>{' '}
                        </Heading>
                    </Stack>
                    <Image src={svg} />
                </VStack>
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <Container>
                    <VStack as={'form'} p={10} onSubmit={formik.handleSubmit} borderRadius={'xl'} boxShadow={'2xl'} spacing={5}>
                        <Heading>Login</Heading>
                        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                name='email'
                                type='email'
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Text color='red.500'>{formik.errors.email}</Text>
                            ) : null}
                        </FormControl>
                        <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                            />
                            <Button mt={2} onClick={() => setShowPassword(!showPassword)} size="sm">
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                            {formik.touched.password && formik.errors.password ? (
                                <Text color='red.500'>{formik.errors.password}</Text>
                            ) : null}
                        </FormControl>
                            <Button type='submit' colorScheme='$rmd-teal-800' isLoading={formik.isSubmitting} sx={{ bg: '#00695c', color: 'white', _hover: { bg: '#004d40' } }}>
                                Submit
                            </Button>

                    </VStack>
                </Container>
            </Flex>
        </Stack>
    );
}

export default Login;
