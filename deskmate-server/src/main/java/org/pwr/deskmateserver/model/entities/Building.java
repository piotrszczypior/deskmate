package org.pwr.deskmateserver.model.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "buildings")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Setter
    @Getter
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @OneToMany
    @Getter
    @JoinColumn(name = "building_id", referencedColumnName = "id")
    @Cascade(CascadeType.ALL)
    private List<Floor> floorList;

    public void addFloor(Floor floor) {
        if(this.floorList == null) {
            this.floorList = new ArrayList<>();
        }

        this.floorList.add(floor);
    }

    public void removeFloor(Floor floor) {
        this.floorList.remove(floor);
    }
}
