import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtOverviewComponent } from './art-overview.component';

describe('ArtOverviewComponent', () => {
  let component: ArtOverviewComponent;
  let fixture: ComponentFixture<ArtOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
