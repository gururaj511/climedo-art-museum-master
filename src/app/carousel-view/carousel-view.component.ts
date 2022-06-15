import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Department} from "../data-model/department";
import {ArtMuseumService} from "../services/art-museum.service";
import {ArtObject} from "../data-model/art-object";
import {NgbCarousel, NgbCarouselConfig, NgbModal, NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";
import {NgbSingleSlideEvent} from "@ng-bootstrap/ng-bootstrap/carousel/carousel";
import {ModalManager} from "ngb-modal";
import {SubSink} from "subsink";

@Component({
  selector: 'app-carousel-view',
  templateUrl: './carousel-view.component.html',
  styleUrls: ['./carousel-view.component.scss']
})
export class CarouselViewComponent implements OnInit, OnDestroy {

  // @ts-ignore
  @Input() department: Department;
  artObjectIDs: any[] = [];
  allArtObjects: ArtObject[] = [];
  screenHeight = window.innerHeight;
  screenWidth = window.innerWidth;
  imgCount = 6;
  noImageAvailPath = './assets/no-image.png';
  currentSlideArts: ArtObject[] = [];
  nextChunkLoaded = false;
  chunkIds: any;
  // @ts-ignore
  @ViewChild('artCarousel', {static: true}) artCarousel: NgbCarousel;
  private modalRef: any;
  // @ts-ignore
  selectedArt: ArtObject;
  readonly subs = new SubSink();

  constructor(private museumService: ArtMuseumService, private config: NgbCarouselConfig,
              private cdRef: ChangeDetectorRef,
              private modalService: NgbModal) {
    // customize default values of carousels used by this component tree
    config.keyboard = false;
    config.pauseOnHover = false;

  }

  @HostListener('window:resize', [])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.imgCount = Math.round((this.screenWidth - 64) / 240);
  }

  ngOnInit(): void {
    this.imgCount = Math.round((this.screenWidth - 64) / 240);

    if (this.department?.departmentId) {
      this.subs.sink = this.museumService.getObjectIdsByDepartment(this.department.departmentId.toString()).subscribe(artObjects => {
        if (artObjects?.objectIDs?.length) {
          this.artObjectIDs = [...artObjects.objectIDs];
          this.nextChunkLoaded = false;
          this.loadArtObjects(0);
          // @ts-ignore
          this.chunkIds = [].concat.apply([], this.artObjectIDs.map((elem, i) => {
            return i % this.imgCount ? [] : [this.artObjectIDs.slice(i, i + this.imgCount)];
          }));
        }
      })
    }
  }

  popUpDialog(data: ArtObject, myModal: any) {
    if (data) {
      this.selectedArt = data;
      this.modalRef = this.modalService.open(myModal, {
        size: "sm",
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        backdropClass: "modal-backdrop"
      });
    }

  }

  loadArtObjects(start: number) {
    const nextIdChunks = this.artObjectIDs.slice(start, start + this.imgCount)
    if (!this.nextChunkLoaded) {
      this.subs.sink = this.museumService.getArtObjects(nextIdChunks).subscribe(response => {
        if (response) {
          this.nextChunkLoaded = true;
          this.currentSlideArts = [...response];
          this.allArtObjects.push(response);
          this.cdRef.detectChanges();
        }
      })
    }
  }

  showNext(slideEvent: NgbSlideEvent | NgbSingleSlideEvent) {
    if (slideEvent.source === NgbSlideEventSource.ARROW_RIGHT) {
      this.nextChunkLoaded = false;
      this.loadArtObjects(this.allArtObjects.length);
    } else {
      const start = this.allArtObjects.length - (this.imgCount * 2);
      const end = this.allArtObjects.length - this.imgCount;
      this.currentSlideArts = this.allArtObjects.slice(start, end);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
