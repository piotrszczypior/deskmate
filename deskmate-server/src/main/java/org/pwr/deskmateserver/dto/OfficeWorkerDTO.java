package org.pwr.deskmateserver.dto;

import lombok.*;
import org.pwr.deskmateserver.model.entities.OfficeWorker;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OfficeWorkerDTO {
    private Long id;
    private String firstName;
    private String lastName;

    public static OfficeWorkerDTO from(OfficeWorker worker) {
        return OfficeWorkerDTO.builder()
            .id(worker.getId())
            .firstName(worker.getFirstName())
            .lastName(worker.getLastName())
            .build();
    }
}
