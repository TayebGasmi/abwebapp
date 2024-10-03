package com.appointment.booking.controller;
import com.appointment.booking.dto.FileDto;
import com.appointment.booking.entity.File;
import com.appointment.booking.service.FileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
@Tag(name = "File")
@CrossOrigin
public class FileController {
    private final FileService googleCloudStorageService;
    // Upload file endpoint
    @PostMapping("/upload/{id}")
    public ResponseEntity<FileDto> uploadFile(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            FileDto fileMetadata = googleCloudStorageService.uploadFile(id,file);
            return ResponseEntity.ok(fileMetadata);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Get file metadata by ID
    @GetMapping("/{id}")
    public ResponseEntity<File> getFile(@PathVariable Long id) {
        Optional<File> fileMetadata = googleCloudStorageService.getFile(id);
        return fileMetadata.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete file by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        googleCloudStorageService.deleteFile(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/doownloadlink/{filePath}")
    public ResponseEntity<String> getDowloadLink(@PathVariable String filePath) throws IOException {
        return ResponseEntity.ok(googleCloudStorageService.generateSignedUrl(filePath));
    }

    @GetMapping("/userFile/{userID}")
    public ResponseEntity<String> getFileUrl(@PathVariable Long userID) throws IOException {
        return ResponseEntity.ok(googleCloudStorageService.getFileByUserId(userID));
    }
}