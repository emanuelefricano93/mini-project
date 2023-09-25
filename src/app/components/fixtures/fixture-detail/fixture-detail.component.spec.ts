import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureDetailComponent } from './fixture-detail.component';

describe('FixtureDetailComponent', () => {
  let component: FixtureDetailComponent;
  let fixture: ComponentFixture<FixtureDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixtureDetailComponent]
    });
    fixture = TestBed.createComponent(FixtureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
