import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockDocument {}

describe('ThemeService', () => {
  let productService: ThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThemeService],
    });
    productService = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });
});
