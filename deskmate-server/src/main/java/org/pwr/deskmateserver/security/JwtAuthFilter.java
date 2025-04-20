package org.pwr.deskmateserver.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.pwr.deskmateserver.dto.ErrorDTO;
import org.pwr.deskmateserver.dto.UserDTO;
import org.pwr.deskmateserver.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;
import java.time.Instant;
import java.util.Base64;
import java.util.List;

@Component
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserService userService;

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    public JwtAuthFilter(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null) {
            String[] authElements = header.split(" ");
            String token = authElements[1];
            if (authElements.length == 2 && "Bearer".equals(authElements[0]) && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    UsernamePasswordAuthenticationToken authentication = validateTokenStrongly(token);
                    if (authentication != null) {
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        handleInvalidToken(response);
                        return;
                    }
                } catch (JWTDecodeException e) {
                    log.error(e.getMessage());
                    handleInvalidToken(response);
                    return;
                } catch (RuntimeException e) {
                    log.error(e.getMessage());
                    SecurityContextHolder.clearContext();
                    throw e;
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    public UsernamePasswordAuthenticationToken validateTokenStrongly(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decoded = verifier.verify(token);

            if (decoded.getExpiresAtAsInstant().isBefore(Instant.now())) {
                return null;
            }
            UserDTO user = userService.findUserByLogin(decoded.getSubject());
            user.setToken(token);

            String role = decoded.getClaim("role").asString();
            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

            return new UsernamePasswordAuthenticationToken(user, null, authorities);
        } catch (Exception e) {
            return null;
        }
    }

    private void handleInvalidToken(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ErrorDTO errorDto = new ErrorDTO("Invalid or Expired token");
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getWriter(), errorDto);
    }
}

