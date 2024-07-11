package com.appointment.booking.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailDto {
    @NonNull
    @NotEmpty
    private Set<String> to;
    @NonNull
    @NotEmpty
    private String from;
    @NonNull
    @NotEmpty
    private String subject;
    @NonNull
    @NotEmpty
    private String body;

}
