import { Center, Heading, Image, VStack, useToast } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Posts from '../components/Posts';
import ProfileCard from '../components/ProfileCard';
import AuthContext from '../context/AuthContext';
import PostService from '../services/PostService';
import svg from '../svgs/undraw_no_data_re_kwbl.svg';

function Home() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    // Function to get the token from localStorage
    const getToken = () => localStorage.getItem("token");

    // Fetch posts data from the server
    const getData = useCallback(async () => {
        setLoading(true);
        const postService = new PostService();
        try {
            if (user.id) {
                const result = await postService.getAllByUserFollowing(user.id, getToken());
                setPosts(result.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error.message);
            toast({
                title: "Error fetching posts",
                description: "There was an error loading the posts. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    }, [user.id, toast]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <>
            <Nav />
            <ProfileCard userName={user.fullName} />
            {loading ? (
                <Center>
                    <Heading>Loading posts...</Heading>
                </Center>
            ) : posts.length === 0 ? (
                <Center>
                    <VStack h={'100vh'} alignItems={'center'} justifyContent={'center'}>
                        <Heading>No posts to show</Heading>
                        <Image src={svg} h={'50vh'} />
                    </VStack>
                </Center>
            ) : (
                <Posts posts={posts} />
            )}
        </>
    );
}

export default Home;
