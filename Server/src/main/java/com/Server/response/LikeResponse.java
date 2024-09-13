package com.Server.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeResponse {

    private int id;

    private int userId;

    private String name;

    private String lastName;

}
