package com.appointment.booking.dto;

import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SessionMetadataDto {

    private Long teacherId;
    private String teacherFirstName;
    private String teacherLastName;
    private String teacherEmail;
    private Long studentId;
    private String studentFirstName;
    private String studentLastName;
    private String studentEmail;
    private Long subjectId;
    private String subjectName;
    private ZonedDateTime startDateTime;
}
