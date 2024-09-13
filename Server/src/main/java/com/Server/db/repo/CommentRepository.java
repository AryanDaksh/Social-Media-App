package com.Server.db.repo;

import com.Server.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    void deleteById(int id);

    List<Comment> findAllByUser_Id(int userId);

    List<Comment> findAllByPost_Id(int postId);

}
