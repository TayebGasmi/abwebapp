package com.appointment.booking.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.validation.annotation.Validated;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Validated
public class MeetingDto {

    @NotEmpty
    @NotNull
    private Set<MeetingParticipant> participants;
    @NotBlank
    @NotNull
    private String summary;
    @NotBlank
    @NotNull
    private String description;
    @NotNull
    @FutureOrPresent
    private ZonedDateTime startDate;
    @NotNull
    @Future
    private ZonedDateTime endDate;

}
