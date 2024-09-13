package com.Server.db.entity;

import lombok.Data;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Set;

@Data
@Entity
@Table(name = "posts")
public class Post {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
    Set<Like> likes;

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
    Set<PostImage> postImages;

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
    Set<Comment> comments;

}
