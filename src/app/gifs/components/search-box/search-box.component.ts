import { Component, ElementRef, ViewChild } from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Search: </h5>
    <input
      (keyup.enter)="searchTag()"
      type="text"
      class="form-control"
      placeholder="Type to search gifs.."
      #searchInput
    >
  `
})

export class SearchBoxComponent {
  @ViewChild('searchInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private gifsService: GifsService
  ) {}

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value

    this.gifsService.searchTag(newTag)

    this.tagInput.nativeElement.value = ''
  }
}
