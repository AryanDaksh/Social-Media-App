package com.Server.web;

import com.Server.request.LikeRequest;
import com.Server.response.LikeResponse;
import com.Server.service.LikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikesController {

    private final LikeService likeService;

    public LikesController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody LikeRequest likeRequest){
        likeService.add(likeRequest);
        return new ResponseEntity<>("Added", HttpStatus.OK);
    }

    @GetMapping("/getallbypost/{postId}")
    public ResponseEntity<List<LikeResponse>> getAllByPost(@PathVariable int postId){
        return new ResponseEntity<>(likeService.getAllByPost(postId),HttpStatus.OK);
    }

    @GetMapping("/getallbyuser/{userId}")
    public ResponseEntity<List<LikeResponse>> getAllByUser(@PathVariable int userId){
        return new ResponseEntity<>(likeService.getAllByUser(userId),HttpStatus.OK);
    }

    @GetMapping("/isliked")
    public ResponseEntity<Boolean> isLiked(@RequestParam int userId,@RequestParam int postId){
        return new ResponseEntity<>(likeService.isLiked(userId,postId),HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody LikeRequest likeRequest){
        likeService.delete(likeRequest);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }

}
