package com.Server.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String name;

    private String lastName;

    private String email;

    private String password;

}
