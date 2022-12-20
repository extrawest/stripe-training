import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ALLPRODUCTS } from './../../../../shared/mocks/product-service-mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  const categories: string[] = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];
  let getCategoriesSpy: jasmine.SpyObj<any>;
  let getProductsSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getCategories',
      'getAllProducts',
    ]);
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [provideMockStore({}), ProductService],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getCategoriesSpy = jasmine.createSpyObj('ProductService', {
      getCategories: categories,
    });
    getProductsSpy = jasmine.createSpyObj('ProductService', {
      getAllProducts: ALLPRODUCTS,
    });
  });

  it('should push categories into variable', fakeAsync(() => {
    fixture.detectChanges();
    component.categories = getCategoriesSpy.getCategories();
    expect(component.categories).toEqual(categories);
  }));

  it('should push products into variable', fakeAsync(() => {
    fixture.detectChanges();
    component.products = getProductsSpy.getAllProducts();
    expect(component.products).toEqual(ALLPRODUCTS);
  }));

  it('should set tne number - 24 for variable nzSpan', () => {
    let nzSpan = 24;
    component.setDisplayItemsInARow(nzSpan);
    expect(component.nzSpan).toBe(nzSpan);
  });
});
