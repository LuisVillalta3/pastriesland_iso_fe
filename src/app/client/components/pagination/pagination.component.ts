import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginationMeta} from '@app/types/paginated.response';
import {NgForOf, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  imports: [
    NgForOf,
    MatIconModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input({ required: true }) paginationMeta!: PaginationMeta;

  @Output() pageChange = new EventEmitter<number>()

  get pages(): number[] {
    return Array(this.paginationMeta.totalPages).fill(0)
  }

  isCurrentPage(page: number): boolean {
    return this.paginationMeta.page === page;
  }

  changePage(page: number) {
    if (this.isCurrentPage(page)) return;

    this.pageChange.emit(page)
  }

  changeToNextPage() {
    if (!this.paginationMeta.hasNextPage || !this.paginationMeta.nextPage) return;

    this.pageChange.emit(this.paginationMeta.nextPage);
  }

  changeToPrevPage() {
    if (!this.paginationMeta.hasPrevPage || !this.paginationMeta.prevPage) return;

    this.pageChange.emit(this.paginationMeta.prevPage);
  }
}
