package com.Server.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowResponse {

    private int id;

    private int followerId;

    private int followingId;

    private String followerName;

    private String followingName;

}

