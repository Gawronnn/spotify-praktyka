import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTopItemsComponent } from './user-top-items.component';

describe('UserTopItemsComponent', () => {
  let component: UserTopItemsComponent;
  let fixture: ComponentFixture<UserTopItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTopItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTopItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
