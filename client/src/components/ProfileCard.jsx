import React, { useContext } from 'react';
import { Card, CardHeader, Box, Flex, Avatar, Heading, Text, Button, HStack } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';

function ProfileCard({ userName, userImage }) {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error during logout:", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <Flex
            position={{ base: 'relative', xl: 'fixed' }}
            alignItems={{ base: 'center', xl: 'flex-end' }}
            justifyContent={{ base: 'center', xl: 'flex-end' }}
            width={"100%"}
            right={{ xl: 12 }}
            top={{ base: 4, xl: 12 }}
        >
            <Card w={{ base: 'md', xl: 'sm' }} boxShadow='md'>
                <CardHeader>
                    <HStack justifyContent={'center'} alignItems={'center'} spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={userName || "User"} src={userImage || ""} />
                            <Box>
                                <Text fontSize='sm'>Logged in as :</Text>
                                <Heading size='sm'>{userName || "Guest"}</Heading>
                            </Box>
                        </Flex>
                        <Button onClick={handleLogout} bg={'#00695c'} color={'white'} _hover={{ bg: '#00695c' }}>Log out
                            
                        </Button>

                    </HStack>
                </CardHeader>
            </Card>
        </Flex>
    );
}

export default ProfileCard;
