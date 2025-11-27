export class ContactEntity {
  readonly id!: number;

  readonly name!: string;

  readonly email!: string;

  readonly whatsapp!: string;

  readonly message?: string;

  readonly createdAt!: Date;
}
