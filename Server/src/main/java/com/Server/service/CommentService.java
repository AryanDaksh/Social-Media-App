package com.Server.service;

import com.Server.db.entity.Comment;
import com.Server.db.repo.CommentRepository;
import com.Server.mappers.CommentMapper;
import com.Server.request.CommentAddRequest;
import com.Server.request.CommentUpdateRequest;
import com.Server.response.CommentResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    public void add(CommentAddRequest commentAddRequest){
        Comment comment = commentMapper.addRequestToComment(commentAddRequest);
        commentRepository.save(comment);
    }

    public List<CommentResponse> getAll(){
        List<Comment> comments = commentRepository.findAll();
        return commentMapper.commentsToResponses(comments);
    }

    public CommentResponse getById(int id){
        Comment comment = commentRepository.findById(id).orElse(null);
        return  commentMapper.commentToResponse(comment);
    }

    public List<CommentResponse> getAllByPost(int postId){
        List<Comment> comments = commentRepository.findAllByPost_Id(postId);
        return commentMapper.commentsToResponses(comments);
    }

    public List<CommentResponse> getAllByUser(int userId){
        List<Comment> comments = commentRepository.findAllByUser_Id(userId);
        return commentMapper.commentsToResponses(comments);
    }
    public void update(int id, CommentUpdateRequest commentUpdateRequest){
        Comment commentToUpdate = commentRepository.findById(id).orElse(null);
        if (commentToUpdate!=null){
            commentToUpdate.setDescription(commentUpdateRequest.getDescription());
        }
    }

    public void delete(int id){
        commentRepository.deleteById(id);
    }
}
