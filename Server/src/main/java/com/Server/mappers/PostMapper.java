package com.Server.mappers;

import com.Server.db.entity.Post;
import com.Server.request.PostAddRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.Server.response.PostResponse;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(source = "user.id",target = "userId")
    @Mapping(source = "user.lastName",target = "userLastName")
    @Mapping(source = "user.name",target = "userName")
    PostResponse postToGetResponse(Post post);

    @Mapping(source = "userId",target = "user.id")
    Post postAddRequestToPost(PostAddRequest postAddRequest);

    List<PostResponse> postsToGetResponses(List<Post> posts);

}
