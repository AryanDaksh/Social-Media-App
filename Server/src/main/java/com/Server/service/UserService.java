package com.Server.service;

import com.Server.db.entity.Follow;
import com.Server.db.entity.User;
import com.Server.db.repo.FollowRepository;
import com.Server.db.repo.UserRepository;
import com.Server.mappers.UserMapper;
import com.Server.request.UserAddRequest;
import com.Server.response.user.UserFollowingResponse;
import com.Server.response.user.UserResponse;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public UserService(UserMapper userMapper, UserRepository userRepository, FollowRepository followRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.followRepository = followRepository;
    }

    public List<UserResponse> getAll(){

        return userMapper.usersToResponses(userRepository.findAll());
    }
    public UserResponse getResponseById(int id){
        User user = userRepository.findById(id).orElse(null);
        return userMapper.userToResponse(user);
    }

    public UserResponse getByEmail(String email){
        User user = userRepository.findByEmail(email);
        return userMapper.userToResponse(user);
    }

    public List<UserFollowingResponse> getUserFollowing(int userId){
        return userMapper.followsToFollowingResponses(followRepository.findAllByUser_Id(userId));
    }

    public boolean isFollowing(int userId,int followingId){
        Optional<Follow> follow = followRepository.findByUser_IdAndFollowing_Id(userId,followingId);
        return follow.isPresent();
    }

    public User getById(int id){
        return userRepository.findById(id).get();
    }

    public void add(UserAddRequest userAddRequest) {
        try {
            // Log the request values
            System.out.println("Adding user with name: " + userAddRequest.getName());

            User user = userMapper.requestToUser(userAddRequest);
            userRepository.save(user);
        } catch (Exception ex) {
            // Handle exceptions and provide meaningful messages
            throw new RuntimeException("Failed to add user: " + ex.getMessage(), ex);
        }
    }


    public void delete(int id){
        userRepository.deleteById(id);
    }
}
