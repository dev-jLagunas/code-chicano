import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestDialogComponent } from './latest-dialog.component';

describe('LatestDialogComponent', () => {
  let component: LatestDialogComponent;
  let fixture: ComponentFixture<LatestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
