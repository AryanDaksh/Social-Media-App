package com.Server.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAddRequest {

    @NonNull
    private String name;

    @NonNull
    private String lastName;

    @NonNull
    private String email;

    @NonNull
    private String password;

}