import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { FormFieldValidations } from './Form_field_validations';

@Entity('validation_types')
export class ValidationTypes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => FormFieldValidations, (formFieldValidation) => formFieldValidation.validationType)
    formFieldValidations: FormFieldValidations[];

    @CreateDateColumn()
    created_at: Date;
}
