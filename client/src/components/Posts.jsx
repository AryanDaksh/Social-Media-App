import { Center, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import PostCard from './PostCard';

function Posts({ posts }) {
    const imageUrl = process.env.REACT_APP_API + "postimages/download/";

    return (
        <Center>
            <VStack marginTop={'50px'} spacing={5} width="100%" maxWidth="container.md">
                {posts.length === 0 ? (
                    <Text>No posts available</Text>
                ) : (
                    posts.map(post => (
                        <PostCard
                            key={post.id}
                            description={post.description}
                            userName={`${post.userName} ${post.userLastName}`}
                            postImage={imageUrl + post.id}
                            postId={post.id}
                            userId={post.userId}
                        />
                    ))
                )}
            </VStack>
        </Center>
    );
}

export default Posts;
