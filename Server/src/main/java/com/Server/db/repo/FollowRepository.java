package com.Server.db.repo;

import com.Server.db.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

    List<Follow> findAllByUser_Id(int userId);

    Optional<Follow> findByUser_IdAndFollowing_Id(int userId, int followingId);

}
