import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Center, Heading, Image, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Posts from '../components/Posts';
import UserCard from '../components/UserCard';
import AuthContext from '../context/AuthContext';
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import svg from '../svgs/undraw_no_data_re_kwbl.svg';

function Profile() {
    const { userId } = useParams();
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [viewedUser, setViewedUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getToken = () => localStorage.getItem("token");

    const fetchPosts = useCallback(async () => {
        const postService = new PostService();
        try {
            const result = await postService.getAllByUserId(userId, getToken());
            setPosts(result.data);
        } catch (error) {
            console.log(error.message);
            setError("Error fetching posts. Please try again later.");
        }
    }, [userId]);

    const fetchUser = useCallback(async () => {
        const userService = new UserService();
        try {
            const result = await userService.getById(userId, getToken());
            setViewedUser(result.data);
            setFollowing(result.data.following);
            setFollowers(result.data.followers);
        } catch (error) {
            console.log(error.message);
            setError("Error fetching user data. Please try again later.");
        }
    }, [userId]);

    const checkFollowingStatus = useCallback(async () => {
        const userService = new UserService();
        try {
            const result = await userService.isFollowing(user.id, userId, getToken());
            setIsFollowing(result.data);
        } catch (error) {
            console.log(error.message);
            setError("Error checking follow status. Please try again later.");
        }
    }, [userId, user.id]);

    const checkOwnerStatus = useCallback(() => {
        setIsOwner(userId === user.id);
    }, [userId, user.id]);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchPosts(), fetchUser(), checkFollowingStatus()])
            .catch(err => setError("An unexpected error occurred."))
            .finally(() => setLoading(false));
    }, [fetchPosts, fetchUser, checkFollowingStatus]);

    useEffect(() => {
        checkOwnerStatus();
    }, [userId, checkOwnerStatus]);

    if (loading) {
        return (
            <Center>
                <Heading>Loading...</Heading>
            </Center>
        );
    }

    if (error) {
        return (
            <Center>
                <Heading>{error}</Heading>
            </Center>
        );
    }

    return (
        <>
            <Nav />
            <UserCard
                fullName={`${viewedUser.name} ${viewedUser.lastName}`}
                following={following.length}
                followers={followers.length}
                isFollowing={isFollowing}
                isOwner={isOwner}
                userId={userId}
                checkIsFollowing={checkFollowingStatus}
            />
            {
                posts.length === 0 ? (
                    <Center>
                        <VStack h={'100vh'} alignItems={'center'} justifyContent={'center'}>
                            <Heading>No posts to show</Heading>
                            <Image src={svg} h={'50vh'} />
                        </VStack>
                    </Center>
                ) : (
                    <Posts posts={posts} />
                )
            }
        </>
    );
}

export default Profile;
