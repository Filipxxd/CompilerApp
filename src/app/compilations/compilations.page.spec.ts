import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CompilationsPage } from './compilations.page';

describe('Compilations', () => {
  let component: CompilationsPage;
  let fixture: ComponentFixture<CompilationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompilationsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CompilationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
