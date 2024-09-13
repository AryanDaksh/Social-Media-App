package com.Server.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FollowRequest {

    private int userId;

    private int followingId;

}
