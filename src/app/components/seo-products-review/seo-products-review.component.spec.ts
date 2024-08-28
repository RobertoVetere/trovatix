import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoProductsReviewComponent } from './seo-products-review.component';

describe('SeoProductsReviewComponent', () => {
  let component: SeoProductsReviewComponent;
  let fixture: ComponentFixture<SeoProductsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoProductsReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeoProductsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
