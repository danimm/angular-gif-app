import { Component, ElementRef, ViewChild } from '@angular/core';

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

  // searchTag(newTag: string) {
  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value
    console.log({ newTag })
  }
}
