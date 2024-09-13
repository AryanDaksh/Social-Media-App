package com.Server.response.user;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserImageResponse {

    private int id;

    private String name;

    private String type;

    private byte[] data;

    private int userId;

}
