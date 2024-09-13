package com.Server.response.user;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserJwtResponse {

    private int id;

    private String fullName;

    private String email;

}
