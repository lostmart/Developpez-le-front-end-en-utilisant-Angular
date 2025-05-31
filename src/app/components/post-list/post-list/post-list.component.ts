// src/app/components/post-list/post-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.dataService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to fetch posts';
        this.isLoading = false;
      }
    });
  }
}