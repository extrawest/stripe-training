import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ALLPRODUCTS } from './../../mocks/product-service-mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductService', () => {
  let productService: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    productService = new ProductService(httpClientSpy);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
  });

  it('should be created', () => {
    const service: ProductService = TestBed.inject(ProductService);
    expect(service).toBeTruthy();
  });

  it('should return categories', (done: DoneFn) => {
    const categories: string[] = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing",
    ];
    httpClientSpy.get.and.returnValue(of(categories));
    productService.getCategories().subscribe({
      next: (categories) => {
        expect(categories)
          .withContext('expected categories')
          .toEqual(categories);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return all products', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(ALLPRODUCTS));
    productService.getAllProducts().subscribe({
      next: (allProducts) => {
        expect(allProducts)
          .withContext('expected categories')
          .toEqual(ALLPRODUCTS);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return limited products', (done: DoneFn) => {
    const limitedProducts = [
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 },
      },
    ];
    httpClientSpy.get.and.returnValue(of(limitedProducts));
    productService.getLimitedProducts('1').subscribe({
      next: (limitedProducts) => {
        expect(limitedProducts)
          .withContext('expected categories')
          .toEqual(limitedProducts);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
