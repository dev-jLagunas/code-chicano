import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDialogComponent } from './featured-dialog.component';

describe('FeaturedDialogComponent', () => {
  let component: FeaturedDialogComponent;
  let fixture: ComponentFixture<FeaturedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
