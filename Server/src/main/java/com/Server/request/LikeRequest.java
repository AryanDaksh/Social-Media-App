package com.Server.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeRequest {

    private int postId;

    private int userId;

}
