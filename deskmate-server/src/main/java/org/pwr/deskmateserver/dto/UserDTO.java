package org.pwr.deskmateserver.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    @JsonIgnore
    private Long id;
    private String email;
    private String login;
    private String role;
    @JsonIgnore
    private String token;
}
