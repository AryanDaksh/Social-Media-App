import { Flex, Card, CardHeader, CardBody, CardFooter, Button, Avatar, Box, Heading, Text, Image } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BiLike, BiShare } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import LikeService from '../services/LikeService';
import CommentModal from './CommentModal';

function PostCard({ userName, userImage, description, postImage, postId, userId }) {
  const { user } = useContext(AuthContext);

  // Initialize likeService using useMemo
  const likeService = useMemo(() => new LikeService(), []);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const handleLike = async () => {
    try {
      await likeService.add(user.id, postId, localStorage.getItem("token"));
      getLikes();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async () => {
    try {
      await likeService.delete(user.id, postId, localStorage.getItem("token"));
      getLikes();
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const checkIsLiked = useCallback(async () => {
    try {
      const result = await likeService.isLiked(user.id, postId, localStorage.getItem("token"));
      setIsLiked(result.data);
    } catch (error) {
      console.error('Error checking if post is liked:', error);
    }
  }, [likeService, user.id, postId]);

  const getLikes = useCallback(async () => {
    try {
      const result = await likeService.getLikesByPost(postId, localStorage.getItem("token"));
      setLikes(result.data);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [likeService, postId]);

  useEffect(() => {
    checkIsLiked();
    getLikes();
  }, [checkIsLiked, getLikes]);

  return (
    <Card maxW='lg'>
      <CardHeader as={Link} to={`/profile/${userId}`}>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={userName} src={userImage} />
            <Box>
              <Heading size='sm'>{userName}</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      {postImage && (
        <Image
          maxW='md'
          maxH='sm'
          objectFit='contain'
          src={postImage}
          fallback={<Text>No Image Available</Text>}
        />
      )}
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button
          onClick={isLiked ? handleUnlike : handleLike}
          flex='1'
          colorScheme={isLiked ? 'pink' : 'whiteAlpha'}
          leftIcon={<BiLike />}
        >
          Like {likes.length}
        </Button>
        <CommentModal postId={postId} />
        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
