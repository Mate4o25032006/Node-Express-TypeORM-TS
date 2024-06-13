import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuarioModel";

@Entity('Roles')
export class Rol extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Usuario)
    @JoinTable({
        name: 'roles_usuarios',
        joinColumn: { name: 'rol_id' },
        inverseJoinColumn: { name: 'usuario_id' }
    })
    usuarios: Usuario[];
}