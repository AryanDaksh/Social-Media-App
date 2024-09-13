package com.Server.response.user;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFollowerResponse {

    private int userId;

    private String name;

    private String lastName;

}
