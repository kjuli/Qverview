import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-repository-dialog',
  templateUrl: './repository-dialog.component.html',
  styleUrls: ['./repository-dialog.component.scss']
})
export class RepositoryDialogComponent implements OnInit {

  repositoryUrl: string;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  reloadApi(): void {
    console.log('reloading!! to ' + this.repositoryUrl);
    this.apiService.getAllData(this.repositoryUrl);
  }
}
