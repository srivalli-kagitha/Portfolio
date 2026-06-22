package com.sri.portfolio.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        // Normalize null-safe path
        if (path == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ Skip JWT for frontend + static resources
        if (path.equals("/") ||
                path.equals("/index.html") ||
                path.equals("/favicon.ico") ||
                path.equals("/profile.jpg") ||
                path.startsWith("/assets") ||
                path.equals("/resume.pdf") ||
path.startsWith("/files") ||
                path.startsWith("/static") ||
                path.startsWith("/project-images") ||
                path.endsWith(".js") ||
                path.endsWith(".css") ||
                path.endsWith(".svg") ||
                path.endsWith(".png") ||
                path.endsWith(".jpg") ||
                path.startsWith("/h2-console")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String jwt = authHeader.substring(7);
            String username = jwtUtil.extractUsername(jwt);

            if (username != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null &&
                    jwtUtil.validateToken(jwt, username)) {

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        } catch (Exception e) {
            // ignore invalid token
        }

        filterChain.doFilter(request, response);
    }
}