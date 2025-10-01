export abstract class BaseEntity {
  readonly id!: string;

  readonly createdAt!: Date;

  updatedAt: Date = new Date;
}
