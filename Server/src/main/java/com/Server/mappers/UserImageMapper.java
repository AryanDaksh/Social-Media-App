package com.Server.mappers;

import com.Server.db.entity.UserImage;
import com.Server.response.user.UserImageResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserImageMapper {

    @Mapping(source = "user.id",target = "userId")
    UserImageResponse userImageToResponse(UserImage userImage);

}
