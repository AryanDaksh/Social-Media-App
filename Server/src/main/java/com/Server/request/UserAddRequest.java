package com.Server.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAddRequest {

    private String name;

    private String lastName;

    private String email;

    private String password;

}