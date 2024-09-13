package com.Server.mappers;

import com.Server.db.entity.PostImage;
import com.Server.response.PostImageResponse;
import com.Server.response.PostResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostImageMapper {

    @Mapping(source = "post.id",target = "postId")
    PostImageResponse imageToResponse(PostImage postImage);

}
