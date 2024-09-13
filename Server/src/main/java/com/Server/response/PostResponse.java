package com.Server.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {

    private int id;

    private int userId;

    private String userName;

    private String userLastName;

    private String Description;

}
