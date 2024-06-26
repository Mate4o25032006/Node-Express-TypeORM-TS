import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rol } from "./rolModel";

@Entity('usuarios')
export class Usuario extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: String;

    @Column()
    correo: String;

    @Column()
    contrasenia: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Rol, rol => rol.usuarios)
    @JoinTable({
        name: 'roles_usuarios',
        joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' }
    })
    roles: Rol[];
}