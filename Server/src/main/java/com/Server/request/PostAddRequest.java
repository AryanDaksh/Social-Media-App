package com.Server.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostAddRequest {

    private int userId;

    private String description;

}
