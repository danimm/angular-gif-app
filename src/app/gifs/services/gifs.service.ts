import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifsList:      Gif[] = []
  private _tagsHistory: string[] = []
  private apiKey:       string = 'HkQvrnuogeiGjGE2V7jPgQrpw0lvqk3Y'
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs'

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage()
  }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase()

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory
        .filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage()
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private async loadLocalStorage(): Promise<void> {
    const temporal = localStorage.getItem('history')
    if (!temporal) return

    this._tagsHistory = JSON.parse(temporal) as string[]

    if (this._tagsHistory.length === 0) return

    await this.searchTag(this._tagsHistory[0])
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return

    this.organizeHistory(tag)

    // Fetch
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((response) => {
        this.gifsList = response.data
      })
  }
}
