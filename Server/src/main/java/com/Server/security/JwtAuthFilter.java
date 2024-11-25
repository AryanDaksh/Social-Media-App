package com.Server.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService service;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = httpServletRequest.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Remove "Bearer " prefix

            if (token != null && !token.trim().isEmpty()) {
                try {
                    // Extract the username (subject) from the token
                    String userName = jwtUtil.extractUsername(token);
                    System.out.println("Extracted username from token: " + userName); // Log the username for debugging

                    // If username is not null and authentication is not already set
                    if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        // Load user details using the extracted username
                        UserDetails userDetails = service.loadUserByUsername(userName);

                        // Validate the token with userDetails
                        if (jwtUtil.validateToken(token, userDetails)) {
                            // Create authentication token and set it in security context
                            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            usernamePasswordAuthenticationToken
                                    .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

                            // Set authentication in the security context
                            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                        } else {
                            System.err.println("Invalid JWT token");
                        }
                    }
                } catch (RuntimeException e) {
                    // Log error for debugging purposes
                    System.err.println("Error decoding or validating token: " + e.getMessage());
                    httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
                }
            } else {
                System.err.println("Token is null or empty");
            }
        }

        // Continue the filter chain
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }


}
