import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { FormFields } from './Form_fields';

@Entity('field_types')
export class FieldTypes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => FormFields, (formField) => formField.fieldType)
    formFields: FormFields[];

    @CreateDateColumn()
    created_at: Date;
}
