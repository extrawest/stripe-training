import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/views/header/components/header/header.component';
import { provideMockStore } from '@ngrx/store/testing';

@Component({ selector: 'app-header-cart', template: '' })
class HeaderCardStubComponent {}
@Component({ selector: 'app-theme-switcher', template: '' })
class ThemeSwitcherStubComponent {}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        HeaderCardStubComponent,
        ThemeSwitcherStubComponent,
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('should contain cart', () => {
    const element: HTMLElement = fixture.nativeElement;
    const cart = element.querySelector('app-theme-switcher')!;
    expect(cart).toBeDefined();
  });

  it('should contain switcher', () => {
    const element: HTMLElement = fixture.nativeElement;
    const themeSwitcher = element.querySelector('app-theme-switcher')!;
    expect(themeSwitcher).toBeDefined();
  });
});
