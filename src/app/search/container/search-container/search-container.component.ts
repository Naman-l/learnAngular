import { Component } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';
import { Repos } from 'src/app/shared/models/search.interface';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css'],
})
export class SearchContainerComponent {
  inputTouched = false;
  loading = false;
  repos: Repos[] = [];
  details: any = {};
  pageNumber: number = 1;
  inputStr: string = '';
  showDetails: boolean = false;
  availablePages: number[] = [];

  constructor(private searchService: SearchService) { }

  handleSearch(inputValue: any, pageNumber: number) {
    this.loading = true;
    this.inputStr = inputValue;
    this.searchService
      .getDetails(inputValue, pageNumber)
      .subscribe((items: any) => {
        this.details = items;
        this.showDetails = true;
        let i = 1;
        this.availablePages.length = 0;
        while (i <= Math.ceil(this.details.public_repos / 10)) {
          this.availablePages.push(i);
          i = i + 1;
        }
        this.searchService.getRepos(inputValue, 1).subscribe((items: any) => {
          this.repos = items;
          this.inputTouched = true;
          this.loading = false;
        });
      });
  }
  paginationCallNext() {
    if (this.pageNumber == this.availablePages.length) {
      return;
    }

    this.pageNumber = this.pageNumber + 1;

    this.loading = true;
    this.searchService
      .getRepos(this.inputStr, this.pageNumber)
      .subscribe((items: any) => {
        this.repos = items;
        this.inputTouched = true;
        this.loading = false;
      });
  }

  paginationCallPrevios() {
    if (this.pageNumber <= 1) {
      return;
    }
    this.pageNumber = this.pageNumber - 1;

    this.loading = true;
    this.searchService
      .getRepos(this.inputStr, this.pageNumber)
      .subscribe((items: any) => {
        this.repos = items;
        this.inputTouched = true;
        this.loading = false;
      });
  }
  paginationCallNumber(pageNumber: number) {
    if (this.pageNumber > this.availablePages.length + 1) {
      return;
    }
    this.loading = true;
    this.pageNumber = pageNumber;
    this.searchService
      .getRepos(this.inputStr, pageNumber)
      .subscribe((items: any) => {
        this.repos = items;
        this.inputTouched = true;
        this.loading = false;
      });
  }
}
