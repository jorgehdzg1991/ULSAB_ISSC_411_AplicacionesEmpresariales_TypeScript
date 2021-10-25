import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Car {
  constructor(
    id: string,
    brand: string,
    model: string,
    submodel: string,
    year: number
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.submodel = submodel;
    this.year = year;
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { length: 32, nullable: false })
  public brand: string;

  @Column('varchar', { length: 32, nullable: false })
  public model: string;

  @Column('varchar', { length: 32, nullable: true })
  public submodel?: string;

  @Column('smallint', { nullable: false })
  public year: number;
}
