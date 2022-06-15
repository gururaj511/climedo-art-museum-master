import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../data-model/department";
import {ArtMuseumService} from "../services/art-museum.service";
import {SubSink} from "subsink";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-art-overview',
  templateUrl: './art-overview.component.html',
  styleUrls: ['./art-overview.component.scss']
})
export class ArtOverviewComponent implements OnInit, OnDestroy {

  departments: Department[] = [];
  readonly subs = new SubSink();
  searchArt = new FormControl();

  constructor(private museumService: ArtMuseumService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subs.sink = this.museumService.getAllDepartments().subscribe(deps => {
      if (deps?.length) {
        this.departments = [...deps];
        this.cdRef.detectChanges();
      }
    })
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
