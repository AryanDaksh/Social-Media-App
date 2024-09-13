package com.Server.db.repo;

import com.Server.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    void deleteById(int id);

    User findByEmail(String email);

}
