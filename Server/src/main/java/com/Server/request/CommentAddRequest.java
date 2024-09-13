package com.Server.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentAddRequest {

    private int postId;

    private int userId;

    private String description;

}
