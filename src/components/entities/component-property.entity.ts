import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Component } from './component.entity';
import { FieldType } from '../../catalogs/entities/field-type.entity';

@Entity()
export class ComponentProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  value: string;

  @ManyToOne(() => Component, (component) => component.properties)
  @JoinColumn({ name: 'component_id' })
  component: Component;

  @ManyToOne(() => FieldType, { nullable: true })
  @JoinColumn({ name: 'field_type_id' })
  fieldType: FieldType;
}
