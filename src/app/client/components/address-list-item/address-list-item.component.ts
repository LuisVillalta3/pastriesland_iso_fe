import { AddressEntity } from '@/app/entities/address.entity';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-address-list-item',
  imports: [MatIconModule],
  templateUrl: './address-list-item.component.html',
  styleUrl: './address-list-item.component.scss'
})
export class AddressListItemComponent {
  @Input() address!: AddressEntity
}
