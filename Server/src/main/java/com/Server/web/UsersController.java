package com.Server.web;

import com.Server.request.UserAddRequest;
import com.Server.response.user.UserResponse;
import com.Server.service.UserService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<UserResponse>> getAll(){
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable int id){
        return new ResponseEntity<>(userService.getResponseById(id),HttpStatus.OK);
    }

    @GetMapping("/isfollowing")
    public ResponseEntity<Boolean> isFollowing(@RequestParam int userId, @RequestParam int followingId){
        return new ResponseEntity<>(userService.isFollowing(userId,followingId),HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@Valid @RequestBody UserAddRequest userAddRequest) {
        try {
            // Log received request data
            System.out.println("Received UserAddRequest: " + userAddRequest);

            userService.add(userAddRequest);
            return ResponseEntity.ok("User added successfully");
        } catch (ConstraintViolationException ex) {
            String errorMessage = ex.getConstraintViolations().stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body("Validation error: " + errorMessage);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + ex.getMessage());
        }
    }



    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam(required = false) Integer id) {
        if (id == null) {
            return new ResponseEntity<>("Required parameter 'id' is not present.", HttpStatus.BAD_REQUEST);
        }
        userService.delete(id);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

}
