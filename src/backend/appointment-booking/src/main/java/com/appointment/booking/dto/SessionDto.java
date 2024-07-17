package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SessionDto extends BaseDto<Long> {
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String sessionLink;
    private int capacity;
    private String status;
    private List<String> tags;
    private long lessonId;
    private long teacherId;
    private Set<Long> listStudentIds;

}
