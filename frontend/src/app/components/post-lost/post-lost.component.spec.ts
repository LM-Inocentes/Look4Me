import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLostComponent } from './post-lost.component';

describe('PostLostComponent', () => {
  let component: PostLostComponent;
  let fixture: ComponentFixture<PostLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
