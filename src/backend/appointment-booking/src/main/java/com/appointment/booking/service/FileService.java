package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.FileDto;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.File;
import com.appointment.booking.entity.User;
import com.appointment.booking.mapper.FileMapper;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.repository.FileRepository;
import com.appointment.booking.repository.UserRepository;
import com.google.cloud.storage.*;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;


@Service
public class FileService extends BaseServiceImpl<File, Long, FileDto> {
    private final Storage storage;
    private final FileRepository fileRepository;
    private final FileMapper fileMapper;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    @Value("${gcp.bucket.id}")
    private String bucketName;  // Replace with your bucket name

    public FileService(FileRepository fileRepository, FileMapper fileMapper, UserMapper userMapper, UserRepository userRepository) {
        this.fileMapper = fileMapper;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.storage = StorageOptions.getDefaultInstance().getService();
        this.fileRepository = fileRepository;
    }

    public FileDto uploadFile(long userId, MultipartFile file) throws IOException, IOException {
        User user = userRepository.findById(userId).get();
        if (user.getFiles() != null && user.getFiles().size() > 0) {
            user.getFiles().forEach(file1 ->
            {
                this.deleteFile(file1.getId());
                fileRepository.delete(file1);
            });
        }
        String fileName = generateUniqueFilename(file);
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        storage.create(blobInfo, file.getBytes());
        UserDto userDto = userMapper.convertEntityToDto(user);
        String fileUrl = String.format("https://storage.googleapis.com/%s/%s", bucketName, fileName);
        FileDto fileDto = FileDto.builder().
                user(userDto)
                .fileUrl(fileUrl)
                .fileName(fileName).build();
        return this.add(fileDto);
    }

    public Optional<File> getFile(Long id) {
        return fileRepository.findById(id);
    }

    public String generateUniqueFilename(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
        String uniqueFilename = UUID.randomUUID().toString() + extension;
        return uniqueFilename;
    }

    public void deleteFile(Long id) {
        Optional<File> file = fileRepository.findById(id);

        if (file.isPresent()) {
            File metadata = file.get();
            String fileName = metadata.getFileName();
            BlobId blobId = BlobId.of(bucketName, fileName);
            storage.delete(blobId);
            fileRepository.deleteById(id);
        }
    }

    public String generateSignedUrl(String filePath) throws IOException {
        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, filePath).build();
        URL signedUrl = storage.signUrl(blobInfo, 15, TimeUnit.MINUTES, Storage.SignUrlOption.withV4Signature());
        return signedUrl.toString();
    }

    public String getFileByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            File file =user.get().getFiles().stream().findFirst().orElse(null);
            if(file != null) {
                return file.getFileUrl();
            }
        }
        return null;
    }
}
