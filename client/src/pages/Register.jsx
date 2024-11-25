import { Button, Container, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, Text, useBreakpointValue, useToast, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthService from '../services/AuthService';
import svg from '../svgs/main.svg';

const FormField = ({ formik, name, label, type = 'text' }) => (
  <FormControl isInvalid={formik.errors[name] && formik.touched[name]}>
    <FormLabel>{label}</FormLabel>
    <Input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      name={name}
      type={type}
    />
    {formik.errors[name] && formik.touched[name] && <Text color='red.500'>{formik.errors[name]}</Text>}
  </FormControl>
);

function Register() {
  const authService = new AuthService();
  const toast = useToast();
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: ""
    },
    validate: values => {
      const errors = {};
      if (!values.name) errors.name = 'Required';
      if (!values.lastName) errors.lastName = 'Required';
      if (!values.email) errors.email = 'Required';
      else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Invalid email address';
      if (!values.password) errors.password = 'Required';
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const result = await authService.register(values);
        login(result); // Adjust according to your backend response
        toast({
          title: "Registration Successful",
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        const errorMessage = error.message || "An unexpected error occurred";
        toast({
          title: "Registration Error",
          description: errorMessage,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
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
              <br />
              <Text color={'#00695c'} as={'span'}>
                Social Media App
              </Text>
            </Heading>
          </Stack>
          <Image src={svg} />
        </VStack>
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'} width={'100%'}>
        <Container>
          <VStack as={'form'} p={10} onSubmit={formik.handleSubmit} borderRadius={'xl'} boxShadow={'2xl'} spacing={5}>
            <Heading>Register</Heading>
            <FormField formik={formik} name='name' label='First Name' />
            <FormField formik={formik} name='lastName' label='Last Name' />
            <FormField formik={formik} name='email' label='Email address' type='email' />
            <FormField formik={formik} name='password' label='Password' type='password' />
            <Button type='submit' colorScheme='$rmd-teal-800' sx={{ bg: '#00695c', color: 'white', _hover: { bg: '#004d40' } }}>Register</Button>
            <Button as={Link} to={"/login"}>Login</Button>
          </VStack>
        </Container>
      </Flex>
    </Stack>
  );
}

export default Register;
