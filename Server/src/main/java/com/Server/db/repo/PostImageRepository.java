package com.Server.db.repo;

import com.Server.db.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PostImageRepository extends JpaRepository<PostImage, Integer> {

    Optional<PostImage> findPostImageByPost_Id(int postId);

}
