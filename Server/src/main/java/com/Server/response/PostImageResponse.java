package com.Server.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostImageResponse {

    private int id;

    private String name;

    private String type;

    private byte[] data;

    private int postId;

}
