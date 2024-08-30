import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicePromptComponent } from './voice-prompt.component';

describe('VoicePromptComponent', () => {
  let component: VoicePromptComponent;
  let fixture: ComponentFixture<VoicePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoicePromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
