import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {ImageUploaderService} from '../../../../core/services/image-uploader.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Room} from '../../models/room.model';
import {RoomService} from '../../services/room.service';
import { config } from '../../../../../config';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  public roomId: string;
  public room: Room;

  public itemForm: FormGroup;

  // TODO:: it shouled be fixed
  public roomConfig = config.room;

  @ViewChild('picturesChooser') picturesChooser: ElementRef;
  public newRoomPictures: any[] = [];
  public previewNewRoomPictures: any[] = [];

  public uploadBase = environment.uploadBase;

  constructor(
    private fb: FormBuilder,
    private fileUploaderService: ImageUploaderService,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.roomId = params['id'];
      }
    });

    try {
      if (!!this.roomId) {
        const response = await this.roomService.getRoom(this.roomId);
        this.room = response.room;
      }
      this.buildItemForm();
    } finally {
    }

  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      name: [!!this.roomId ? this.room.name : '', Validators.required],
      size: [!!this.roomId ? this.room.size : '', Validators.required],
      yearOfRenovation: [!!this.roomId ? this.room.yearOfRenovation : null],
      coverage: [!!this.roomId ? this.room.coverage : ''],
      windowType: [!!this.roomId ? this.room.windowType : '', Validators.required],
      equipment: [!!this.roomId ? this.room.equipment : false],
      furnitureNames: [!!this.roomId ? this.room.furniture.names.join('\n') : ''],
      furnitureTypes: [!!this.roomId ? this.room.furniture.types.join('\n') : ''],
      pictures: [!!this.roomId ? this.room.pictures : [], Validators.required],
    });
  }

  async submit() {
    const tempRoom = {
      name: this.itemForm.value.name,
      size:  this.itemForm.value.size,
      yearOfRenovation: this.itemForm.value.yearOfRenovation,
      coverage: this.itemForm.value.coverage,
      windowType: this.itemForm.value.windowType,
      equipment: this.itemForm.value.equipment,
      furniture: {
        names: this.itemForm.value.furnitureNames.trim().split('\n'),
        types: this.itemForm.value.furnitureTypes.trim().split('\n'),
      },
      pictures: this.itemForm.value.pictures,
    };
    this.room = {...this.room, ...tempRoom};

    try {
      if (!this.roomId) {
        await this.roomService.createRoom(this.room);
      } else {
        await this.roomService.updateRoom(this.room);
      }
      this.router.navigate(['/rentals/rooms']);
    } finally {
    }
  }

  goBack() {
    this.location.back();
  }

  async uploadRoomPictures() {
    const filenames = await this.fileUploaderService.upload(this.newRoomPictures);
    this.itemForm.controls['pictures'].setValue(this.itemForm.value.pictures.concat(filenames));
    this.newRoomPictures = [];
    this.previewNewRoomPictures = [];
    this.picturesChooser.nativeElement.value = null;
  }

  cancelRoomPictures() {
    this.newRoomPictures = [];
    this.previewNewRoomPictures = [];
    this.picturesChooser.nativeElement.value = null;
  }

  onFilesChange(event) {
    if (event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          this.previewNewRoomPictures.push((<FileReader>e.target).result);
        };
        this.newRoomPictures.push(event.target.files[index]);
        reader.readAsDataURL(event.target.files[index]);
      }
    }
  }

  removeRoomPicture(index, isNewPicture = true) {
    if (isNewPicture) {
      this.newRoomPictures.splice(index, 1);
      this.previewNewRoomPictures.splice(index, 1);
    } else {
      this.itemForm.value.pictures.splice(index, 1);
    }
  }

}
