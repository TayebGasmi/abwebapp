package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Subject;
import java.util.List;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends BaseRepository<Subject, Long>, JpaSpecificationExecutor<Subject> {

    List<Subject> findByTeachers_Email(String email);

    @Query("SELECT s FROM Subject s " +
           "JOIN s.schoolTypes st " +
           "JOIN s.schoolYears sy " +
           "WHERE st.name = :schoolType AND sy.name = :schoolYear")
    List<Subject> findBySchoolTypeNameAndSchoolYearName(String schoolType, String schoolYear);
}