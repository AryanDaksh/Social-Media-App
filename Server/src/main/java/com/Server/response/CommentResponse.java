package com.Server.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {

    private int id;

    private int postId;

    private int userId;

    private String userName;

    private String userLastName;

    private String description;

}
