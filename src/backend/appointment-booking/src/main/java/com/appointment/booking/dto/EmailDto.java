package com.appointment.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailDto {
    @NotNull
    @NotEmpty
    private Set<String> to;
    @NotNull
    @NotBlank
    private String from;
    @NotNull
    @NotBlank
    private String subject;
    private String body;

}
