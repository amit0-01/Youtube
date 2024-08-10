import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { YoutubehomeService } from 'src/app/common/services/youtubehome.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {

  videoForm!: FormGroup;
  thumbnailFile: File | null = null;
  videoFile: File | null = null;
  userId: any;
  token: any;

  constructor(private fb: FormBuilder, private youtubeservice: YoutubehomeService) {
    const userDataString = localStorage.getItem('userData');

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);

      // Check if userData has _id property
      if (userData && userData.user && userData.user._id) {
        this.userId = userData.user._id;
        this.token = userData.accessToken;
      } else {
        console.log('Invalid userData format: missing user._id');
      }
    }
  }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: [null, Validators.required],
      videofile: [null, Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      if (field === 'thumbnail') {
        this.thumbnailFile = file;
      } else if (field === 'videofile') {
        this.videoFile = file;
      }
      this.videoForm.patchValue({ [field]: file });
      this.videoForm.get(field)!.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.videoForm.get('title')?.value);
    formData.append('description', this.videoForm.get('description')?.value);
    formData.append('duration', this.videoForm.get('duration')?.value);
    formData.append('owner', this.userId);
    
    if (this.videoFile) {
      formData.append('videoFile', this.videoFile);
    }
    if (this.thumbnailFile) {
      formData.append('thumbnail', this.thumbnailFile);
    }

    this.youtubeservice.uploadVideo(formData, this.token).subscribe((res) => {
      console.log(res);
    });
  }
  }

