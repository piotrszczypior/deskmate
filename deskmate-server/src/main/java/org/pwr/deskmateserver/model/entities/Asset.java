package org.pwr.deskmateserver.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "assets")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    /**
     * Local path to the file in the filesystem. Relative to the storage root.
     */
    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "mime_type", nullable = false, length = 255)
    private String mimeType;
}
