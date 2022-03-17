import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBadgeComponent } from './item-badge.component';

describe('ItemBadgeComponent', () => {
  let component: ItemBadgeComponent;
  let fixture: ComponentFixture<ItemBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
