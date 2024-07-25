package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.entity.Student;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SessionDto extends BaseDto<Long> implements Serializable {
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String sessionLink;
    private int capacity;
    private String status;
    private List<String> tags;
//    private TeacherDto teacherId;
    private Set<StudentDto> students;

}
