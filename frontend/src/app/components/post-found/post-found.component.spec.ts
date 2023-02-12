import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFoundComponent } from './post-found.component';

describe('PostFoundComponent', () => {
  let component: PostFoundComponent;
  let fixture: ComponentFixture<PostFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
