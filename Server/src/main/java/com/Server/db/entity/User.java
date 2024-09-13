package com.Server.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "email")
    @Email
    private String email;

    @NotNull
    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    Set<Follow> following;
    @OneToMany(mappedBy = "following",cascade = CascadeType.ALL)
    Set<Follow> followers;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    Set<Post> posts;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    Set<Like> likes;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    Set<UserImage> images;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    Set<Comment>comments;

}
