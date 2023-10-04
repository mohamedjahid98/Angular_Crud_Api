import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ApiService } from './Services/api.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule
      ],
      providers: [ApiService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
   });

   it('should have getData function', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
   });

 
});
