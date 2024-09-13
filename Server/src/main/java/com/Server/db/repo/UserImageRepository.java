package com.Server.db.repo;

import com.Server.db.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserImageRepository extends JpaRepository<UserImage, Integer> {

    Optional<UserImage> findByUser_Id(int userId);

}
