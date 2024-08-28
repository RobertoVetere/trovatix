import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestButtonsComponent } from './suggest-buttons.component';

describe('SuggestButtonsComponent', () => {
  let component: SuggestButtonsComponent;
  let fixture: ComponentFixture<SuggestButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
