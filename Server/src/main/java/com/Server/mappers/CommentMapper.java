package com.Server.mappers;

import com.Server.db.entity.Comment;
import com.Server.request.CommentAddRequest;
import com.Server.response.CommentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "user.id",target = "userId")
    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "user.name",target = "userName")
    @Mapping(source = "user.lastName",target = "userLastName")
    CommentResponse commentToResponse(Comment comment);

    List<CommentResponse> commentsToResponses(List<Comment> comments);

    @Mapping(source = "userId",target = "user.id")
    @Mapping(source = "postId",target = "post.id")
    Comment addRequestToComment(CommentAddRequest commentAddRequest);

}
