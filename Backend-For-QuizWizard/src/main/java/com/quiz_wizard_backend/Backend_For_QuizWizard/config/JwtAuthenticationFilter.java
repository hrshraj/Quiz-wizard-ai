package com.quiz_wizard_backend.Backend_For_QuizWizard.config; // Consider moving to a 'security' package

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService; // Corrected import
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.quiz_wizard_backend.Backend_For_QuizWizard.utils.JwtUtils;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils; // Make final
    private final UserDetailsService userDetailsService; // Make final

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try { // Moved try-catch block to wrap the token processing
            String jwt = authHeader.substring(7); // Extract token after "Bearer "

            // Ensure extractUsername is compatible with validateToken method's internal checks
            String username = jwtUtils.extractUsername(jwt);

            // validateToken should also handle token expiration and signature
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null && jwtUtils.validateToken(jwt, username)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // No need for a separate if (jwtUtils.isTokenValid(token)) here, validateToken already checks
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            // Log the exception for debugging purposes (e.g., JWT parsing error, invalid token)
            // log.error("JWT authentication failed: {}", ex.getMessage());
            // Optionally, send an HTTP 401 Unauthorized response here if you want to explicitly deny
            // response.setStatus(HttpStatus.UNAUTHORIZED.value());
            // return;
        }

        filterChain.doFilter(request, response);
    }

    // Removed getJwtFromRequest as it's directly handled in doFilterInternal
    // private String getJwtFromRequest(HttpServletRequest request) {
    //     String bearerToken = request.getHeader("Authorization");
    //     if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
    //         return bearerToken.substring(7);
    //     }
    //     return null;
    // }
}