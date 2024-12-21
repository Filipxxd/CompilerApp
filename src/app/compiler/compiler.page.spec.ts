import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CompilationPage } from './compiler.page';

describe('CompilationPage', () => {
  let component: CompilationPage;
  let fixture: ComponentFixture<CompilationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompilationPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CompilationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
