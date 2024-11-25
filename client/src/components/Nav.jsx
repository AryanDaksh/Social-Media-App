import {
  Box,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { BiHome } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import AuthContext from '../context/AuthContext';
import AddPost from '../pages/AddPost';
import NavItem from './NavItem';

function Nav() {
  const { user } = useContext(AuthContext);

  return (
    <Box
      top={{ lg: 4 }}
      zIndex={1}
      w={{ base: "100%", lg: '30vh' }}
      position={{ base: 'sticky', lg: 'fixed' }}
      px={5}
    >
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        borderRadius="2xl"
        spacing={10}
        p={5}
        pt={{ lg: '10vh' }}
        h={{ base: 'auto', lg: '95vh' }}
        direction={{ base: 'row', lg: 'column' }}
        boxShadow="2xl"
      >
        <NavItem description="Home" icon={<BiHome />} path="/home" aria-label="Home" />
        {user?.id && (
          <NavItem
            description="Profile"
            icon={<CgProfile />}
            path={`/profile/${user.id}`}
            aria-label="Profile"
          />
        )}
        <AddPost />
      </Stack>
    </Box>
  );
}

export default Nav;
