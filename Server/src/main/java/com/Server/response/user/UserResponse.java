package com.Server.response.user;

import lombok.*;
import java.util.List;
import com.Server.response.user.UserFollowerResponse;
import com.Server.response.user.UserFollowingResponse;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private int id;

    private String name;

    private String lastName;

    private String email;

    private List<UserFollowerResponse> followers;

    private List<UserFollowingResponse> following;

}
