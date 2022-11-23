import { ComponentFixture, TestBed, fakeAsync,  } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const product = {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.6, count: 400 },
  };
  let productElement: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = product;
    productElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display correct tile', () => {
    const productTitleElement = productElement.querySelector('#title')!;
    const expectedProductTitle = product.title;
    expect(productTitleElement.textContent).toContain(expectedProductTitle);
  });

  it('should display correct price of product', () => {
    const productPriceElement = productElement.querySelector('#price')!;
    const expectedProductPrice = product.price;
    expect(productPriceElement.textContent).toContain(expectedProductPrice);
  });

  it('should display correct category of product', () => {
    const productCategoryElement = productElement.querySelector('#category')!;
    const expectedProductCategory = product.category;
    expect(productCategoryElement.textContent).toContain(expectedProductCategory);
  });

  it('should display correct description of product', () => {
    const productDescriptionElement = productElement.querySelector('#description')!;
    const expectedProductDescription = product.description;
    expect(productDescriptionElement.textContent).toContain(expectedProductDescription);
  });
});
